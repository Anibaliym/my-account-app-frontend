import Modal from 'react-bootstrap/Modal';
import { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteUserAccountFetch } from '../../../assets/api/MyAccountAppAPI/DomainServices';
import { AuthContext } from '../../../assets/context/AuthProvider';
import { ThemeContext } from '../../../assets/context/ThemeProvider';

export const ModalDeleteUserAccount = ({ userId, showModalDeleteUserAccount, setShowModalDeleteUserAccount, showUserMessage }) => {
    const { isDarkMode } = useContext(ThemeContext);
    const passwordRef = useRef();

    const [password, setPassword] = useState('');
    const [animationClass, setAnimationClass] = useState('');
    const [modalMessage, setModalMessage] = useState(' ');
    const [isDeletedAccount, setIsDeletedAccount] = useState(false);
    const { Logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleClick = async (controlName) => {
        console.log('test'); 
        console.log(controlName); 
        
        switch (controlName) {
            case 'DeleteAccount':
                deleteUserAccount();
                break;
            case 'CloseModal':
                setShowModalDeleteUserAccount(false);
                setModalMessage('');
                break;
        }
    }

    const deleteUserAccount = async () => {
        if (password.length === 0) {
            setModalMessage('Ingresa tu contraseña.')
            passwordRef.current.select();
        }
        else {
            const { isError, resolution, errors } = await deleteUserAccountFetch(userId, password);

            if (isError) {
                setShowModalDeleteUserAccount(false);
                setModalMessage('Ocurrió un error al intentar eliminar el usuario.');
                response = false;
            }

            if (!resolution) {
                passwordRef.current.select();
                setModalMessage(errors[0]);
                response = false;
            }

            localStorage.removeItem('my-account-remembered-email');
            setIsDeletedAccount(true);

            setTimeout(() => {
                Logout();
                navigate('/access', { replace: true });
            }, 5000);
        }
    }

    useEffect(() => {
        if (modalMessage) {
            setAnimationClass('animate__animated animate__shakeX');

            // Elimina la clase de animación después de que termine
            const timeout = setTimeout(() => {
                setAnimationClass(''); // Limpia la clase para reutilizar
            }, 1000); // Duración de la animación (coincide con animate.css)

            return () => clearTimeout(timeout); // Limpia el timeout si el componente se desmonta
        }
    }, [modalMessage]);

    useEffect(() => {
        if (showModalDeleteUserAccount)
            passwordRef.current.select();
    }, [showModalDeleteUserAccount]);

    const handleChange = (e) => {
        setPassword(e.target.value);
        setModalMessage('');
    }

    return (
        <Modal show={showModalDeleteUserAccount} onHide={setShowModalDeleteUserAccount} className="modal-blur">
            <Modal.Body className="modal-content">

                {
                    (!isDeletedAccount)
                        ?
                        (
                            <div>
                                <p className="display-6 text-center text-color-primary">IMPORTANTE</p>

                                <div className={`text-center color-selector-${(isDarkMode) ? 'dark' : 'light'}Theme-SOFT_RED p-3`}>
                                    <p>
                                        Al eliminar tu <b>cuenta</b>, se borrarán <b>permanentemente</b> todos los registros asociados a tu perfil,
                                        incluyendo tus cuentas, hojas de cálculo, transacciones y cualquier otra información almacenada en la aplicación. Esta acción es <b>"irreversible"</b>,
                                        lo que significa que no podrás recuperar tus datos una vez completada la eliminación.
                                    </p>

                                    <p>
                                        La aplicación <b>"no conservará"</b> ninguna información después de que la cuenta haya sido eliminada. Toda la información será eliminada de nuestros sistemas de forma segura y no podrá ser restaurada bajo ninguna circunstancia.

                                    </p>

                                    <p>
                                        Si deseas continuar usando nuestros servicios en el futuro, tendrás que registrarte nuevamente y comenzar desde cero.
                                    </p>

                                    <p>
                                        Si tienes dudas o necesitas asistencia, por favor contacta con nuestro equipo de soporte antes de eliminar tu cuenta.

                                    </p>
                                </div>

                                <figcaption className="blockquote-footer text-center mt-5 modal-text-message">
                                    ¿Eliminar?
                                </figcaption>
                            </div>
                        )
                        :
                        (
                            <>
                                <h6 className="display-6 text-center text-color-primary animate__animated animate__fadeIn animate__fast">
                                    Tu cuenta ha sido eliminada exitosamente.
                                </h6>
                                <p className="text-color-default mt-2 text-center">
                                    Todos tus datos han sido borrados de manera permanente.
                                </p>
                                <figcaption className="blockquote-footer text-center">
                                    Gracias por habernos acompañado.
                                </figcaption>
                                <h1 className="display-1 text-center text-color-primary mt-5">
                                    <i className="bx bxs-donate-heart"></i>
                                </h1>

                                <div className="d-flex flex-column justify-content-center align-items-center">
                                    <div className={`spinner-border ${(isDarkMode) ? 'text-light' : 'text-dark'}`} role="status"></div>
                                    <small className="mt-2 text-color-default">Redirigiendo</small>
                                </div>
                            </>
                        )
                }

                <input
                    ref={passwordRef}
                    type="password"
                    className={`custom-input ${isDeletedAccount ? 'animate__animated animate__fadeOut animate__faster' : ''}`}
                    placeholder="Ingresa tu contraseña para confirmar la acción"
                    maxLength="30"
                    onChange={handleChange}
                    value={password}
                />

                <button
                    className={`button-danger mt-3 ${isDeletedAccount ? 'animate__animated animate__fadeOut animate__faster' : ''}`}
                    onClick={() => handleClick('DeleteAccount')}
                >
                    Eliminar la cuenta
                </button>

                <button
                    className={`modal-button mt-3 ${isDeletedAccount ? 'animate__animated animate__fadeOut animate__faster' : ''}`}
                    onClick={() => handleClick('CloseModal')}
                >
                    Cancelar
                </button>

                <small
                    className={`text-center text-danger mt-3 animate__fast ${animationClass} ${isDeletedAccount ? 'animate__animated animate__fadeOut animate__faster' : ''}`}
                >
                    {modalMessage}
                </small>
            </Modal.Body>
        </Modal>
    )
}; 
