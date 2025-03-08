import { MenuItem } from './MenuItem';
import { menuData } from '../../../assets/data/menuData';
import { AccountMenuList } from './AccountMenuList';
import { useState, useEffect, useRef } from 'react';
import { CreateAccountAPI } from '../../../assets/api/MyAccountAppAPI/account';
import { AddAccountForm } from './AddAccountForm';
import { GetUserAccountsWithSheetsFetch } from '../../../assets/api/MyAccountAppAPI/DomainServices';

export const Sidebar = ({ toggleSidebar, accountListener, isDarkMode }) => {
    const isInitialRender = useRef(true);

    // Estado para los dropdowns abiertos
    const [activeDropdowns, setActiveDropdowns] = useState(() => {
        // Carga el estado desde localStorage o inicializa un objeto vacío
        return JSON.parse(localStorage.getItem('activeDropdowns')) || {};
    });

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

    }, [ accountListener ]);

    // Función para manejar el estado de cada dropdown
    const toggleDropdown = (accountId) => {
        if (toggleSidebar) return;

        setActiveDropdowns(prevState => {
            const newState = { ...prevState, [accountId]: !prevState[accountId] };
            localStorage.setItem("activeDropdowns", JSON.stringify(newState)); // Guardar en localStorage
            return newState;
        });
    };

    const reloadAccount = async () => {
        const userData = JSON.parse( localStorage.getItem('user') );
        const { id } = userData; 

        setUserId(id); 

        const { isError, data: menuData } = await GetUserAccountsWithSheetsFetch(id);

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
                            isOpen={!!activeDropdowns[account.id]} // Verifica si está abierto
                            activeDropdowns={ activeDropdowns } 
                            toggleDropdown={ toggleDropdown } 
                            description={ account.description }
                            sheets={ sheets }
                            toggleSidebar = { toggleSidebar }
                        />
                    ))
                } 
                {
                    (!toggleSidebar) && (
                        <AddAccountForm
                            newAccount={ newAccount }
                            newAccountName={ newAccountName }
                            onChangeAccountName={ onChangeAccountName }
                            onKeyDownAccountName={ onKeyDownAccountName }
                            setNewAccount={ setNewAccount }
                            isDarkMode={ isDarkMode }
                        />
                    )
                }
           </div>
        </nav>
    )
}