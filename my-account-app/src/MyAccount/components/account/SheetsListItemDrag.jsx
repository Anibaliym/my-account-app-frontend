import { useSortable } from '@dnd-kit/sortable'; 
import { CSS } from '@dnd-kit/utilities'; 
import { useState } from 'react';
import { deleteSheetAPI, updateSheetAPI } from '../../../assets/api/MyAccountAppAPI/Sheet';
import { Tooltip } from '@nextui-org/react';

export const SheetsListItemDrag = ({ sheet, isDarkMode, showUserMessage, setAccountListener, accountListener, setSheetsArr }) => {
    const { id: sheetId, accountId, cashBalance, currentAccountBalance, description, order } = sheet; 
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: sheetId });
    const [ sheetDescriptionUpdate , setSheetDescriptionUpdate ] = useState(description); 
    
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if(sheetDescriptionUpdate.length === 0) {
                showUserMessage('La descripción de la "hoja de cálculo", es inválida.' ,'warning');
                return;
            }

            updateSheet(); 
        }
    }

    const deleteSheet = async () => {
        const { isError, resolution } = await deleteSheetAPI( sheetId ); 

        if(isError || !resolution) {
            showUserMessage('No se puede eliminar la hoja de cálculo, por que tiene movimientos o información en su contenido' ,'warning');
            return; 
        }

        if(resolution){
            setSheetsArr(prevSheets => prevSheets.filter(sheet => sheet.id !== sheetId));
            setAccountListener(accountListener - 1); 
            showUserMessage(`La hoja de cálculo con el nombre "${ sheetDescriptionUpdate }", ha sido eliminada`,'success');
        }
    }

    const updateSheet = async () => {
        const { isError, resolution, message } = await updateSheetAPI(accountId, sheetId, sheetDescriptionUpdate, cashBalance, currentAccountBalance, order); 

        if(isError) {
            showUserMessage('ocurrió un error al intentar actualizar el nombre de la "Hoja de cálculo."','danger');
            return;
        }

        if(!resolution) {
            showUserMessage(message,'info');
            return; 
        }
        
        showUserMessage(`Se ha actualizado el nombre de la hoja de cálculo "${ description }" a "${ sheetDescriptionUpdate }"`,'success');
        setAccountListener(accountListener + 1);
    }

    return (
        <li 
            ref={ setNodeRef }
            key={ sheetId }
            style={{ 
                transform: CSS.Transform.toString(transform), 
                transition,
                borderBottom: `2px solid ${ isDarkMode ? 'gray' : 'lightgray' }`, 
            }} 
            className={`animate__animated animate__fadeIn animate__faster d-flex justify-content-between p-1 mb-2 small ${ isDarkMode ? 'bg-dark' : '' }`}
        >
            <input
                type="text"
                style={{ border: 'none', width: '100%', outline: 'none', background: 'inherit' }}
                value={ sheetDescriptionUpdate } 
                onChangeCapture={ (e) => ( setSheetDescriptionUpdate(e.target.value)) }
                onKeyDown={ handleKeyDown }
                maxLength="20"
                onChange={ ()=>{} }
            />

            <div className="d-flex gap-2">
                <Tooltip
                    placement="left"
                    content="Eliminar hoja de cálculo"
                    color="danger"  
                    closeDelay={ 50 }
                >
                    <i className="bx bx-trash icon icon-trash card-icon" style={{ cursor:'pointer' }} onClick={ deleteSheet }></i>
                </Tooltip>

                <i
                    className="bx bx-sort-alt-2 text-color-primary card-icon "
                    style={{ cursor: 'move' }}
                    tabIndex="-1"
                    {...listeners}
                    {...attributes}
                ></i>
            </div>

        </li>     
    )
}
