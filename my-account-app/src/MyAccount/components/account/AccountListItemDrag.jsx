import { useSortable } from '@dnd-kit/sortable'; 
import { CSS } from '@dnd-kit/utilities'; 
import { updateAccountFetch } from '../../../assets/api/MyAccountAppAPI/account';
import { useState, useRef } from 'react';
import { shortFormatDate } from '../../../assets/utilities/DateFormater';

export const AccountListItemDrag = ({ accountId, accountDescription, showUserMessage, setAccountListener, accountListener, setAccountIdOnView, sheetsCount, creationDate }) => {
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
        const { isError } = await updateAccountFetch( accountId, newAccountUpdate.trim() );
        
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
        <div 
            ref={ setNodeRef }
            style={ { transform: CSS.Transform.toString(transform), transition }} 
            className={`accounts-account-list-item animate__animated animate__fadeIn animate__faster justify-content-between`}
            onClick={ ()=>{ setAccountIdOnView(accountId) } }
        >
            <div className="account-item-account-box">
                <input 
                    type="text" 
                    style={{ cursor:'pointer', fontSize:'14px' }}
                    value={ newAccountUpdate } 
                    ref={ accountDescriptionRef }
                    onChange={ onInputChange } 
                    onKeyDown={ onKeyDown }
                    onClick={ () => { accountDescriptionRef.current.select() } }
                    maxLength="20"
                />

                {
                    (sheetsCount > 0) 
                        && (<div className="badge animate__animated animate__fadeInUp animate__faster">{ sheetsCount }</div>)
                }

                <i
                    className="bx bx-sort-alt-2 text-color-default card-icon ml-1"
                    style={{ cursor: 'move' }}
                    tabIndex="-1"
                    {...listeners}
                    {...attributes}
                ></i>
            </div>
            
            <figcaption className="blockquote-footer mt-1" style={{ fontSize:'11px' }}>
                { shortFormatDate(creationDate) }
            </figcaption>
        </div>
    )
}
