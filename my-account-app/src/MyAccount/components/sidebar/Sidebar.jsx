import { MenuItem } from './MenuItem';
import { menuData } from '../../../assets/data/menuData';
import { AccountMenuList } from './AccountMenuList';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { CreateAccountAPI, GetUserAccountsWithSheetsAPI } from '../../../assets/api/MyAccountAppAPI/account';
import { Tooltip } from '@nextui-org/react';

export const Sidebar = ({ toggleSidebar, accountListener, isDarkMode }) => {
    const isInitialRender = useRef(true);

    const [ activeDropdown, setActiveDropdown ] = useState(null);
    const [ userAccount, setUserAccount] = useState([]); 
    const [ newAccount, setNewAccount] = useState(false); 
    const [ newAccountName, setNewAccountName ] = useState(''); 
    const [ userId, setUserId ] = useState(''); 
    
    useEffect(() => {
        reloadAccount();
    }, [])

    useEffect(() => {
        if (isInitialRender.current) 
            isInitialRender.current = false;
        else 
            reloadAccount();

    }, [accountListener]);

    const toggleDropdown = (index) => {
        if (toggleSidebar) return;
            setActiveDropdown(activeDropdown === index ? null : index);
    };

    const reloadAccount = async () => {

        const userData = JSON.parse( localStorage.getItem('user') );
        const { id } = userData; 

        setUserId(id); 

        const { isError, data: menuData } = await GetUserAccountsWithSheetsAPI(id);

        if(!isError)
            setUserAccount(menuData.data.accounts); 
    }

    const onChangeAccountName = (e) => {
        setNewAccountName(e.target.value); 
    }

    const onKeyDownAccountName = (e) => {
        if(e.which === 13){
            
            if(newAccountName.length > 0){
                onCreateAccount();
            }

            setNewAccount(false);
            setNewAccountName('');
        }
    }

    const onCreateAccount = async () => {
        const { isError } = await CreateAccountAPI(userId, newAccountName); 
        
        if(!isError)
            reloadAccount();
    }

    return (
        <nav className={ `sidebar ${ toggleSidebar ? 'active collapsed' : '' } animate__animated animate__fadeInLeft animate__faster` } >
            <div className="sidebar-body">
                { 
                    menuData.map(({ id, name, description, icon }) => (
                        <MenuItem 
                            key={id} 
                            navigateTo={name} 
                            description={description} 
                            icon={icon} 
                        />
                    ))
                }
                <hr />

                {
                    userAccount.map( ({ account, sheets }) => (
                        <AccountMenuList
                            key={ account.id }
                            accountId={ account.id } 
                            activeDropdown={ activeDropdown } 
                            toggleDropdown={ toggleDropdown } 
                            description={ account.description }
                            sheets={ sheets }
                            toggleSidebar = { toggleSidebar }
                        />
                    ))
                } 

                <Tooltip
                    placement="right"
                    content="Crea una cuenta"
                    color="secondary"
                    closeDelay={ 50 }
                >
                    <button className="dropdown-btn d-flex justify-content-center align-items-center mt-1" onClick={() => ( setNewAccount(!newAccount) )}>
                        <i className='bx bx-plus-medical' ></i>
                    </button>
                    
                </Tooltip>
                {
                    (newAccount) && (
                        <input 
                            type="text" 
                            className={ `d-flex justify-content-center align-items-center mt-1 text-center no-focus form-control form-control-sm animate__animated animate__fadeInDown animate__faster ${ (isDarkMode) ? 'bg-dark text-light' : '' }` }
                            placeholder="nombre cuenta"
                            value={ newAccountName }
                            onChange={ onChangeAccountName }
                            onKeyDown={ onKeyDownAccountName }
                            maxLength="30"
                        />
                    )
                }
                <hr />
            </div>
        </nav>
    )
}