import Modal from 'react-bootstrap/Modal';
import { deleteSheetWithContentsFetch } from '../../../assets/api/MyAccountAppAPI/DomainServices';
import { useNavigate } from 'react-router-dom';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';

export const ModalDeleteSheetConfirmation = ({ sheetId, sheetDescription, modalConfirmDeleteSheet, setModalConfirmDeleteSheet, setAccountListener, accountListener, showUserMessage }) => {
    const navigate = useNavigate();

    const deleteSheetWithContents = async () => {
        const { isError } = await deleteSheetWithContentsFetch(sheetId);

        if (isError)
            showUserMessage('Ocurrió un error al intentar eliminar la hoja de cálculo.', 'error');
        else {
            setAccountListener(accountListener - 1);
            showUserMessage(`Se ha eliminado la hoja de cálculo "${sheetDescription}" correctamente.`, 'success');
            navigate('/home',);
        }
    }

    return (
        <Modal show={modalConfirmDeleteSheet} onHide={setModalConfirmDeleteSheet} className="modal-blur">
            <Modal.Body className="modal-content">
                <div className="container-fluid">
                    <div className="card-body">
                        <h5 className="card-title text-color-default">ELIMINAR HOJA DE CÁLCULO</h5>
                        <hr />

                        <p className="text-center modal-text-message">
                            La <b>hoja de cálculo</b>  que intentas eliminar, <span className="text-color-primary">"{sheetDescription}"</span>,
                            aun contiene información que podría ser <b>"Relevante"</b>.
                        </p>

                        <figcaption className="blockquote-footer text-center mt-5 modal-text-message">
                            ¿Realmente deseas eliminarla con todo su contenido?
                        </figcaption>
                    </div>

                    <div className="row">
                        <button className="button-danger" onClick={deleteSheetWithContents}>
                            Eliminar
                        </button>
                        <button className="button-primary mt-2" onClick={() => setModalConfirmDeleteSheet(false)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}
