import { updateSheetOrderItemsAPI } from '../../../assets/api/MyAccountAppAPI/Sheet';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SheetDragableListItem } from './SheetDragableListItem';

export const CardListSheet = ({ sheets, setSheets, accountId, isDarkMode, showUserMessage, setAccountListener, accountListener }) => {
    
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

    const updateOrder = async (sheetsNewOrder) => {
        const { isError } = await updateSheetOrderItemsAPI(sheetsNewOrder);

        if(isError) {
            showUserMessage('Ocurrió un error al intentar actualizar el orden de la hojas de cálculo.', 'error');
            return; 
        }

        setAccountListener( accountListener + 1 ); 
    }

    return (
        <div className="animate__animated animate__fadeIn animate__faster">
            <DndContext
                collisionDetection={ closestCenter }
                onDragEnd={ onDrawEnd }
            >
                <ul className="list-group ">
                    <SortableContext items={ sheets } strategy={ verticalListSortingStrategy }> 
                        {
                            (sheets.length === 0) && (<small className="animate__animated animate__fadeInDown animate__faster"> <span className="sheet-list">No hay hojas de cálculo creadas en esta cuenta</span> </small>)
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
                                        showUserMessage={ showUserMessage }            
                                    />
                            ))
                        }                                
                    </SortableContext>
                </ul>
            </DndContext> 
        </div>        
    )
}
