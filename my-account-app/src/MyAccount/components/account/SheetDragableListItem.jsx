import { Tooltip } from '@nextui-org/react';
import { useSortable } from "@dnd-kit/sortable"; 
import { CSS } from '@dnd-kit/utilities'; 
import { deleteSheetAPI, updateSheetAPI } from '../../../assets/api/MyAccountAppAPI/Sheet';
import { useState } from 'react';

export const SheetDragableListItem = ({ id, description, isDarkMode, accountId, cashBalance, currentAccountBalance, order, onDeleteSheetRefresh, setMessage, setShowMessage, onUpdateSheetRefresh }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const [ nameDescription, setNameDescription] = useState(description); 
    const [ editNameSheet, setEditNameSheet ] = useState( description ); 
    const [ editSheet, setEditSheet ] = useState(false); 

    const onEditSheet = (e) => {
        setEditSheet(!editSheet);

        if(editSheet)
            updateSheet();
    }

    const onDeleteSheet = () => {
        deleteSheet(); 
    }

    const updateSheet = async () => {
        const { isError} = await updateSheetAPI(accountId, id, editNameSheet, cashBalance, currentAccountBalance, order);

        onUpdateSheetRefresh();
        setMessage( (isError === false) ? 'Hoja de calculo actualizada correctamente' : 'Ocurrió un error al intentar actualizar la hoja de calculo' );
        setShowMessage(!isError);
    }


    const deleteSheet = async () => {
        const { isError, message } = await deleteSheetAPI(id);
        onDeleteSheetRefresh(id);

        setMessage( message );
        setShowMessage(!isError);
    }

    const onchangeSheetName = (e) => {
        const { value } = e.target; 
        setEditNameSheet(value); 
    }

    const onchangeSheetNameKeyDown = (event) => {
        if (event.key === 'Enter') {

            if(editNameSheet.trim().length === 0) {
                return; 
            }

            updateSheet();
            setEditSheet(!editSheet); 
            setNameDescription(editNameSheet); 
        }
    }

    return (
        <li
            ref={ setNodeRef }
            style={ {transform: CSS.Transform.toString(transform), transition} } // Estilos dinámicos de movimiento
            className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center p-2 small ${ isDarkMode ? 'bg-dark text-light' : '' }`}
        >
            {
                (editSheet)
                    ? 
                        ( 
                            <input 
                                onChange={ onchangeSheetName } 
                                onKeyDown={ onchangeSheetNameKeyDown }
                                className="form-control-sm no-focus animate__animated animate__fadeIn" 
                                type="text" 
                                maxLength="25"
                                value={ editNameSheet } 
                            /> 
                        )
                    : ( <span style={ { padding: '5px', cursor:'pointer' } } onClick={ onEditSheet }> { nameDescription } </span> )
            }

            <div className="d-flex gap-2">
                <Tooltip
                    placement="bottom"
                    content="Eliminar hoja de cálculo"
                    color="secondary"
                    closeDelay={50}
                >
                    <i
                        className="bx bx-trash icon"
                        onClick={onDeleteSheet}
                        style={{ cursor: 'pointer' }}
                    ></i>
                </Tooltip>

                <Tooltip
                    placement="right"
                    content="Ordenar item"
                    color="secondary"
                    closeDelay={50}
                >
                    <i
                        className="bx bx-sort-alt-2 icon"
                        {...listeners}
                        {...attributes}
                        style={{ cursor: 'move' }}
                    ></i>
                </Tooltip>
            </div>
        </li>
    );
};