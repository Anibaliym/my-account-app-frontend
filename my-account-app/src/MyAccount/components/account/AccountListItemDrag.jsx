import { useSortable } from '@dnd-kit/sortable'; 
import { CSS } from '@dnd-kit/utilities'; 
import { UpdateAccountAPI } from '../../../assets/api/MyAccountAppAPI/account';
import { useState, useRef } from 'react';

export const AccountListItemDrag = ({ accountId, isDarkMode, accountDescription, showUserMessage, setAccountListener, accountListener, setAccountIdOnView, sheetsCount }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: accountId });
    const [ newAccountUpdate, setNewAccountUpdate ] = useState(accountDescription); 

    const accountDescriptionRef = useRef(); 

    const onInputChange = (e) => { setNewAccountUpdate(e.target.value); }

    const onKeyDown = (event) => {
        if (event.key === 'Enter') {
            if(newAccountUpdate.trim().length === 0){
                showUserMessage('Debe ingresar un nombre de cuenta válido', 'warning');
                setNewAccountUpdate(accountDescription);
                return;  
            }

            updateAccountDescription();
        }
    };

    const updateAccountDescription = async () => {
        const { isError } = await UpdateAccountAPI( accountId, newAccountUpdate.trim() );
        
        if(isError){
            showUserMessage('Ocurrió un error al intentar actualizar la cuenta', 'error');
            setNewAccountUpdate(accountDescription); 
            return; 
        }
        else {
            showUserMessage('Se ha actualizado el nombre de la cuenta.', 'success');
            setAccountListener( accountListener + 1 );
        }
    }
    
    return (
        <li 
            ref={ setNodeRef }
            style={ {
                transform: CSS.Transform.toString(transform), 
                transition, 
            }} 
            className={`animate__animated animate__fadeIn animate__faster d-flex justify-content-between mb-1 p-2 small ${ isDarkMode ? 'bg-dark' : '' }`}
            onClick={ ()=>{ setAccountIdOnView(accountId) } }
        >
            <input
                type="text"
                style={{ border: 'none', width: '100%', outline: 'none', background: 'inherit', cursor:'pointer' }}
                value={ newAccountUpdate } 
                ref={ accountDescriptionRef }
                onChange={ onInputChange } 
                onKeyDown={ onKeyDown }
                onClick={ () => { accountDescriptionRef.current.select() } }
                maxLength="20"
            />

            {
                (sheetsCount > 0) && (<div className="badge animate__animated animate__fadeInUp animate__faster">{ sheetsCount }</div>)
            }

            <div className="d-flex gap-2">
                <i
                    className="bx bx-sort-alt-2 text-color-primary card-icon ml-2"
                    style={{ cursor: 'move' }}
                    tabIndex="-1"
                    {...listeners}
                    {...attributes}
                ></i>
            </div>
        </li>
    )
}
