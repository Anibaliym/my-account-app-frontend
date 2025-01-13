import { Tooltip } from '@nextui-org/react';
import { Link, useNavigate } from 'react-router-dom';

export const AccountMenuList = ({ accountId, activeDropdown, toggleDropdown, description, sheets, toggleSidebar }) => {
    const navigate = useNavigate();

    const setSubMenuText = (sheet) => {
        const { id, description } = sheet; 

        const textAdd = ' ...'; 
        let setDescription = ''; 

        if(description.length >= 23) {
            setDescription = description.substring(0, 23); 
            setDescription = setDescription + textAdd; 
            setDescription = `${ setDescription }${ textAdd }`; 
        }
        else
            setDescription = description;  

        return (
            <Link 
                key={ id } 
                to={`/sheet/${ id }`}
            >
                <i className="bx bx-right-arrow-alt"></i>
                { setDescription }
            </Link>            
        )
    }

    const onClickMenu = () => ( navigate(`/account/${ accountId }`, { replace: true }) );
    
    const onDownItems = () => ( toggleDropdown(accountId) ); 

    return (
        <div className="menu-item">
            <Tooltip
                placement="right"
                content={ description }
                color="secondary"
                closeDelay={ 50 }
            >
                <button className="dropdown-btn-accounts" onClick={ onClickMenu }>
                    <i className="bx bx-spreadsheet icon"></i>
                    <span className="menu-description animate__animated animate__fadeIn">{ description }</span>
                    {
                        (sheets.length > 0) && 
                        ( 
                            <i 
                                className={`bx bx-chevron-right icon animate__animated animate__fadeIn arrow-icon ${activeDropdown === accountId ? 'arrow_open' : 'arrow_close'}`}
                                onClick={ onDownItems }
                            ></i> 
                        )
                    }
                    
                </button>
            </Tooltip>

            <div
                className="dropdown-container animate__animated animate__fadeIn animate__faster"
                style={{ display: !toggleSidebar && activeDropdown === accountId ? 'block' : 'none' }}
            >
                {
                    sheets.map(  ({ sheet }) => ( setSubMenuText(sheet) )) 
                }
            </div>
        </div>
    );
};