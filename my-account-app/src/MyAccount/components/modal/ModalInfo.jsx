import Modal from 'react-bootstrap/Modal';
import '/src/assets/css/Modal.css'; 

export const ModalInfo = ({ show, setShow, message }) => {
    const onClose = () => setShow(false);

    return (
        <Modal show={show} onHide={onClose} className="modal-blur">
            <Modal.Body className="modal-content">
                <center>{message}</center>
                <button
                    className="btn btn-primary btn-sm form-control button-color mt-4"
                    onClick={onClose}
                >
                    entiendo
                </button>
            </Modal.Body>
        </Modal>
    );
};