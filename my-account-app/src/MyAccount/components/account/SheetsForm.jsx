import { useRef, useState } from 'react';
import { GetSheetByAccountIdAPI, createSheetAPI, updateSheetOrderItemsAPI } from '../../../assets/api/MyAccountAppAPI/Sheet';
import { Tooltip } from '@nextui-org/react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SheetDragableListItem } from './SheetDragableListItem';

export const SheetsForm = ({ accountId, isDarkMode, setSheets, setAccountListener, sheets, setMessage, setShowMessage, accountListener, showUserMessage }) => {
    const addSheetInputText = useRef();
    const [ sheetName, setSheetName ] = useState(''); 

    const onChangeSheetName = (e) => {
        const { value } = e.target; 
        setSheetName(value); 
    }
    
    const onKeyDownSheetName = (e) => {
        if(e.keyCode === 13)
            onAddSheet(); 
    }

    const onDeleteSheetRefresh = (sheetId) => {
        setSheets((prevSheets) => prevSheets.filter(sheet => sheet.id !== sheetId));
        setAccountListener( accountListener - 1 )
    };    

    const onUpdateSheetRefresh = () => {
        setAccountListener( accountListener - 1 )
    };

    const onDrawEnd = (event) => {
        const { active, over } = event;
    
        // Encuentra los índices antiguos y nuevos
        const oldIndex = sheets.findIndex(s => s.id === active.id);
        const newIndex = sheets.findIndex(s => s.id === over.id);
    
        // Mueve el elemento dentro del array
        const newOrder = arrayMove(sheets, oldIndex, newIndex);
    
        // Actualiza la propiedad "order" en base al nuevo índice
        const updatedOrder = newOrder.map((item, index) => ({
            ...item,
            order: index + 1, // Ajusta el orden basado en la nueva posición
        }));
    
        setSheets(updatedOrder);
        updateOrder(updatedOrder); 
    };


    const onAddSheet = () => {
        if(sheetName.length === 0){
            showUserMessage('El nombre de la hoja de cálculo, es invalida!');
            return; 
        }

        createSheet(); 
    }

    const updateOrder = async (sheetsNewOrder) => {
        const { isError } = await updateSheetOrderItemsAPI(sheetsNewOrder);

        if(isError) {
            showUserMessage('Ocurrió un error al intentar actualizar el orden de la hojas de cálculo.');
            return; 
        }

        setAccountListener( accountListener + 1 ); 
    }

    const createSheet = async () => {
        const { isError, message } = await createSheetAPI(accountId, sheetName); 

        if(!isError) {
            setSheetName('');
            const { data: dataSheets } = await GetSheetByAccountIdAPI( accountId ); 
            setSheets(dataSheets); 
            setAccountListener( accountListener + 1 )

            showUserMessage('Hoja de calculo creada correctamente');
        }
        else 
            showUserMessage(message);
    }    

    return (
        <>
            <div className="cardd cardd-size-sheets-list">
                <div className="cardd-header">
                    Hojas de cálculo
                </div>
                <div className="cardd-body">

                    <input 
                        type="text" 
                        placeholder="descripción hoja de cálculo"
                        className={ `form-control-sm mb-3 no-focus ${ (isDarkMode) && 'bg-dark text-light' }` }
                        onChange={ onChangeSheetName }
                        onKeyDown={ onKeyDownSheetName }
                        value={ sheetName }
                        style={{ width:'100%' }}
                        maxLength="30"
                    />

                    <Tooltip
                        placement="bottom"
                        content="Nueva hoja de cálculo"
                        color="secondary"
                        closeDelay={ 50 }
                    >
                        <center>
                            <i className='bx bx-plus icon ' onClick={ onAddSheet }></i>
                        </center>

                    </Tooltip>
                    
                    <DndContext
                        collisionDetection={ closestCenter }
                        onDragEnd={ onDrawEnd }
                    >
                        <ul className="list-group list-group-flush mt-3">
                            <SortableContext items={ sheets } strategy={ verticalListSortingStrategy }> 
                                {
                                    (sheets.length === 0) && (<small className="animate__animated animate__fadeInDown animate__faster"> <span className="sheet-list">no hay hojas de cálculo disponibles ...</span> </small>)
                                }
                    
                                {
                    
                                    (sheets)
                                        .slice() // Crea una copia del array para no mutar el original
                                        .sort((a, b) => a.order - b.order) // Ordena por el campo "order" en orden ascendente
                                        .map(({ description, id, order, cashBalance, currentAccountBalance }) => (
                                            <SheetDragableListItem
                                                key={ id }
                                                id={ id }
                                                accountId={ accountId }
                                                description={ description }
                                                cashBalance={ cashBalance }
                                                currentAccountBalance={ currentAccountBalance }
                                                order={ order }
                                                isDarkMode={ isDarkMode }
                                                onDeleteSheetRefresh={ onDeleteSheetRefresh }
                                                onUpdateSheetRefresh={ onUpdateSheetRefresh }
                                                setMessage={ setMessage }
                                                setShowMessage={ setShowMessage }            
                                            />
                                    ))
                                }                                
                            </SortableContext>
                        </ul>
                    </DndContext> 

                </div>
                <div className="cardd-footer">
                    <p className="cardd-text"><small>Hojas de cálculo asociadas a la cuenta.</small></p>
                </div>
            </div>
        </>
    )
}
