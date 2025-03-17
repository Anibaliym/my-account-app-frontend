import { MenuItem } from './MenuItem';
import { menuData } from '../../../assets/data/menuData';
import { AccountMenuList } from './AccountMenuList';
import { useState, useEffect, useRef } from 'react';
import { FormAddAccount } from './FormAddAccount';
import { GetUserAccountsWithSheetsFetch } from '../../../assets/api/MyAccountAppAPI/DomainServices';

export const Sidebar = ({ toggleSidebar, accountListener, isDarkMode }) => {
    const isInitialRender = useRef(true);

    // Estado para los dropdowns abiertos
    const [activeDropdowns, setActiveDropdowns] = useState(() => {
        // Carga el estado desde localStorage o inicializa un objeto vacío
        return JSON.parse(localStorage.getItem('activeDropdowns')) || {};
    });

    const [ userAccount, setUserAccount] = useState([]); 
    const [ userId, setUserId ] = useState(''); 
    const [ retrievedUserType, setRetrievedUserType ] = useState(''); 
    
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
        const { id, userType } = userData; 
        
        setRetrievedUserType(userType); 
        setUserId(id); 

        const { isError, data: menuData } = await GetUserAccountsWithSheetsFetch(id);

        if(!isError)
            setUserAccount(menuData.data.accounts); 
    }

    return (
        <nav className={ `sidebar ${ toggleSidebar ? 'active collapsed' : '' } animate__animated animate__fadeInLeft animate__faster` } >


            <div className="sidebar-body">
                { 
                    menuData.map(({ id, name, description, icon }) => {

                        if(retrievedUserType === 'ADMIN' && description === 'Administrador') 
                            return; 
                        
                        return (
                            <MenuItem 
                                key={id} 
                                navigateTo={name} 
                                description={description} 
                                icon={icon} 
                            />
                        )
                    })
                }

                <hr />
                {
                    userAccount.map( ({ account, sheets }) => (
                        <AccountMenuList
                            key={ account.id }
                            accountId={ account.id } 
                            isOpen={!!activeDropdowns[account.id]}
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
                        <FormAddAccount
                            isDarkMode={ isDarkMode }
                            userId={ userId }
                            reloadAccount={ reloadAccount }
                        />
                    )
                }
                <hr />

           </div>
        </nav>
    )
}