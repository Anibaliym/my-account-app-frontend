import { useEffect } from 'react';

export const HomePage = ({ setPageName }) => {

    useEffect(() => {
        setPageName('INICIO');
    }, []);

    return (
        <>
            <h1 className="animate__animated animate__fadeIn display-1 animate__faster text-color-primary" style={{ fontSize:'40px', }}>
                MI CUENTA
            </h1>
            
            <p className="text-color-default lead fs-6">Gestión de cuentas y planificación personal</p>
        </>
    );
}