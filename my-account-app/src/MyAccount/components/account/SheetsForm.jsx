import { useEffect, useRef, useState } from 'react';
import { getSheetsAccountFetch } from '../../../assets/api/MyAccountAppAPI/DomainServices';
import { createSheetFetch, updateSheetOrderItemsFetch } from '../../../assets/api/MyAccountAppAPI/Sheet'; 
import { SheetsListItemDrag } from './SheetsListItemDrag';
import { Tooltip } from '@nextui-org/react';
import { deleteAccountFetch, updateAccountFetch } from '../../../assets/api/MyAccountAppAPI/account';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { formatDate } from '../../../assets/utilities/DateFormater';

export const SheetsForm = ({ accountId, showUserMessage, setAccountListener, accountListener, setAccountIdOnView }) => {
    const [ sheetsArr, setSheetsArr ] = useState([]);
    const [ newSheetDescription, setNewSheetDescription ] = useState(''); 
    const [ accountDescription, setAccountDescription ] = useState('');
    const [ accountCreationDate, setAccountCreationDate ] = useState('');
    const [ animationClass, setAnimationClass ] = useState('');
    const [ newAccountUpdate, setNewAccountUpdate ] = useState(''); 
    const [ screenWidth, setScreenWidth ] = useState(window.innerWidth);

    const newSheetDescriptionRef = useRef(); 
    const newAccountDescriptionRef = useRef(); 

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const onDragEnd = (event) => {
        const { active, over } = event;
    
        // Encuentra los índices antiguos y nuevos
        const oldIndex = sheetsArr.findIndex(s => s.id === active.id);
        const newIndex = sheetsArr.findIndex(s => s.id === over.id);
    
        // Mueve el elemento dentro del array
        const newOrder = arrayMove(sheetsArr, oldIndex, newIndex);
    
        // Actualiza la propiedad "order" en base al nuevo índice
        const updatedOrder = newOrder.map((item, index) => ({
            ...item,
            order: index + 1, // Ajusta el orden basado en la nueva posición
        }));
    
        setSheetsArr(updatedOrder);
        updateOrder(updatedOrder); 
    };    

    const updateOrder = async (accountsNewOrder) => {
        const { isError } = await updateSheetOrderItemsFetch(accountsNewOrder);
        
        if(isError) {
            showUserMessage('Ocurrió un error al intentar actualizar el orden de las hojas de cálculo.', 'error');
            return; 
        }
        
        setAccountListener( accountListener + 1 );
    }

    const getSheetsAccount = async () => {
        const { isError, data } = await getSheetsAccountFetch(accountId);

        if (isError) {
            showUserMessage('Ocurrió un error al intentar cargar las "Hojas de cálculo" de la "cuenta"', 'warning');
            return;
        }
        
        setAccountCreationDate(formatDate(data.account.creationDate)); 
        setAccountDescription(data.account.name);
        setNewAccountUpdate(data.account.name); 
        setSheetsArr(data.sheets);
    };

    const createSheet = async () => {
        if(newSheetDescription.length === 0){
            showUserMessage('El nombre de la "hoja de cálculo", es inválido.','warning');
            newSheetDescriptionRef.current.select(); 
            return; 
        }

        const { isError, resolution, message } = await createSheetFetch( accountId, newSheetDescription ); 
        

        if(isError)
            showUserMessage(`Ocurrió un error al intentar crear la "hoja de cálculo" ${ newSheetDescription }`,'danger');
        else {

            if(!resolution) {
                showUserMessage(message, 'info');
                return; 
            }

            showUserMessage(`Se ha creado la hoja de cálculo con el nombre "${ newSheetDescription }" correctamente.`, 'success');
            setNewSheetDescription('');
            setAccountListener(accountListener + 1); 

            getSheetsAccount(); 
        }
    }

    const deleteAccount = async () => {
        const { isError, message, resolution } = await deleteAccountFetch(accountId); 

        if(isError) {
            showUserMessage('Ocurrió un error al intentar eliminar la cuenta.', 'danger');
            return; 
        }

        if(resolution) {
            setAccountListener(accountListener - 1); 
            setAccountIdOnView(''); 
            showUserMessage(`La cuenta con el nombre "${ accountDescription }", ha sido eliminada correctamente.`, 'success');
        }
        else 
            showUserMessage(message, 'info');
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') createSheet(); 
    }

    useEffect(() => {
        if (accountId.length === 0) return;

        // Reinicia la animación antes de actualizar los datos
        setAnimationClass('');
        setTimeout(() => {
            setAnimationClass('animate__animated animate__fadeInDown animate__faster');
        }, 10); // Pequeño delay para reiniciar la animación

        getSheetsAccount();
    }, [ accountId ]);


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
        <>
            <div className="account-description-title-box" style={{ outline: 'none', backgroundColor: 'var(--body-color)' }}>
                <input 
                    type="text" 
                    className={`display-6 text-color-default ${animationClass}`}
                    style={{ outline: 'none', backgroundColor: 'var(--body-color)' }}
                    ref={ newAccountDescriptionRef }
                    value={ newAccountUpdate }
                    onChange={ (e)=>  setNewAccountUpdate(e.target.value) }
                    onKeyDown={ onKeyDown }
                    maxLength={ 35}
                />

                {
                    (screenWidth <= 500) && (
                        <Tooltip
                            placement="right"
                            content="Eliminar Cuenta"
                            className="searcher-icon-button"
                            color="danger"
                            closeDelay={50}
                        >
                            <i className="bx bx-trash icon icon-trash" style={{ cursor: 'pointer' }} onClick={deleteAccount}></i>
                        </Tooltip>
                    )
                }
            </div>

            <div className={`accounts-account-info mt-2 text-color-default ${animationClass}`}>
                <span>Fecha de creación <b className="text-color-primary">{ accountCreationDate }</b></span>
                <p>Hojas de cálculo creadas <b className="text-color-primary">{sheetsArr.length}</b></p>

                <div className="account-delete-account-buttom">
                    <Tooltip
                        placement="right"
                        content="Eliminar Cuenta"
                        color="danger"
                        closeDelay={50}
                    >
                        <i className="bx bx-trash icon icon-trash" style={{ cursor: 'pointer' }} onClick={deleteAccount}></i>
                    </Tooltip> 
                </div>
            </div>
            
            <hr /> 

            <div className="accounts-accounts-form">
                <div className="account-icon-box">
                    <input 
                        type="text" 
                        placeholder="Hoja de calculo nueva" 
                        value={newSheetDescription}
                        onChange={(e)=>setNewSheetDescription(e.target.value)}
                        onKeyDown={handleKeyDown}
                        maxLength={40}
                    />

                    <button className="searcher-icon-button" onClick={ createSheet }>
                        <i className="bx bx-plus"></i>
                    </button>
                </div>

                <div className="account-sheets-items p-1">
                    {
                        (sheetsArr.length <= 0) 
                            && (<p className="animate__animated animate__fadeInLeft animate__faster text-color-default" style={{ fontSize: '12px' }}>No hay hojas de cálculo en esta cuenta.</p>)
                    }

                    <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
                        <SortableContext items={sheetsArr.map(s => s.id)} strategy={verticalListSortingStrategy}>
                            {
                                sheetsArr.map(sheet => (
                                    <SheetsListItemDrag 
                                        key={sheet.id}
                                        sheet={sheet}
                                        showUserMessage={showUserMessage}
                                        setAccountListener={setAccountListener}
                                        accountListener={accountListener}
                                        setSheetsArr={setSheetsArr}
                                    />
                                ))
                            }
                        </SortableContext>
                    </DndContext>
                </div>
            </div>    
        </>
    );
};