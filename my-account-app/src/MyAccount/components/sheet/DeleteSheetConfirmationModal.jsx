import Modal from 'react-bootstrap/Modal';

export const DeleteSheetConfirmationModal = ({ sheetDescription, modalConfirmDeleteSheet, setModalConfirmDeleteSheet, deleteSheet }) => {
    
    return (
        <Modal show={ modalConfirmDeleteSheet } onHide={ setModalConfirmDeleteSheet } className="modal-blur">
            <Modal.Body className="modal-content">
                <div className="container-fluid">
                    <div className="card-body">
                        <h5 className="card-title text-color-primary">ELIMINAR HOJA DE CÁLCULO</h5>
                        <hr />

                        <p className="text-center modal-text-message">
                            La <b>hoja de cálculo</b>  que intentas eliminar, <span className="text-color-primary">"{ sheetDescription }"</span>, 
                            aun contiene información que podría ser <b>"relevante"</b>.
                        </p>

                        <figcaption className="blockquote-footer text-center mt-5 modal-text-message">
                            ¿Realmente deseas eliminarla con todo su contenido?
                        </figcaption>
                    </div>

                    <div className="row">
                        <button className="button-danger" onClick={ deleteSheet }>
                            <i className='bx bx-trash icon'></i>
                        </button>
                        <button className="button-primary mt-2" onClick={ () => setModalConfirmDeleteSheet(false) }>
                            Cancelar
                        </button>
                    </div>
                </div>
           </Modal.Body>
        </Modal>
    )
}
