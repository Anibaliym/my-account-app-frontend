import { useEffect, useRef, useState } from 'react';
import { getSheetsAccountFetch } from '../../../assets/api/MyAccountAppAPI/DomainServices';
import { createSheetFetch, updateSheetOrderItemsFetch } from '../../../assets/api/MyAccountAppAPI/Sheet'; 
import { CustomButtom } from '../controls/CustomButtom';
import { CustomInputText } from '../controls/CustomInputText';
import { SheetsListItemDrag } from './SheetsListItemDrag';
import { Tooltip } from '@nextui-org/react';
import { deleteAccountFetch } from '../../../assets/api/MyAccountAppAPI/account';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';

export const SheetsForm = ({ accountId, showUserMessage, setAccountListener, accountListener, setAccountIdOnView }) => {
    const [ sheetsArr, setSheetsArr ] = useState([]);
    const [ newSheetDescription, setNewSheetDescription ] = useState(''); 
    const [ accountDescription, setAccountDescription ] = useState('');
    const [ animationClass, setAnimationClass ] = useState('');

    const newSheetDescriptionRef = useRef(); 

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
        setAccountDescription(data.account.name);
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
        if(accountId.length > 0) {
            getSheetsAccount(); 
            newSheetDescriptionRef.current.select(); 
            setNewSheetDescription('');
        }
    }, [ accountId ])
    
    useEffect(() => {
        if (accountId.length === 0) return;

        // Reinicia la animación antes de actualizar los datos
        setAnimationClass('');
        setTimeout(() => {
            setAnimationClass('animate__animated animate__fadeInDown animate__faster');
        }, 10); // Pequeño delay para reiniciar la animación

        getSheetsAccount();
    }, [ accountId ]);

    return (
        <div className="account-sheets-list-container">
            <div className="account-sheets-list-container-header">
                <span className={`text-color-primary mb-2 ${animationClass}`}>
                    {accountDescription.toUpperCase()}
                </span>
                
                <Tooltip
                    placement="left"
                    content="Eliminar Cuenta"
                    color="danger"
                    closeDelay={50}
                >
                    <i className="bx bx-trash icon icon-trash mb-2" style={{ cursor: 'pointer' }} onClick={deleteAccount}></i>
                </Tooltip>
            </div>            

            <div className="account-sheets-list-container-body">
                {
                    (sheetsArr.length > 0) && 
                    (
                        <DndContext collisionDetection={ closestCenter } onDragEnd={ onDragEnd }>
                            <ul className="custom-list animate__animated animate__fadeIn">
                                <SortableContext items={ sheetsArr } strategy={ verticalListSortingStrategy }>

                                    {
                                        sheetsArr.map( (sheet) => (
                                            <SheetsListItemDrag 
                                                key={ sheet.id }
                                                sheet={ sheet }
                                                showUserMessage={ showUserMessage }
                                                setAccountListener = { setAccountListener } 
                                                accountListener = { accountListener }                                    
                                                setSheetsArr={ setSheetsArr }
                                            />
                                            ))
                                        }
                                </SortableContext>
                            </ul>
                        </DndContext>
                    )
                }

                <CustomInputText
                    inputRef = { newSheetDescriptionRef }
                    value = { newSheetDescription }
                    onChangeEvent = { setNewSheetDescription }
                    onKeyDownEvent = { handleKeyDown }
                    placeHolder={ 'Agregar hoja de calculo ...' }
                />

                <CustomButtom event={ createSheet }/>
            </div>
        </div>
    );
};