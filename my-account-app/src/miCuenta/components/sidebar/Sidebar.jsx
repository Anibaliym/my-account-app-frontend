import { MenuItem } from './MenuItem';
import { menuData } from '../../../assets/data/menuData';
import { AccountMenuList } from './AccountMenuList';
import { useState } from 'react';
import { useEffect } from 'react';

export const Sidebar = ({ toggleSidebar }) => {
    const [ activeDropdown, setActiveDropdown ] = useState(null);
    const [ userAccount, setUserAccount] = useState([]); 

    const toggleDropdown = (index) => {
        if (toggleSidebar) return;
        setActiveDropdown(activeDropdown === index ? null : index);
    };

    useEffect(() => {
        const accountsData = JSON.parse( localStorage.getItem('accounts') );
        setUserAccount(accountsData); 
    }, [])
    
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




                <hr />
                
            </div>
        </nav>
    )
}
