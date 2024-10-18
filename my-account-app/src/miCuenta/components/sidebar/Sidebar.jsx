import { MenuItem } from './MenuItem';
import { menuData } from '../../../assets/data/menuData';
import { SheetsMenuList } from './SheetsMenuList';
import { accountsData } from '../../../assets/data/accountsData';
import { useState } from 'react';
import { ToolsItem } from './ToolsItem';

export const Sidebar = ({ toggleSidebar }) => {
    const [ activeDropdown, setActiveDropdown ] = useState(null);

    const toggleDropdown = (index) => {
        if (toggleSidebar) return;
        setActiveDropdown(activeDropdown === index ? null : index);
    };

    return (
        <nav className={ `sidebar ${ toggleSidebar ? 'active collapsed' : '' }` } >
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
                {/* <ToolsItem/>
                <hr />
                <span className="title-menu">cuentas</span> */}
                {
                    accountsData.map( ({ accountId, description, sheets }) => (
                        <SheetsMenuList
                            key={ accountId }
                            accountId={ accountId } 
                            activeDropdown={ activeDropdown } 
                            toggleDropdown={ toggleDropdown } 
                            accountName={ description }
                            sheets={ sheets }
                            toggleSidebar = { toggleSidebar }
                        />
                    ))
                }

            <div
                className="dropdown-container mt-2 mb-2"
                style={{ display: !toggleSidebar ? 'block' : 'none' }}
            >
                <center>
                    <i className='bx bx-plus icon plus-icon'></i>
                </center>
            </div>


                <hr />
                
            </div>
        </nav>
    )
}
