import { useState, useRef, useEffect } from 'react';
import { createAccountFetch, updateAccountOrderItemsFetch } from '../../../assets/api/MyAccountAppAPI/account';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { AccountListItemDrag } from './AccountListItemDrag';

export const AccountsForm = ({ userAccountsWithSheetsData, showUserMessage, userId, setAccountListener, accountListener, setAccountIdOnView, accountIdOnView }) => {
    const [ accountsArr, setAccountsArr ] = useState([]); 

    useEffect(() => {
        if (userAccountsWithSheetsData.length > 0) {
            setAccountsArr(
                userAccountsWithSheetsData.map(item => ({
                    ...item.account,  
                    sheetsCount: item.sheets.length 
                }))
            );
        }
    }, [ userAccountsWithSheetsData ]);


    const accountDescriptionRef = useRef();
    const [ newAccountDescription, setNewAccountDescription ] = useState(''); 

    const onKeyDown = (event) => {
        if (event.key === 'Enter') {
            if(newAccountDescription.trim().length === 0){
                showUserMessage('Debe ingresar un nombre de cuenta válido.', 'warning');
                console.log('test ref')
                accountDescriptionRef.current.select();
            }

            createAccount();
        }
    };

    const createAccount = async () => {
        if(newAccountDescription.trim().length === 0){
            showUserMessage('Debe ingresar un nombre de cuenta válido.', 'warning');
            accountDescriptionRef.current.select();
            return; 
        }

        const { isError, resolution, message, data } = await createAccountFetch( userId, newAccountDescription.trim() );

        if(isError) {
            showUserMessage('Ocurrió un error al intentar crear la cuenta.', 'error');
            return; 
        }
        
        if(resolution) {
            showUserMessage(`Se ha creado una cuenta con el siguiente nombre "${ newAccountDescription }".`, 'success');
            setNewAccountDescription('');
            setAccountListener( accountListener => accountListener + 1 );
            setAccountsArr( accountsArr => [ ...accountsArr, { id: data.id, description: newAccountDescription.trim() } ] );
        }
        else {
            if(message.includes('No se pueden crear mas de 15'))
                showUserMessage(`No se puede crear la cuenta "${newAccountDescription}" porque cada usuario puede tener hasta un máximo de 15 cuentas.`, 'warning');
                accountDescriptionRef.current.select(); 
        }
    }

    const onDragEnd = (event) => {
        const { active, over } = event;
    
        // Encuentra los índices antiguos y nuevos
        const oldIndex = accountsArr.findIndex(s => s.id === active.id);
        const newIndex = accountsArr.findIndex(s => s.id === over.id);
    
        // Mueve el elemento dentro del array
        const newOrder = arrayMove(accountsArr, oldIndex, newIndex);
    
        // Actualiza la propiedad "order" en base al nuevo índice
        const updatedOrder = newOrder.map((item, index) => ({
            ...item,
            order: index + 1, // Ajusta el orden basado en la nueva posición
        }));
    
        setAccountsArr(updatedOrder);
        updateOrder(updatedOrder); 
    };
    
    const updateOrder = async (accountsNewOrder) => {
        const { isError } = await updateAccountOrderItemsFetch(accountsNewOrder);
        
        if(isError) {
            showUserMessage('Ocurrió un error al intentar actualizar el orden de las cuentas.', 'error');
            return; 
        }
        
        setAccountListener( accountListener + 1 );
    }

    return (
        <div className="container-accounts">
            <div className="account-icon-box">
                <input 
                    type="text" 
                    placeholder="Cuenta nueva" 
                    ref={ accountDescriptionRef }
                    value={ newAccountDescription }
                    onChange={ (e) => setNewAccountDescription(e.target.value) }
                    onKeyDown={ onKeyDown }
                    onBlur={() => newAccountDescription.trim().length && createAccount()}
                    maxLength={ 35}
                />

                <button className="searcher-icon-button" onClick={ () =>  { createAccount() } }>
                    <i className="bx bx-plus"></i>
                </button>
            </div>

            <div className="account-accounts-items">

                {
                    (accountsArr.length <= 0) 
                        && 
                        (<p className="animate__animated animate__fadeInLeft animate__faster text-color-default" style={{ fontSize: '12px' }}>No se han creado cuentas aún.</p>)
                }


                <DndContext collisionDetection={ closestCenter } onDragEnd={ onDragEnd }>
                    <SortableContext items={ accountsArr } strategy={ verticalListSortingStrategy }> 
                        {
                            accountsArr.map( ({ id: accountId, description: accountDescription, sheetsCount }) => (
                                <AccountListItemDrag 
                                    key={ accountId } 
                                    accountId={ accountId } 
                                    accountDescription={ accountDescription } 
                                    setAccountsArr = { setAccountsArr }
                                    setAccountIdOnView={ setAccountIdOnView }
                                    sheetsCount={ sheetsCount }
                                    accountIdOnView={accountIdOnView}
                                />                                    
                            ))
                        }
                    </SortableContext>
                </DndContext>
                
            </div>
        </div>    
    )
}