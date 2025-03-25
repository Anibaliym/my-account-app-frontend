import { useEffect } from 'react';
import { capitalizeWords } from '../../assets/utilities/stringFormar';

export const HomePage = ({ setPageName }) => {
    const user = JSON.parse( localStorage.getItem('user') );
    
    useEffect(() => {
        setPageName('INICIO'); 
    }, []);

    return (
        <div className="page-principal-container">
            <div className="container-fluid">
                <h1 className="animate__animated animate__fadeInDown animate__faster display-1 text-color-primary">MI CUENTA</h1>
                <div className="card-body animate__animated animate__fadeIn">
                    <blockquote className="blockquote mb-0">
                    <p>Gestión de cuentas y planificación personal.</p>
                    <footer className="blockquote-footer">{ `${ capitalizeWords(user.firstName) } ${ capitalizeWords(user.lastName) }` }</footer>
                    {/* <footer className="blockquote-footer">{ `${ user.firstName } ${ user.lastName }` }</footer> */}

                    </blockquote>
                </div>
            </div>
        </div>
    );
}