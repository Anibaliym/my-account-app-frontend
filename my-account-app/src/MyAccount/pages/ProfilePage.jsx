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
        <>
            <ModalDeleteUserAccount
                userId={userId}
                showModalDeleteUserAccount={showModalDeleteUserAccount}
                setShowModalDeleteUserAccount={setShowModalDeleteUserAccount}
                showUserMessage={showUserMessage}
            />

            <div className="profile-card">
                <div className="row">
                    <div className="col">
                        <h2 className="text-color-primary">{ userName }</h2>
                        <span className="text-color-default">{userEmail.toLowerCase()}</span>
                        
                        <figcaption className="blockquote-footer mt-5">
                            Creación: <cite title="Source Title text-color-primary">{userCreationDate}</cite>
                        </figcaption>
                    </div>
                    <div className="col">
                        <img src={profileIcon} alt="Profile Icon" width={150} height={150} />
                    </div>
                </div>
                <div className="row">
                    {/* ayanez - pendiente de implementar */}
                    {/* <div className="row"><button className={`modal-button `}>Editar</button></div> */}
                    <div className="row"><button className={`button-danger mt-2 `} onClick={deleteUserAccount}>Eliminar la cuenta</button></div>
                </div>
            </div>
        </>
    );
};