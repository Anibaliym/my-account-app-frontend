import { memo, useState } from 'react';

import { DndContext, closestCenter, useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useEffect } from 'react';
import { FormCardDragable } from './FormCardDragable';
import { updateCardOrderItemsFetch } from '../../../assets/api/MyAccountAppAPI/Card';

export const FormCardsSheet = memo(({ cardsSheetData, showUserMessage, isDarkMode, getSheetCardsWithVignettes, refreshData }) => {
    if(cardsSheetData == null) return;

    // Estado para manejar la lista ordenada de cartas
    const [cards, setCards] = useState(cardsSheetData);

    useEffect(() => {
        setCards(cardsSheetData);
    }, [cardsSheetData]);    

    // Sensores para detectar arrastre con el mouse
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 5 },
        })
    );

    const handleDragEnd = async (event) => {
        const { active, over } = event;
    
        if (!over || active.id === over.id) return;
    
        setCards((prevCards) => {
            const oldIndex = prevCards.findIndex((item) => item.id === active.id);
            const newIndex = prevCards.findIndex((item) => item.id === over.id);
    
            // Reordenamos el array
            const reorderedCards = arrayMove(prevCards, oldIndex, newIndex);
    
            // Asignamos el nuevo valor a la propiedad "order"
            const updatedCards = reorderedCards.map((item, index) => ({
                ...item,
                order: index + 1 // Nuevo orden basado en la posición
            }));
    
            // Llamamos a la función para actualizar la base de datos o backend
            updateCardOrderItemsFetch(updatedCards);
    
            return updatedCards;
        });
    };

    return (
        <DndContext 
            sensors={ sensors } 
            collisionDetection={ closestCenter } 
            onDragEnd={ handleDragEnd }
        >
            <SortableContext items={ cards } strategy={ verticalListSortingStrategy }>
                <div className="sheet-cards-form">
                    {cards.length === 0 && (
                        <div className="animate__animated animate__fadeInDown animate__faster">
                            <h6>
                                <span className="text-color-default">
                                    Actualmente no hay cartas de planificación registradas en esta hoja.
                                </span>
                            </h6>
                        </div>
                    )}

                    {
                        cards.map( ({ id, title, vignettes, totalCardAmount, order }) => (
                            <FormCardDragable
                                key = { id }
                                id = { id }
                                title = { title }
                                order={ order }
                                vignettesData = { vignettes }
                                showUserMessage = { showUserMessage }
                                totalCardAmount = { totalCardAmount }
                                isDarkMode = { isDarkMode }                        
                                getSheetCardsWithVignettes = { getSheetCardsWithVignettes }
                                refreshData = { refreshData }
                            />
                        ))
                    }

                </div>
            </SortableContext>
        </DndContext>
    );
});