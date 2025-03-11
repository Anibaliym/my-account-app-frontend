import { useEffect } from 'react';

export const AdminPage = ({ setPageName, isDarkMode, showUserMessage }) => {
    useEffect(() => {
        setPageName('ADMINISTRADOR'); 
    }, []);

    return (
        <>
            <div className="container">
                <div>ADMINISTRADOR</div>
                <hr />
                <button className='button-primary'>gerenar usuario de prueba</button>

            </div>
        </>
    )
}
