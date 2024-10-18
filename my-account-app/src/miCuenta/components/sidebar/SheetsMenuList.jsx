import { Link } from 'react-router-dom';

export const SheetsMenuList = ({ accountId, activeDropdown, toggleDropdown, accountName, sheets, toggleSidebar }) => {

    const setSubMenuText = (sheetId, description) =>{
        const textAdd = ' ...'; 
        let setDescription = ''; 

        if(description.length >= 23)
        {
            setDescription = description.substring(0, 23); 
            setDescription = setDescription + textAdd; 
            setDescription = `${ setDescription }${ textAdd }`; 
        }
        else
            setDescription = description;  

        return (
            <Link key={sheetId} to="/account"><i className="bx bx-right-arrow-alt"></i> { setDescription }</Link>
        )
    }

    return (
        <div className="menu-item">
            <button className="dropdown-btn" onClick={() => toggleDropdown(accountId)}>
                <i className={`bx bx-chevron-right icon ${activeDropdown === accountId ? 'arrow_open' : 'arrow_close'}`}></i>
                <span className="animate__animated animate__fadeIn">{accountName}</span>
            </button>

            <div
                className="dropdown-container animate__animated animate__fadeIn animate__faster"
                style={{ display: !toggleSidebar && activeDropdown === accountId ? 'block' : 'none' }}
            >
                {
                    sheets.map(  ({ sheetId, description }) => ( setSubMenuText(sheetId, description) )) 
                }

            </div>


            <div
                className="dropdown-container mt-2 mb-2"
                style={{ display: !toggleSidebar && activeDropdown === accountId ? 'block' : 'none' }}
            >
                <center>
                    <i className='bx bx-list-plus icon plus-icon'></i>
                </center>
            </div>

        </div>
    );
};