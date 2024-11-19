import Modal from 'react-bootstrap/Modal';

export const ModalInfo = ({ show, setShow, message }) => {

    const onClose = () => setShow(false);

    return (
        <>
            <Modal 
                show={ show } 
                onHide={ onClose }
            >
                <Modal.Body>
                    <center>
                        { message }
                    </center>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary btn-sm form-control" onClick={ onClose }>
                        Ok
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
