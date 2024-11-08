import { Tooltip } from '@nextui-org/react';
import { deleteSheetAPI, updateSheetAPI } from '../../../assets/api/MyAccountAppAPI/Sheet';
import { useState, useRef } from 'react';

export const SheeListItem = ({ sheetId, accountId, description, isDarkMode, order, cashBalance, currentAccountBalance, onDeleteSheetRefresh }) => {
    const [ editSheet, setEditSheet ] = useState(false); 
    const [ editNameSheet, setEditNameSheet ] = useState( description ); 
    const [ nameDescription, setNameDescription] = useState(description); 

    const onEditSheet = () => {
        setEditSheet(!editSheet);

        if(editSheet)
            updateSheet();
    }

    const updateSheet = async () => {
        const response = await updateSheetAPI(accountId, sheetId, editNameSheet, cashBalance, currentAccountBalance, order);
    }

    const onDeleteSheet = () => {
        deleteSheet(); 
    }

    const deleteSheet = async () => {
        const { isError, message } = await deleteSheetAPI(sheetId);
        onDeleteSheetRefresh(sheetId);
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
        <li key={ sheetId } className={ `list-group-item list-group-item-action d-flex justify-content-between align-items-center p-2 small animate__animated animate__fadeInDown animate__faster ${ (isDarkMode) && 'bg-dark text-light' }` }>
            {
                (editSheet)
                    ? 
                        ( 
                            <input 
                                onChange={ onchangeSheetName } 
                                onKeyDown={ onchangeSheetNameKeyDown }
                                className="form-control-sm no-focus animate__animated animate__fadeIn" 
                                type="text" 
                                value={ editNameSheet } 
                            /> 
                        )
                    : ( <span style={ { padding: '5px', cursor:'pointer' } } onClick={ onEditSheet }> { nameDescription } </span> )
            }

            <div>
                <Tooltip
                    key="right"
                    placement="right"
                    content="Eliminar"
                    color="secondary"
                    closeDelay={ 50 }
                >
                    <button 
                        className={ `btn btn-outline-${ (isDarkMode) ? 'light' : 'dark' } btn-sm` }
                        onClick={ onDeleteSheet }
                    >
                        <i className='bx bx-trash' ></i>
                    </button>
                </Tooltip>
            </div>
        </li>
    )
}
