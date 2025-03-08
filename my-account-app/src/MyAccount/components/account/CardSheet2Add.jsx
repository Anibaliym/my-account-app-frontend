import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SheetDragableListItem } from './SheetDragableListItem';
import { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { updateSheetOrderItemsAPI } from '../../../assets/api/MyAccountAppAPI/Sheet';

export const CardSheetAdd2 = ({ accountId, description, isDarkMode, sheets }) => {
    const [ sheetName, setSheetName ] = useState(''); 

    const onChangeSheetName = (e) => {
        const { value } = e.target; 
        setSheetName(value); 
    }
    
    const onKeyDownSheetName = (e) => {
        if(e.keyCode === 13)
            onAddSheet(); 
    }

    const onAddSheet = () => {
        if(sheetName.length === 0){
            showUserMessage('el nombre de la hoja de cálculo no es válido.', 'warning');
            return; 
        }

        createSheet(); 
    }

    const createSheet = async () => {
        const { isError, message } = await createSheetAPI(accountId, sheetName); 

        if(!isError) {
            setSheetName('');
            const { data: dataSheets } = await GetSheetByAccountIdAPI( accountId ); 
            setSheets(dataSheets); 
            setAccountListener( accountListener + 1 )

            showUserMessage('hoja de cálculo creada correctamente', 'success');
        }
        else 
            showUserMessage('ocurrió un error al intentar crear la hoja de cálculo', 'error');
    }      
    const updateOrder = async (sheetsNewOrder) => {
        const { isError } = await updateSheetOrderItemsAPI(sheetsNewOrder);

        if(isError) {
            console.log('Ocurrió un error al intentar actualizar el orden de la hojas de cálculo.', 'error');
            return; 
        }

        setAccountListener( accountListener + 1 ); 
    }

    const onDragEnd = (event) => {
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
    
        // setSheets(updatedOrder);
        updateOrder(updatedOrder); 
    };    

    return (
        <div key={ accountId } className={ `excel-card animate__animated animate__fadeInDown animate__faster mb-4` }>
            <div className="excel-card-header">
                <h4>{ description }</h4>
                <div className="icons-container">
                <i className='bx bx-trash text-color-danger card-icon mr-1'  ></i>
                </div>
            </div>

            <div className={ `excel-card-row` }>
                <div className="excel-card-cell description mb-2">
                    <input 
                        type="text" 
                        style={ {border: 'none',}}
                        className={ `animate__animated animate__fadeIn d-flex justify-content-center align-items-center mt-1 text-center no-focus form-control form-control-sm ${ (isDarkMode) ? 'bg-dark text-light' : '' }` }
                        placeholder="nombre hoja de cálculo"
                        maxLength="30"
                    />
                </div>
            </div>
            <center>
                <i className='bx bx-plus card-icon text-success animate__animated animate__fadeInUp animate__faster'></i>
                <i className='bx bx-save card-icon text-success animate__animated animate__fadeInUp animate__faster'></i>
            </center>

            <div  className="excel-card-body mt-2">
                <DndContext
                    collisionDetection={ closestCenter }
                    onDragEnd={ onDragEnd }
                >
                    <SortableContext items={ sheets } strategy={ verticalListSortingStrategy }> 
                        {
                            sheets.map( (sheet, index) => {
                                const { id: sheetId, order, description, cashBalance, currentAccountBalance } = sheet.sheet;
                                return (
                                    <SheetDragableListItem 
                                        id = { sheetId }
                                        key={ sheetId }
                                        accountId = { accountId }
                                        description = { description }
                                        cashBalance = { cashBalance }
                                        currentAccountBalance = { currentAccountBalance }
                                        order = { order }
                                        isDarkMode = { isDarkMode }
                                        onDeleteSheetRefresh = { ()=>{} }
                                        onUpdateSheetRefresh = { ()=>{} }
                                        showUserMessage = { ()=>{} }
                                    />
                                )
                            })
                        }
                    </SortableContext>
                </DndContext>
            </div>
        </div>       
    )
}
