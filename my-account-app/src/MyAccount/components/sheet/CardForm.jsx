import { Tooltip } from '@nextui-org/react';
import { CardVignette } from './CardVignette';
import { useState } from 'react';
import { DeleteCardConfirmationModal } from './DeleteCardConfirmationModal';
import { deleteCardWithVignettesFetch } from '../../../assets/api/MyAccountAppAPI/DomainServices';
import { CreateVignetteFetch, GetVignetteByCardIdFetch, updateVignetteOrderItemsFetch } from '../../../assets/api/MyAccountAppAPI/Vignette';
import { formatNumberWithThousandsSeparator } from '../../../assets/utilities/BalanceFormater';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useEffect } from 'react';

export const CardForm = ({ cardId, title, vignettesData, showUserMessage, fetchCard, totalCardAmount, getCalculatedCardTotals, isDarkMode }) => {
    const [ vignettes, setVignettes ] = useState(vignettesData); 
    const [ modalConfirmDeleteCard, setModalConfirmDeleteCard ] = useState(false); 
    const [ cardTotalAmount, setCardTotalAmount ] = useState(totalCardAmount); 


    const [ isAnimating, setIsAnimating ] = useState(false);

    useEffect(() => {
        // Activa la animación cuando cambia el valor de cardTotalAmount
        setIsAnimating(true);

        // Remueve la clase después de un tiempo (duración de la animación)
        const timer = setTimeout(() => {
            setIsAnimating(false);
        }, 1000); // Ajusta el tiempo según la duración de tu animación CSS

        return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
    }, [cardTotalAmount]);    

    const createVignette = async () => {
        const { isError, message, data: vignette } = await CreateVignetteFetch( cardId, 5 );

        if(isError) {
            if(message === 'No se pueden crear mas de 20 viñetas en una sola carta.') {
                showUserMessage('no se pueden crear mas de "20 viñetas" en una sola carta.', 'warning'); 
                return; 
            }

            showUserMessage('ocurrió un error al intentar crear la viñeta', 'error'); 
            return; 
        }

        setVignettes([...vignettes, vignette]); 
    }

    const onDrawEnd = (event) => {
        const { active, over } = event;
    
        // Verifica si hay un destino válido
        if (!over || active.id === over.id) {
            return; // No hacer nada si no hay un destino o el elemento no se ha movido
        }
    
        // Encuentra los índices antiguos y nuevos en el array de vignettes
        const oldIndex = vignettes.findIndex(v => v.id === active.id);
        const newIndex = vignettes.findIndex(v => v.id === over.id);
    
        // Mueve el elemento dentro del array
        const newOrder = arrayMove(vignettes, oldIndex, newIndex);
    
        // Actualiza la propiedad "order" en base al nuevo índice
        const updatedOrder = newOrder.map((item, index) => ({
            ...item,
            order: index + 1, // Ajusta el orden basado en la nueva posición
        }));
    
        // Actualiza el estado con el nuevo orden
        setVignettes(updatedOrder);
    
        updateVignetteOrderItemsFetch(updatedOrder);
    };

    const deleteCard = async () => {
        const { isError, data: vignettes } = await GetVignetteByCardIdFetch(cardId); 
        
        if(!isError) 
        {
            if(vignettes.length > 0) 
                setModalConfirmDeleteCard(true); 
            else {
                const { isError, data } = await deleteCardWithVignettesFetch(cardId);

                if(!isError)
                    showUserMessage(`carta "${ title }" eliminada`, 'success');
                else 
                    showUserMessage('ocurrió un error al intentar eliminar la carta.', 'error');

                fetchCard(); 
                getCalculatedCardTotals();
            }
        }
        else 
            showUserMessage('ocurrió un error al intentar eliminar la carta.', 'error');
    }

    const deleteCardWithVignettes = async () => {
        const { isError } = await deleteCardWithVignettesFetch(cardId);

        if(!isError)
            showUserMessage( 'carta eliminada.', 'success'); 
        else
            showUserMessage( 'ocurrió un error al intentar eliminar la carta.', 'error'); 

        setModalConfirmDeleteCard( false ); 
        fetchCard(); 
    }

    return (
        <div className={ `excel-card animate__animated animate__fadeInDown animate__faster mb-4` }>
        {/* <div className={`excel-card animate__animated animate__fadeInDown animate__faster ${index === vignettes.length - 1 ? '' : 'mb-4'}`}> */}
            <DeleteCardConfirmationModal
                cardTitle={ title }
                modalConfirmDeleteCard={ modalConfirmDeleteCard }
                setModalConfirmDeleteCard={ setModalConfirmDeleteCard }
                showUserMessage={ showUserMessage }
                deleteCardWithVignettes={ deleteCardWithVignettes }
            />

            <div className="excel-card-header">
                <h4>{ title }</h4>

                <div className="icons-container">
                    <Tooltip placement="bottom" content="Resetear colores viñetas" color="secondary" closeDelay={50}>
                        <i className='bx bx-reset icon excel-icon'></i>
                    </Tooltip>


                    <Tooltip placement="bottom" content="Eliminar la carta" color="secondary" closeDelay={50}>
                        <i className="bx bx-trash icon excel-icon" onClick={ deleteCard }></i>
                    </Tooltip>
                    <Tooltip placement="bottom" content="Agregar una viñeta" color="secondary" closeDelay={50}>
                        <i className="bx bx-plus icon excel-icon" onClick={ createVignette } ></i>
                    </Tooltip>
                </div>
            </div>

            <div className="excel-card-body mt-2">
                <DndContext
                    collisionDetection={ closestCenter }
                    onDragEnd={ onDrawEnd }
                > 
                    <SortableContext items={ vignettes.map(v => v.id) } strategy={ verticalListSortingStrategy }>
                    {  
                        vignettes?.map( ( vignette) => (
                            <CardVignette
                                key={ vignette.id } 
                                cardId={ cardId }
                                vignette={ vignette } 
                                showUserMessage={ showUserMessage }
                                setVignettes={ setVignettes }
                                vignettes={ vignettes }
                                setCardTotalAmount={ setCardTotalAmount }
                                getCalculatedCardTotals={ getCalculatedCardTotals }
                                isDarkMode = { isDarkMode }
                            />
                        ))
                    }
                    </SortableContext>
                </DndContext>
            </div>

            <div className={`excel-card-footer mt-1 animate__animated animate__faster ${isAnimating ? 'animate__flipInX' : ''}`}>
            <div className="excel-card-cell"></div>
                <h3 className="mt-3" style={{ color: 'var(--primary-color)' }}>
                    ${ formatNumberWithThousandsSeparator( cardTotalAmount ) }
                </h3>
            </div>            
        </div>        
    )
}
