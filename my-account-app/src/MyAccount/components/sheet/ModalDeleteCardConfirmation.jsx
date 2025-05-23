import Modal from 'react-bootstrap/Modal';

export const ModalDeleteCardConfirmation = ({ cardTitle, modalConfirmDeleteCard, setModalConfirmDeleteCard, deleteCardWithVignettes }) => {
    
    return (
        <Modal show={ modalConfirmDeleteCard } onHide={ setModalConfirmDeleteCard } className="modal-blur">
            <Modal.Body className="modal-content">
                <div className="container-fluid">
                    <div className="card-body">
                        <h5 className="card-title text-color-primary">ELIMINAR CARTA</h5>
                        <hr />

                        <p className="text-center modal-text-message">
                            La carta de planificación que intentas eliminar <span className="text-color-primary">"{ cardTitle }"</span>, 
                            aun contiene información que podría ser <b>"Relevante"</b>.
                        </p>

                        <figcaption className="blockquote-footer text-center mt-5 modal-text-message">
                            ¿Eliminar?
                        </figcaption>
                    </div>

                    <div className="row">
                        <button className="button-danger" onClick={ deleteCardWithVignettes }>
                            Eliminar
                        </button>
                    </div>
                </div>
           </Modal.Body>
        </Modal>
    )
}
