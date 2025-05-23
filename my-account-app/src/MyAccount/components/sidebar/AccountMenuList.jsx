import { Tooltip } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const AccountMenuList = ({ accountId, isOpen, toggleDropdown, description, sheets, toggleSidebar }) => {

    // Estado interno para controlar si el menú está abierto
    const [isItemMenuOpen, setIsItemMenuOpen] = useState(isOpen);

    // Sincronizar el estado interno con la prop `isOpen` cuando cambie
    useEffect(() => {
        setIsItemMenuOpen(isOpen);
    }, [isOpen]);

    // Efecto para cerrar el menú si `toggleSidebar` es `true`
    useEffect(() => {
        if (toggleSidebar) {
            setIsItemMenuOpen(false);
        }
    }, [toggleSidebar]);

    // Función para manejar la apertura/cierre del menú
    const handleToggleMenu = () => {
        if (!toggleSidebar) { // Solo permite alternar si el sidebar no está colapsado
            setIsItemMenuOpen((prev) => !prev);
            toggleDropdown(accountId); // Mantiene sincronizado el estado global
        }
    };

    const setSubMenuText = (sheet) => {
        const { id, description } = sheet;
        
        let setDescription = description.length >= 23 ? `${description.substring(0, 23)} ...` : description;
        
        return (
            <Link key={id} to={`/sheet/${id}`}>
                <i className='bx bx-caret-right ml-1'></i>
                <span className="ml-1">
                    {setDescription}

                </span>
            </Link>
        );
    };

    return (
        <div>
            {!toggleSidebar ? (
                <button className="dropdown-btn-accounts" onClick={handleToggleMenu}>
                    <i className={ `bx ${ (sheets.length > 0 ? 'bxs-spreadsheet' : 'bx-spreadsheet') } icon-menu ml-1` }></i>
                    <span className="menu-description animate__animated animate__fadeIn">{description}</span>
                    {
                        (sheets.length > 0) && 
                            (<i className={`bx bx-chevron-right icon-menu animate__animated animate__fadeIn arrow-icon ${isItemMenuOpen ? 'arrow_open' : 'arrow_close'}`}></i>)
                    }
                </button>
            ) : (
                <Tooltip
                    placement="right"
                    closeDelay={200}
                    content={
                        <div className="py-2">
                            <div className="text-tiny">

                                <p className="text-center lead text-color-default fs-6">{ description }</p>
                                {
                                    sheets.map(({ sheet }) => (
                                        <Link
                                            key={sheet.id}
                                            to={`/sheet/${sheet.id}`}
                                            className="dropdown-btn-accounts"
                                            style={{ width: '200px', textDecoration: 'none' }}
                                        >
                                            <span className="menu-description animate__animated animate__fadeIn">
                                                <i className="bx bxs-right-arrow"></i> { sheet.description }
                                            </span>
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                    }
                >
                    <button className="dropdown-btn-accounts">
                        <i className={ `bx ${ (sheets.length > 0 ? 'bxs-spreadsheet' : 'bx-spreadsheet') } icon-menu ml-1` }></i>
                        <span className="menu-description animate__animated animate__fadeIn">{description}</span>
                            {
                                (sheets.length > 0) 
                                    && 
                                (
                                    <i
                                        className={`bx bx-chevron-right icon-menu animate__animated animate__fadeIn arrow-icon ${isItemMenuOpen ? 'arrow_open' : 'arrow_close'}`}
                                        onClick={ handleToggleMenu}
                                    ></i>
                                )
                            }
                    </button>
                </Tooltip>
            )}

            <div
                className="sidebar-sub-menu animate__animated animate__fadeIn animate__faster"
                style={{ display: isItemMenuOpen ? 'block' : 'none' }}
            >
                {sheets.map(({ sheet }) => setSubMenuText(sheet))}
            </div>
        </div>
    );
};