import { useState, useEffect } from 'react';
import { formatDate, formatDateUserAccessLog, formateDateProfilePage } from '../../assets/utilities/DateFormater';
import { capitalizeWords } from '../../assets/utilities/stringFormar';
import { Tooltip } from '@nextui-org/react';
import { ModalDeleteUserAccount } from '../components/profile/ModalDeleteUserAccount';
import { updateUserFetch } from '../../assets/api/MyAccountAppAPI/User';
import { getAllSuccessUserAccessLogByUserIdFetch } from '../../assets/api/MyAccountAppAPI/DomainServices';

export const ProfilePage = ({ setPageName, showUserMessage }) => {

    const [ userCurrentName, setCurrentUserName ] = useState('');
    const [ userCurrentLastName, setCurrentUserLastName ] = useState('');
    const [ userUpdatedName, setUpdatedUserName ] = useState('');
    const [ userUpdatedLastName, setUpdatedUserLastName ] = useState('');
    const [ userCreationDate, setUserCreationDate ] = useState('');
    const [ userEmail, setUserEmail ] = useState('');
    const [ user, setUser ] = useState('');
    const [ userId, setUserId ] = useState('');
    const [ userType, setUserType ] = useState('');
    const [ userAccessLog, setUserAccessLog] = useState([]); 
    const [ showModalDeleteUserAccount, setShowModalDeleteUserAccount ] = useState(false);
    const [ showSaveIcon, setShowSaveIcon ] = useState(false); 
    const [ showSuccessIcon, setShowSuccessIcon ] = useState(false); 

    const userData = JSON.parse(localStorage.getItem('my-account-user'));

    useEffect(() => {
        if(showSuccessIcon) {
            setTimeout(() => {
                setShowSuccessIcon(false); 
            }, 1500);
        }
    }, [ showSuccessIcon ])

    useEffect(() => {
        setPageName('PERFIL');

        const { id, creationDate, firstName, lastName, email, userType } = userData;

        setCurrentUserName(firstName);
        setCurrentUserLastName(lastName); 
        setUpdatedUserName(firstName); 
        setUpdatedUserLastName(lastName); 
        setUserType( (userType === 'STANDAR_USER' ? 'Usuario Estandar' : 'Administrador') );
        setUserCreationDate(formateDateProfilePage(creationDate));
        setUserEmail(email);
        setUserId(id);
        setUser(userType);

        getAllSuccessUserAccessLogByUserId(id);
    }, []);

    useEffect(() => {
        setShowSaveIcon(userCurrentName !== userUpdatedName); 
    }, [ userUpdatedName ])
    
    const getAllSuccessUserAccessLogByUserId = async (userId) => {
        const { data, isError } = await getAllSuccessUserAccessLogByUserIdFetch(userId); 

        if(!isError)
            setUserAccessLog(data.data); 
    }

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            if(userUpdatedName.trim().length === 0) {
                setUpdatedUserName(userCurrentName); 
                showUserMessage('Debe ingresar un nombre de usuario válido.', 'warning');
            }
            else {
                const { isError } = await updateUserFetch(userId, userUpdatedName, userUpdatedLastName, userType, userEmail)
                
                if(!isError) {
                    const { creationDate, email, expirationTime, id, registrationMethod } = JSON.parse(localStorage.getItem('my-account-user'));

                    setCurrentUserName(userUpdatedName)
                    setCurrentUserLastName(userUpdatedLastName);
                    setShowSuccessIcon(true);  
                    setShowSaveIcon(false); 

                    localStorage.setItem('my-account-user', JSON.stringify({
                        id,
                        firstName: userUpdatedName,
                        lastName: userUpdatedLastName,
                        creationDate,
                        email,
                        expirationTime,
                        registrationMethod,
                        userType: 'STANDAR_USER',
                    }));
                }

                showUserMessage(
                    (isError) ? 'Ocurrió un error al intentar actualizar los datos del usuario.' : 'Datos actualizados correctamente.', 
                    (isError) ? 'danger' : 'success');
                }
        }
    }

    const handleChange = (e) => {
        const name = e.target.name; 
        const value = e.target.value; 

        switch (name) {
            case 'txtUserName':
                setUpdatedUserName(value)
                break;
            case 'txtUserLastName':
                setUpdatedUserLastName(value)
                break;
        }
    }

    const handleBlur = (e) => {
        const name = e.target.name; 

        switch (name) {
            case 'txtUserName':

                if(userUpdatedName.trim().length === 0) {
                    setUpdatedUserName(userCurrentName); 
                    showUserMessage('Debe ingresar un nombre de usuario válido.', 'warning');
                }

                break;
            case 'txtUserLastName':
                if(userUpdatedLastName.trim().length === 0) {
                    setUpdatedUserLastName(userCurrentLastName); 
                    showUserMessage('Debe ingresar un apellido válido.', 'warning');
                }

                break;
        }
    }

    const deleteUserAccount = () => setShowModalDeleteUserAccount(!showModalDeleteUserAccount);
    
    return (
        <main className="profile-container animate__animated animate__fadeIn">

            <ModalDeleteUserAccount
                userId={userId}
                showModalDeleteUserAccount={showModalDeleteUserAccount}
                setShowModalDeleteUserAccount={setShowModalDeleteUserAccount}
                showUserMessage={showUserMessage}
            />

            <div className="grid">
                <aside className="card profile">
                    <div className="avatar animate__animated animate__fadeInUp animate__faster" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12c2.8 0 5-2.7 5-6s-2.2-5-5-5-5 2.2-5 5 2.2 6 5 6zm0 2c-4.4 0-8 2.5-8 5.5V22h16v-2.5C20 16.5 16.4 14 12 14z"/>
                        </svg>
                    </div>

                    <h1 className="name animate__animated animate__fadeInDown display-1 animate__faster text-color-primary" style={{ fontSize:'30px', }}>
                        { capitalizeWords(`${ userCurrentName } ${ userCurrentLastName}`) }
                    </h1>

                    <p className="subtitle">Perfil de usuario</p>

                    <div className="summary">
                        <h3 className="title" style={{ fontSize:'14px', opacity:'.9' }}>Resumen</h3>
                        <div className="row small mt-3"><i className="bx bx-calendar icon"></i> Email: Anibalyim@gmail.com</div>
                        <div className="row small mt-2"><i className="bx bx-calendar-check icon"></i> Miembro desde: { userCreationDate }</div>
                        <div className="row small mt-2"><i className="bx bx-star icon"></i> Tipo de usuario: { userType }</div>
                        <div className="row small mt-2"><i className="bx bx-world icon"></i> Idioma: Español</div>
                        <div className="row small mt-4"><i className="bx bx-time-five icon"></i> Último acceso: 6 abril 2025, 19:02</div>
                    </div>
                </aside>

                <section className="card section">
                    <div className="row">
                        <div className="col-11">
                            {/* <h2 className="title">Información del perfil</h2> */}
                            <h2 className="title">INFORMACIÓN DEL PERFIL</h2>
                        </div>
                        <div className="col-1">
                            
                            <Tooltip
                                placement="right"
                                content="Eliminar Cuenta"
                                color="danger"
                                closeDelay={50}
                            >
                                {/* <i className="bx bx-trash icon icon-trash" style={{ cursor: 'pointer' }} onClick={deleteAccount}></i> */}
                                <i className="bx bx-trash icon icon-trash cursor-pointer" onClick={ deleteUserAccount }></i>
                            </Tooltip>
                        </div>
                    </div>

                    <hr style={{ border: 'none', borderTop: '5px solid var(--primary-color)', borderRadius:'10px' }} />

                    <form className="form mt-2" action="#" method="post">

                        <div>
                            <label className="label">Nombre</label>
                                <div className="input-box">
                                    <input 
                                        name="txtUserName"
                                        // ref={inputRef}
                                        type="text"
                                        className="custom-input"
                                        placeholder="Escribe tu nombre"
                                        maxLength={35}
                                        onChange={ (e) => { handleChange(e) } } 
                                        onKeyDown={(e) => ( handleKeyDown(e)) }
                                        onBlur = {(e) => ( handleBlur(e))}
                                        value = { capitalizeWords(userUpdatedName) }
                                        autoComplete="off"
                                    />

                                    { (showSaveIcon) && ( <i className='bx bx-save icon card-icon text-info  animate__animated animate__fadeInUp animate__faster'></i> ) }
                                    { (showSuccessIcon) && ( <i className='bx bx-check-circle icon card-icon text-success  animate__animated animate__fadeInUp animate__faster'></i> ) }
                                </div>

                        </div>
                        <div>
                            <label className="label">Apellido</label>

                            <div className="input-box">
                                <input 
                                    name="txtUserLastName"
                                    // ref={inputRef}
                                    type="text"
                                    className="custom-input"
                                    placeholder="Tu apellido"
                                    maxLength={35}
                                    onChange={ (e) => { handleChange(e) } } 
                                    onKeyDown={(e) => ( handleKeyDown(e)) }
                                    onBlur = {(e) => ( handleBlur(e))}
                                    value = { capitalizeWords(userUpdatedLastName) }
                                />

                                <i className='bx bx-save icon card-icon text-primary animate__animated animate__fadeInUp animate__faster'></i>
                            </div>
                        </div>

                        <table className="mt-4">
                            <tbody>
                                <tr className="p-5">
                                    <td>
                                        <label className="label">Tipo de usuario:</label>
                                    </td>
                                    <td>
                                        <label className="label">
                                            { userType }
                                        </label>
                                    </td>
                                </tr>
                                
                                <tr className="mt-5">
                                    <td>
                                        <label className="label">Correo electronico:</label>
                                    </td>
                                    <td>
                                        <label className="label">{ capitalizeWords( userEmail ) }</label>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </form>

                    <hr style={{ border: 'none', borderTop: '5px solid var(--primary-color)', borderRadius:'10px' }} />

                    <div className="last-logins">
                        <h2 className="title">
                            <i className="bx bx-time" style={{fontSize:'30px'}}></i> ÚLTIMOS ACCESOS
                        </h2>

                        <ul className="logins-list">
                            {
                                userAccessLog.map( (item, index) => (
                                        <div key={ item.id }>
                                            <li><i className="bx bx-calendar"></i> { formatDateUserAccessLog(item.occurredAt) }
                                            {
                                                (index === 0) && ( <span> <i className="bx icon bxs-been-here" ></i></span> )
                                            }
                                            </li>                
                                        </div>
                                    )
                                )
                            }
                        </ul>
                    </div>
                </section>
            </div>
        </main>        
    );
};