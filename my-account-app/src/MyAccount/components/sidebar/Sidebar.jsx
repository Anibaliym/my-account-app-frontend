import { MenuItem } from './MenuItem';
import { menuData } from '../../../assets/data/menuData';
import { AccountMenuList } from './AccountMenuList';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { GetUserAccountsWithSheetsAPI } from '../../../assets/api/MyAccountAppAPI/account';
import { Tooltip } from '@nextui-org/react';

export const Sidebar = ({ toggleSidebar, accountListener }) => {
    const isInitialRender = useRef(true);

    const [ activeDropdown, setActiveDropdown ] = useState(null);
    const [ userAccount, setUserAccount] = useState([]); 

    const toggleDropdown = (index) => {
        if (toggleSidebar) return;
            setActiveDropdown(activeDropdown === index ? null : index);
    };

    const reloadAccount = async () => {
        const userData = JSON.parse( localStorage.getItem('user') );
        const { id: userId } = userData; 

        const { isError, data: menuData } = await GetUserAccountsWithSheetsAPI(userId);

        if(!isError)
            setUserAccount(menuData.data.accounts); 
    }

    useEffect(() => {
        const accountsData = JSON.parse( localStorage.getItem('accounts') );
        setUserAccount(accountsData); 
    }, [])

    useEffect(() => {
        
        if (isInitialRender.current) 
            isInitialRender.current = false;
        else 
            reloadAccount();

    }, [accountListener]);

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
                    placement="bottom"
                    content="Crea una cuenta"
                    color="secondary"
                    closeDelay={ 50 }
                >
                    <button className="dropdown-btn d-flex justify-content-center align-items-center mt-1" onClick={() => {}}>
                        <i className='bx bx-plus-medical' ></i>
                    </button>
                </Tooltip>

                <hr />
            </div>
        </nav>
    )
}
