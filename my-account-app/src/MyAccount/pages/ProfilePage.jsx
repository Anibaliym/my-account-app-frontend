import { useState, useEffect } from 'react';
import { formatDate } from '../../assets/utilities/DateFormater';
import { capitalizeWords } from '../../assets/utilities/stringFormar';
import { Link } from '@nextui-org/react';
import { ModalDeleteUserAccount } from '../components/profile/ModalDeleteUserAccount';

import profileIcon from '../../assets/images/profile-icon.png';

export const ProfilePage = ({ setPageName, showUserMessage }) => {

    const [userName, setUserName] = useState('');
    const [userCreationDate, setUserCreationDate] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [user, setUser] = useState('');
    const [userId, setUserId] = useState('');
    const [showModalDeleteUserAccount, setShowModalDeleteUserAccount] = useState(false);

    const userData = JSON.parse(localStorage.getItem('my-account-user'));

    

    useEffect(() => {
        setPageName('PERFIL');

        const { id, creationDate, firstName, lastName, email, userType } = userData;

        setUserName(`${firstName} ${lastName}`);
        setUserCreationDate(formatDate(creationDate));
        setUserEmail(email);
        setUserId(id);
        setUser(userType);
    }, []);

    const deleteUserAccount = () => setShowModalDeleteUserAccount(!showModalDeleteUserAccount);

    return (

        <main className="profile-container animate__animated animate__fadeIn">
            <div className="grid">
                <aside className="card profile">
                    <div className="avatar animate__animated animate__fadeInUp animate__faster" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12c2.8 0 5-2.7 5-6s-2.2-5-5-5-5 2.2-5 5 2.2 6 5 6zm0 2c-4.4 0-8 2.5-8 5.5V22h16v-2.5C20 16.5 16.4 14 12 14z"/>
                        </svg>
                    </div>

                    {/* <h1 className="name">ANIBAL YAÑEZ</h1> */}
                    <h1 className="name animate__animated animate__fadeInDown display-1 animate__faster text-color-primary" style={{ fontSize:'30px', }}>
                        Anibal Yañez
                    </h1>


                    <p className="subtitle">Perfil de usuario</p>

                    <div className="summary">
                        <h3 className="title" style={{ fontSize:'14px', opacity:'.9' }}>Resumen</h3>


                        <div className="row small"><i className="bx bx-calendar icon"></i> Email: Anibalyim@gmail.com</div>
                        <div className="row small"><i className="bx bx-calendar-check icon"></i> Miembro desde: 5 abril 2025</div>
                        <div className="row small"><i className="bx bx-time-five icon"></i> Último acceso: 6 abril 2025, 19:02</div>
                        <div className="row small"><i className="bx bx-star icon"></i> Rol: Administrador</div>
                        <div className="row small"><i className="bx bx-world icon"></i> Idioma: Español</div>
                    </div>
                </aside>

                <section className="card section">
                    <h2 className="title">Información del perfil</h2>

                    <form className="form mt-2" action="#" method="post">

                        <div>
                            <label className="label">Nombre</label>
                            <div className="profile-icon-box">
                                <input 
                                    type="text" 
                                    placeholder="Escribe tu nombre" 
                                    // ref={ accountDescriptionRef }
                                    value={ '' }
                                    // onChange={ (e) => setNewAccountDescription(e.target.value) }
                                    // onKeyDown={ onKeyDown }
                                    // onBlur={() => newAccountDescription.trim().length && createAccount()}
                                    maxLength={ 35}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="label">Apellido</label>
                            <div className="profile-icon-box">
                                <input 
                                    type="text" 
                                    placeholder="Tu apellido" 
                                    // ref={ accountDescriptionRef }
                                    value={ '' }
                                    // onChange={ (e) => setNewAccountDescription(e.target.value) }
                                    // onKeyDown={ onKeyDown }
                                    // onBlur={() => newAccountDescription.trim().length && createAccount()}
                                    maxLength={ 35}
                                />

                            </div>
                        </div>

                        <div>
                            <label className="label">Teléfono</label>
                            <div className="profile-icon-box">
                                <input 
                                    type="text" 
                                    placeholder="Número de contacto" 
                                    // ref={ accountDescriptionRef }
                                    value={ '' }
                                    // onChange={ (e) => setNewAccountDescription(e.target.value) }
                                    // onKeyDown={ onKeyDown }
                                    // onBlur={() => newAccountDescription.trim().length && createAccount()}
                                    maxLength={ 35}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="label">Rol</label>
                            <div className="profile-icon-box">
                                <input 
                                    type="text" 
                                    placeholder="Tipo de rol" 
                                    // ref={ accountDescriptionRef }
                                    value={ '' }
                                    // onChange={ (e) => setNewAccountDescription(e.target.value) }
                                    // onKeyDown={ onKeyDown }
                                    // onBlur={() => newAccountDescription.trim().length && createAccount()}
                                    maxLength={ 35}
                                />
                            </div>
                        </div>
                        <div className="full">
                            <label className="label">Email</label>
                            <div className="profile-icon-box">
                                <input 
                                    type="text" 
                                    placeholder="Correo electrónico principal" 
                                    // ref={ accountDescriptionRef }
                                    value={ '' }
                                    // onChange={ (e) => setNewAccountDescription(e.target.value) }
                                    // onKeyDown={ onKeyDown }
                                    // onBlur={() => newAccountDescription.trim().length && createAccount()}
                                    maxLength={ 35}
                                />
                            </div>
                        </div>
                        
                        <div className="full save">
                            <i className="bx bx-save icon cursor-pointer"></i>
                            <i className="bx bx-trash icon ml-1 icon-trash cursor-pointer"></i>
                        </div>


                    </form>

                    <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb' }} />

                    <div className="last-logins">
                        <h3 className="title">
                            {/* <span className="icon">⏱️</span> Últimos accesos */}
                            <i className="bx bx-time" style={{fontSize:'30px'}}></i> Últimos Accesos
                        </h3>

                        <ul className="logins-list">
                            <li><i className="bx bx-calendar"></i> 06 de abril del 2025 · 19:02 hrs · <i className="bx bxs-been-here" ></i> </li>
                            <li><i className="bx bx-calendar"></i> 05 de abril del 2025 · 10:45 hrs</li>
                            <li><i className="bx bx-calendar"></i> 04 de abril del 2025 · 22:18 hrs</li>
                            <li><i className="bx bx-calendar"></i> 03 de abril del 2025 · 08:30 hrs</li>
                            <li><i className="bx bx-calendar"></i> 02 de abril del 2025 · 16:05 hrs</li>
                        </ul>
                    </div>
                </section>
            </div>
        </main>        

       
    );
};