import { useState, useRef, useEffect } from 'react';
import { CreateAccountAPI } from '../../../assets/api/MyAccountAppAPI/account';
import { CustomButtom } from '../controls/CustomButtom';
import { CustomInputText } from '../controls/CustomInputText';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { UpdateAccountOrderItemsFetch } from '../../../assets/api/MyAccountAppAPI/account';
import { AccountListItemDrag } from './AccountListItemDrag';

export const AccountsForm = ({ isDarkMode, userAccountsWithSheetsData, showUserMessage, userId, setAccountListener, accountListener, setAccountIdOnView }) => {
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

    useEffect(() => {
        accountDescriptionRef.current.focus();
    }, [])

    const onKeyDown = (event) => {
        if (event.key === 'Enter') {
            if(newAccountDescription.trim().length === 0){
                showUserMessage('Debe ingresar un nombre de cuenta válido.', 'warning');
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

        const { isError, resolution, message, data } = await CreateAccountAPI( userId, newAccountDescription.trim() );

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
            if(message.includes('No se pueden crear mas de 20'))
                showUserMessage(`No se puede crear la cuenta "${newAccountDescription}" porque cada usuario puede tener hasta un máximo de 20 cuentas.`, 'warning');
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
        const { isError } = await UpdateAccountOrderItemsFetch(accountsNewOrder);
        
        if(isError) {
            showUserMessage('Ocurrió un error al intentar actualizar el orden de las cuentas.', 'error');
            return; 
        }
        
        setAccountListener( accountListener + 1 );
    }

    return (
        <div className="accounts-balances-form">
            <CustomInputText
                isDarkMode = { isDarkMode }
                inputRef = { accountDescriptionRef }
                value = { newAccountDescription }
                onChangeEvent = { setNewAccountDescription }
                onKeyDownEvent = { onKeyDown }
                placeHolder={ 'nombre cuenta' }
            />

            <CustomButtom event={ () => createAccount() }/>

            <div className="div-test animate__animated animate__fadeIn">
                <DndContext collisionDetection={ closestCenter } onDragEnd={ onDragEnd }>
                    <ul className="custom-list">
                        <SortableContext items={ accountsArr } strategy={ verticalListSortingStrategy }> 
                            {
                                accountsArr.map( ({ id: accountId, description: accountDescription, sheetsCount }) => (
                                    <AccountListItemDrag 
                                        key={ accountId } 
                                        accountId={ accountId } 
                                        isDarkMode={ isDarkMode } 
                                        accountDescription={ accountDescription } 
                                        showUserMessage={ showUserMessage } 
                                        setAccountListener={ setAccountListener }
                                        accountListener={ accountListener }
                                        setAccountsArr = { setAccountsArr }
                                        setAccountIdOnView={ setAccountIdOnView }
                                        sheetsCount={ sheetsCount }
                                    />                                    
                                ))
                            }
                        </SortableContext>
                    </ul>
                </DndContext>
            </div>
        </div>
    )
}
