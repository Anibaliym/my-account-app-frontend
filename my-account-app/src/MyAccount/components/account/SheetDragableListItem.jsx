import { useState } from 'react';
import { Tooltip } from '@nextui-org/react';
import { useSortable } from "@dnd-kit/sortable"; 
import { CSS } from '@dnd-kit/utilities'; 
import { deleteSheetAPI, updateSheetAPI } from '../../../assets/api/MyAccountAppAPI/Sheet';

export const SheetDragableListItem = ({ id, accountId, description, cashBalance, currentAccountBalance, order, isDarkMode, onDeleteSheetRefresh, onUpdateSheetRefresh, showUserMessage }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const [ editNameSheet, setEditNameSheet ] = useState( description ); 
    
    const onDeleteSheet = () => deleteSheet(); 

    const updateSheet = async () => {
        const { isError} = await updateSheetAPI(accountId, id, editNameSheet, cashBalance, currentAccountBalance, order);
        onUpdateSheetRefresh();

        if( !isError )
            showUserMessage('se ha actualizado el nombre de la hoja de cálculo correctamente.', 'success');
        else 
            showUserMessage('ocurrió un error al intentar actualizar la hoja de cálculo.', 'error');
    }

    const deleteSheet = async () => {
        const { isError } = await deleteSheetAPI(id);
        
        if(!isError) {
            onDeleteSheetRefresh(id);
            showUserMessage( 'Hoja de cálculo, eliminada correctamente.', 'success' );
        }
        else 
            showUserMessage( 'Ocurrió un error al intentar eliminar la hoja de cálculo. Por favor, revise que la hoja de cálculo este sin información relevante', 'error' );

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
        }
    }

    return (
        <li
            ref={ setNodeRef }
            style={ {transform: CSS.Transform.toString(transform), transition} } // Estilos dinámicos de movimiento
            className={`list-group-item d-flex justify-content-between align-items-center p-1 small ${ isDarkMode ? 'bg-dark text-light' : '' }`}
        >
            <input 
                onChange={ onchangeSheetName } 
                onKeyDown={ onchangeSheetNameKeyDown }
                className="form-control-sm no-focus animate__animated animate__fadeIn" 
                type="text" 
                maxLength="20"
                style={{ width:'400px' }}
                value={ editNameSheet } 
            /> 

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
                        tabIndex="-1"
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
                        style={{ cursor: 'move' }}
                        tabIndex="-1"
                        {...listeners}
                        {...attributes}
                    ></i>
                </Tooltip>
            </div>
        </li>
    );
};