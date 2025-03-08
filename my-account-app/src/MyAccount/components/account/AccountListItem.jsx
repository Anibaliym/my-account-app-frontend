import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { ItemTest } from './itemTest';
import { UpdateAccountOrderItemsFetch } from '../../../assets/api/MyAccountAppAPI/account';

export const AccountListItem = ({ accountsArr, setAccountsArr, isDarkMode, showUserMessage, setAccountListener, accountListener, setAccountIdOnView }) => {
    
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
        <div className="div-test animate__animated animate__fadeIn">
            <DndContext collisionDetection={ closestCenter } onDragEnd={ onDragEnd }>
                <ul className="custom-list">
                    <SortableContext items={ accountsArr } strategy={ verticalListSortingStrategy }> 
                        {
                            accountsArr.map( ({ id: accountId, description: accountDescription, sheetsCount }) => (
                                <ItemTest 
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
    ); 
}; 