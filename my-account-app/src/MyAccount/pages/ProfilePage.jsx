import { useState, useEffect } from 'react';
import { formatDate } from '../../assets/utilities/DateFormater';

export const ProfilePage = ({ setPageName }) => {

    const [ userName, setUserName ] = useState(''); 
    const [ userCreationDate, setUserCreationDate ] = useState(''); 
    const [ userEmail, setUserEmail ] = useState(''); 
    const [ user, setUser ] = useState(''); 

    const userData = JSON.parse( localStorage.getItem('user') );
    
    useEffect(() => {
        setPageName('PERFIL');
        
        const { creationDate, firstName, lastName, email, userType } = userData; 

        setUserName(`${ firstName } ${ lastName }`); 
        setUserCreationDate( formatDate(creationDate) );
        setUserEmail(email); 
        setUser(userType); 
    }, []);

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">
                        <h1 className="display-4 title-color-text animate__animated animate__fadeIn">Mi Perfil</h1>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 text-center animate__animated animate__fadeInDown animate__faster">
                        <h6 className="display-6">{ userName }</h6>
                        <small className="lead">{ userEmail }</small>
                        <br />
                        <small className="lead">
                        {
                            (user === 'ADMIN') && (
                                <small className="text-color-primary" style={{ fontSize: '14px' }}>
                                    Administrador
                                </small>
                            )
                        }
                        </small>
                    </div>
                </div>

                <div className="position-absolute bottom-10 end-10 p-3 animate__animated animate__fadeInDown animate__faster">
                    <h6 className="text-color-secondary">
                        Miembro desde<br />
                        <small className="">{userCreationDate}</small>
                    </h6>
                </div>
            </div>
        </>
    );
};