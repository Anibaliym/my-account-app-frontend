import { Spinner } from '@nextui-org/react';
import React, { useEffect } from 'react';
import { Modal } from 'react-bootstrap';

export const ModalSessionExpired = ({ show, onClose }) => {

    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                window.location.href = '/login'; // 🔥 Redirige después de 5 segundos
                onClose(); // Este se llama después de redirigir para limpiar el estado
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    return (
        <Modal 
            show={show} 
            onHide={onClose} 
            backdrop="static"  // Evita cerrar al hacer clic fuera
            keyboard={false}   // Evita cerrar con la tecla Escape
            centered           
        >
            <Modal.Body>
                <center>
                    <small className="text-color-default">Tu sesión ha expirado.</small><br />
                    <small className="text-color-default">Redirigiendo en 5 segundos...</small><br />
                </center>
                <div className="d-flex justify-content-center mt-4">
                    <Spinner color="default" />
                </div>                
            </Modal.Body>
        </Modal>
    );
}