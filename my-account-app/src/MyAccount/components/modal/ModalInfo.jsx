import Modal from 'react-bootstrap/Modal';
import '/src/assets/css/Modal.css'; 

export const ModalInfo = ({ show, setShow, message }) => {
    const onClose = () => setShow(false);

    return (
        <Modal show={show} onHide={onClose} className="modal-blur">
            <Modal.Body className="modal-content">
                <center>{message}</center>
                <button
                    className="modal-button mt-4"
                    onClick={onClose}
                >
                    entiendo
                </button>
            </Modal.Body>
        </Modal>
    );
};