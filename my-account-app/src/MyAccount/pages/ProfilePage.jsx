import { useState, useEffect } from 'react';

import { AccessHistory } from "../components/profile/AccessHistory";
import { ProfileInfoItem } from "../components/profile/ProfileInfoItem";
import { ProfileUserStaticInfo } from "../components/profile/ProfileUserStaticInfo";
import { formateDateProfilePage, groupAccessByDate } from '../../assets/utilities/DateFormater';
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
    const [ userAccessLogGrouped, setUserAccessLogGrouped ] = useState({}); 
    const [ showModalDeleteUserAccount, setShowModalDeleteUserAccount ] = useState(false);
    const [ showSaveNameIcon, setShowSaveNameIcon ] = useState(false); 
    const [ showNameSuccessIcon, setShowNameSuccessIcon ] = useState(false); 

    const [ showSaveLastNameIcon, setShowSaveLastNameIcon ] = useState(false); 
    const [ showLastNameSuccessIcon, setShowLastNameSuccessIcon ] = useState(false); 

    const userData = JSON.parse(localStorage.getItem('my-account-user'));

    useEffect(() => {
        if(showNameSuccessIcon) {
            setTimeout(() => {
                setShowNameSuccessIcon(false); 
            }, 1500);
        }
    }, [ showNameSuccessIcon ])

    useEffect(() => {
        if(showLastNameSuccessIcon) {
            setTimeout(() => {
                setShowLastNameSuccessIcon(false); 
            }, 1500);
        }
    }, [ showLastNameSuccessIcon ])

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
        setShowSaveNameIcon(userCurrentName !== userUpdatedName); 
    }, [ userUpdatedName ])
    
    useEffect(() => {
        setShowSaveLastNameIcon(userCurrentLastName !== userUpdatedLastName); 
    }, [ userUpdatedLastName ])


    const getAllSuccessUserAccessLogByUserId = async (userId) => {
        const { data, isError } = await getAllSuccessUserAccessLogByUserIdFetch(userId); 

        setUserAccessLogGrouped(groupAccessByDate(data.data)); 

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


                    if(userCurrentName !== userUpdatedName) {
                        setShowNameSuccessIcon(true);  
                        setShowSaveNameIcon(false); 
                    }

                    if(userCurrentLastName !== userUpdatedLastName) {
                        setShowLastNameSuccessIcon(true);  
                        setShowSaveLastNameIcon(false); 

                    }

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
        <div className="accounts-wrapper animate__animated animate__fadeIn">
            <ModalDeleteUserAccount
                userId={userId}
                showModalDeleteUserAccount={showModalDeleteUserAccount}
                setShowModalDeleteUserAccount={setShowModalDeleteUserAccount}
                showUserMessage={showUserMessage}
            />

            <div className="container-sheet">
                <ProfileUserStaticInfo 
                    name = { capitalizeWords(`${ userCurrentName } ${ userCurrentLastName}`) }    
                    userType = { userType }
                    userCreationDate = { userCreationDate }
                    userLastAccess={ '' }
                />
            </div>

            <div className="container-cards">
                <div className="sheet-cards-form">
                    <div className="profile-cards-form-pilar1">
                        <div className="profile-edit-card mb-3">
                            <div className="row mb-3">
                                <div className="col-11">
                                    <figure>
                                        <blockquote className="blockquote">
                                            <h4 className="text-medium font-medium text-color-default">INFORMACIÓN DEL PERFIL</h4>
                                        </blockquote>
                                        <figcaption className="blockquote-footer">
                                            Administra tu información y revisa tu actividad  <cite title="Source Title">reciente</cite>
                                        </figcaption>
                                    </figure>
                                </div>
                                <div className="col-1">
                                    <Tooltip
                                        placement="right"
                                        content="Eliminar Cuenta"
                                        color="danger"
                                        closeDelay={50}
                                    >
                                        <i className="bx bx-trash icon icon-trash cursor-pointer" onClick={ deleteUserAccount }></i>
                                    </Tooltip>
                                </div>
                            </div>
                                <div className="row">
                                    <div className="col">
                                        <label className="label">Nombre</label>
                                            <div className="input-box">
                                                <input 
                                                    name="txtUserName"
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

                                                { (showSaveNameIcon) && ( <i className='bx bx-save icon card-icon text-primary  animate__animated animate__fadeInUp animate__faster'></i> ) }
                                                { (showNameSuccessIcon) && ( <i className='bx bx-check-circle icon card-icon text-success  animate__animated animate__fadeInUp animate__faster'></i> ) }
                                        </div>
                                </div>
                                <div className="col">
                                    <label className="label">Apellido</label>
                                    <div className="input-box">
                                        <input 
                                            name="txtUserLastName"
                                            type="text"
                                            className="custom-input"
                                            placeholder="Tu apellido"
                                            maxLength={35}
                                            onChange={ (e) => { handleChange(e) } } 
                                            onKeyDown={(e) => ( handleKeyDown(e)) }
                                            onBlur = {(e) => ( handleBlur(e))}
                                            value = { capitalizeWords(userUpdatedLastName) }
                                        />

                                        { (showSaveLastNameIcon) && ( <i className='bx bx-save icon card-icon text-primary  animate__animated animate__fadeInUp animate__faster'></i> ) }
                                        { (showLastNameSuccessIcon) && ( <i className='bx bx-check-circle icon card-icon text-success  animate__animated animate__fadeInUp animate__faster'></i> ) }
                                    </div>                                    
                                </div>                                
                            </div>

                            <figure>
                                <blockquote className="blockquote">
                                    <h4 className="text-medium font-medium text-color-default mt-4">DETALLES DE LA CUENTA</h4>
                                </blockquote>
                                <figcaption className="blockquote-footer">
                                    Información general <cite title="Source Title">(no editable)</cite>
                                </figcaption>
                            </figure>

                            <div className="row mt-4">
                                <div className="col">                                   
                                    <ProfileInfoItem icon={'bxs-user-circle'} firstTitle={'Tipo de usuario'} secondTitle={'Administrador'}/>
                                </div>
                                <div className="col">
                                    <ProfileInfoItem icon={'bxs-envelope'} firstTitle={'Correo'} secondTitle={'Anibaliym@gmail.com'}/>
                                </div>
                            </div>

                            <h4 className="text-medium font-medium mt-4 text-color-default">ÚLTIMOS ACCESOS</h4>

                            <AccessHistory userAccessLogGrouped={ userAccessLogGrouped }/>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    );
};