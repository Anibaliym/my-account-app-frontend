import Modal from 'react-bootstrap/Modal';

export const DeleteCardConfirmationModal = ({ cardTitle, modalConfirmDeleteCard, setModalConfirmDeleteCard, showUserMessage, deleteCardWithVignettes }) => {
    
    return (
        <Modal show={ modalConfirmDeleteCard } onHide={ setModalConfirmDeleteCard } className="modal-blur">
            <Modal.Body className="modal-content">
                <div className="container-fluid">

                    <div className="row">

                        <p className="lead text-center">
                            La carta "{ cardTitle }", tiene movimientos asociados.
                        </p>
                        <hr />

                        <p className="lead text-center mt-4">
                            ¿Realmente desea eliminar la carta con sus movimientos?
                        </p> 
                    </div>

  
                    <div className="row">
                        <button
                            className="modal-button"
                            onClick={ deleteCardWithVignettes }
                        >
                            Si, Eliminar
                        </button>
                        <button
                            className="modal-button mt-2"
                            onClick={ () => setModalConfirmDeleteCard(false) }
                        >
                            Cancelar
                        </button>

                    </div>
                </div>
           </Modal.Body>
        </Modal>


    )
}
