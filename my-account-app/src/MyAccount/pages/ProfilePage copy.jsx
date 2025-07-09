import { useState, useEffect } from 'react';
import { formatDate } from '../../assets/utilities/DateFormater';
import { capitalizeWords } from '../../assets/utilities/stringFormar';
import { Link } from '@nextui-org/react';
import { ModalDeleteUserAccount } from '../components/profile/ModalDeleteUserAccount';

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
        <div className="page-principal-container">
            <div className="container-fluid mt-3 animate__animated animate__fadeIn">

                <ModalDeleteUserAccount
                    userId={userId}
                    showModalDeleteUserAccount={showModalDeleteUserAccount}
                    setShowModalDeleteUserAccount={setShowModalDeleteUserAccount}
                    showUserMessage={showUserMessage}
                />

                <div className="row">
                    <h6 className="display-6 title-color-text">{userName}</h6>
                </div>
                <div className="row">
                </div>
                <div className="row">
                    <small className="lead">{capitalizeWords(userEmail)}</small>
                </div>
                <div className="row">
                    <small className="lead">
                        {
                            (user === 'ADMIN') && (
                                <small className="text-color-primary" style={{ fontSize: '12px' }}>
                                    ADMINISTRADOR
                                </small>
                            )
                        }
                    </small>

                    <div className="row">
                        <div className="col-10"></div>
                        <div className="col-2">
                            <Link isBlock showAnchorIcon color="danger" className="ml-1 mt-2 cursor-pointer" onClick={deleteUserAccount}>
                                Quisiera eliminar mi cuenta.
                            </Link>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row animate__animated animate__fadeInUp animate__faster">
                    <figure>
                        <blockquote className="blockquote" style={{ fontSize: '13px' }}>
                            <p>Miembre desde: </p>
                        </blockquote>
                        <figcaption className="blockquote-footer text-color-primary" style={{ fontSize: '13px' }}>
                            {userCreationDate}
                        </figcaption>
                    </figure>
                </div>
            </div>
        </div>
    );
};