import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import '/src/assets/css/Modal.css';

export const ModalInfo = ({ message }) => {
    const [show, setShow] = useState(false);
    const [localMessage, setLocalMessage] = useState('');

    useEffect(() => {
        if (typeof message === 'string' && message.trim().length > 0) {
            // Actualiza el mensaje local y muestra el modal
            setLocalMessage(message);
            setShow(true);
        }
    }, [message]); // Cada vez que cambia el mensaje, se actualiza el estado

    const onClose = () => {
        setShow(false); // Cierra el modal manualmente
    };

    return (
        <Modal show={show} onHide={onClose} className="modal-blur">
            <Modal.Body className="modal-content">
                {/* <center>{localMessage}</center> */}
                <p className="text-center modal-text-message">{ localMessage }</p>
                <button className="modal-button mt-4" onClick={onClose}>
                    Entiendo
                </button>
            </Modal.Body>
        </Modal>
    );
};