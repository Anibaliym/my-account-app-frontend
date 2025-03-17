import { Tooltip } from '@nextui-org/react';
import { CardVignette } from './CardVignette';
import { useState, useEffect, useRef } from 'react';
import { DeleteCardConfirmationModal } from './DeleteCardConfirmationModal';
import { deleteCardWithVignettesFetch } from '../../../assets/api/MyAccountAppAPI/DomainServices';
import { CreateVignetteFetch, GetVignetteByCardIdFetch, updateVignetteOrderItemsFetch } from '../../../assets/api/MyAccountAppAPI/Vignette';
import { formatNumberWithThousandsSeparator } from '../../../assets/utilities/BalanceFormater';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useParams } from 'react-router-dom';
import { updateCardFetch } from '../../../assets/api/MyAccountAppAPI/Card';

export const FormCard = ({ cardId, title,  order, vignettesData, showUserMessage, getSheetCardsWithVignettes, totalCardAmount, refreshData, isDarkMode }) => {
    const { sheetId } = useParams()
    const cardTitleRef = useRef(null); 

    const [cardTitle, setCardTitle ] = useState(title); 
    const [cardTitleOld, setCardTitleOld] = useState(title); 
    const [vignettes, setVignettes] = useState(vignettesData); 
    const [modalConfirmDeleteCard, setModalConfirmDeleteCard] = useState(false); 
    const [cardTotalAmount, setCardTotalAmount] = useState(totalCardAmount); 
    const [isAnimating, setIsAnimating] = useState(false);

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
                showUserMessage('No se pueden crear mas de "20 viñetas" en una sola carta.', 'warning'); 
                return; 
            }

            showUserMessage('Ocurrió un error al intentar crear la viñeta', 'error'); 
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
                    showUserMessage(`La carta con el nombre "${ title }", ha sido eliminada.`, 'success');
                else 
                    showUserMessage('Ocurrió un error al intentar eliminar la carta.', 'error');

                getSheetCardsWithVignettes(); 
                refreshData();
            }
        }
        else 
            showUserMessage('Ocurrió un error al intentar eliminar la carta.', 'error');
    }

    const deleteCardWithVignettes = async () => {
        const { isError } = await deleteCardWithVignettesFetch(cardId);

        if(!isError)
            showUserMessage( 'Carta eliminada correctamente.', 'success'); 
        else
            showUserMessage( 'Ocurrió un error al intentar eliminar la carta.', 'error'); 

        setModalConfirmDeleteCard( false ); 
        getSheetCardsWithVignettes(); 
    }

    const updateCard = async () => {
        const { isError } = await updateCardFetch(cardId, sheetId, cardTitle, order); 

        if(isError){
            showUserMessage('Ocurrió un error al intentar actualizar el nombre de la carta.', 'error');
            setCardTitle(title); 
        }
        else {
            showUserMessage(`La carta "${ title }", ha actualizado su nombre a "${ cardTitle }".`,'success'); 
            setCardTitleOld( cardTitle )
        }

    }

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {

            if(cardTitle === cardTitleOld) return; 

            if( cardTitle.length === 0 ) {
                showUserMessage('El nombre de la carta es inválido.','warning'); 
                return; 
            }
            
            updateCard();
        }
    }

    const handleBlur = async (e) => {
        if(cardTitle === cardTitleOld) return; 

        if( cardTitle.length === 0 ) {
            showUserMessage('El nombre de la carta es inválido.','warning'); 
            setCardTitle(title); 
            return; 
        }
        
        updateCard();
    }

    return (
        <div className={ `excel-card animate__animated animate__fadeInDown animate__faster mb-4` }>
            <DeleteCardConfirmationModal
                cardTitle={ title }
                modalConfirmDeleteCard={ modalConfirmDeleteCard }
                setModalConfirmDeleteCard={ setModalConfirmDeleteCard }
                deleteCardWithVignettes={ deleteCardWithVignettes }
            />

            <div className="excel-card-header border-white">
                <input
                    ref={ cardTitleRef }
                    name = "cardDescription"
                    type = "text"
                    className = { `no-focus card-title-input-text display-6` }
                    maxLength = { 40 }
                    value = { cardTitle.toUpperCase() }
                    onChange = { (e) => ( setCardTitle(e.target.value) ) }
                    onClick = { () => ( cardTitleRef.current.select() ) }
                    onKeyDown = { handleKeyDown }
                    onBlur = { handleBlur }
                    autoComplete="off"
                />

                <div className="icons-container">
                    <Tooltip placement="bottom" content="Agregar Viñeta" color="foreground" closeDelay={50}>
                        <i className="bx bx-plus icon cursor-pointer" onClick={ createVignette } ></i>
                    </Tooltip>
                    <Tooltip placement="bottom" content="Eliminar la carta" color="danger" closeDelay={50}>
                        <i className="bx bx-trash icon ml-1 icon-trash cursor-pointer" onClick={ deleteCard }></i>
                    </Tooltip>
                </div>
            </div>
            
            <div className="excel-card-body mt-3">
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
                                refreshData={ refreshData }
                                isDarkMode = { isDarkMode }
                            />
                        ))
                    }
                    </SortableContext>
                </DndContext>
            </div>

            <div className={`excel-card-footer mt-1 animate__animated animate__faster ${isAnimating ? 'animate__flipInX' : ''}`}>
            <div className="excel-card-cell"></div>
                <h2 className="mt-2 dispplay-2" >
                    ${ formatNumberWithThousandsSeparator( cardTotalAmount ) }
                </h2>
            </div>            
        </div>        
    )
}
