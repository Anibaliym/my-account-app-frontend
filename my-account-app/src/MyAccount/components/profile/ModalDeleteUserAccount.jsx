import Modal from 'react-bootstrap/Modal';
import { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../assets/context/AuthContext';

export const ModalDeleteUserAccount = ({ isDarkMode, showModalDeleteUserAccount, setShowModalDeleteUserAccount, showUserMessage }) => {
    const passwordRef = useRef(); 
    const [password, setPassword] = useState(''); 
    const {logout} = useContext(AuthContext);
    const navigate = useNavigate();
    
    const handleClick = () => {

        // if(deleteUserAccountByUserId()) return; 

        setShowModalDeleteUserAccount(false);
        showUserMessage('La cuenta de usuario, ha sido eliminada.'); 

        setTimeout(() => {
            logout();
            navigate('/access', { replace: true });
        }, 3000);
    }
    useEffect(() => {
        if(showModalDeleteUserAccount)
            passwordRef.current.select(); 
    }, [showModalDeleteUserAccount])

    const deleteUserAccountByUserId = async () => {

        let response = false; 
        
        if(password.length === 0){
            showUserMessage('Debes ingresar la contraseña.','warning'); 
            passwordRef.current.select();
            response = false; 
            return; 
        }
        
        response = true; 
    }

return (
    <Modal show={showModalDeleteUserAccount} onHide={setShowModalDeleteUserAccount} className="modal-blur">
        <Modal.Body className="modal-content">
            <h5 className="card-title text-color-default mb-3">ELIMINAR MI CUENTA DE USUARIO</h5>
            <p className="lead text-center text-color-primary">IMPORTANTE</p>

            <div className={ `text-center color-selector-${ (isDarkMode) ? 'dark' : 'light' }Theme-SOFT_RED p-3` }>
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

            <input 
                ref={ passwordRef }
                type="password" 
                className="custom-input" 
                placeholder="Ingresa tu contraseña para confirmar la acción"
                maxLength="30"
                onChange={(e) => setPassword(e.target.value)}
                value={password}                    
            />

            <button className="button-danger mt-3" onClick={ handleClick }>
                Eliminar la cuenta
            </button>
            <button className="modal-button mt-3" onClick={() => setShowModalDeleteUserAccount(false)}>
                Cancelar
            </button>
        </Modal.Body>
    </Modal>
)}; 
