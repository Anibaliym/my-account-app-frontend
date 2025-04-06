import { memo, useState } from 'react';

import { DndContext, closestCenter, useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useEffect } from 'react';
import { FormCardDragable } from './FormCardDragable';
import { updateCardOrderItemsFetch } from '../../../assets/api/MyAccountAppAPI/Card';

export const FormCardsSheet = memo(({ cardsSheetData, showUserMessage, getSheetCardsWithVignettes, refreshData }) => {
    if (cardsSheetData == null) return;

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
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext items={cards} strategy={verticalListSortingStrategy}>
                <div className="sheet-cards-form">
                    <div className="sheet-cards-form-pilar1">
                        {cards
                            .filter((_, index) => index % 2 === 0) // 👉 items en posición par (0, 2, 4...)
                            .map(({ id, title, vignettes, totalCardAmount, order }) => (
                                <FormCardDragable
                                    key={id}
                                    id={id}
                                    title={title}
                                    order={order}
                                    vignettesData={vignettes}
                                    showUserMessage={showUserMessage}
                                    totalCardAmount={totalCardAmount}
                                    getSheetCardsWithVignettes={getSheetCardsWithVignettes}
                                    refreshData={refreshData}
                                />
                            ))}
                    </div>

                    <div className="sheet-cards-form-pilar2">
                        {cards
                            .filter((_, index) => index % 2 !== 0) // 👉 items en posición impar (1, 3, 5...)
                            .map(({ id, title, vignettes, totalCardAmount, order }) => (
                                <FormCardDragable
                                    key={id}
                                    id={id}
                                    title={title}
                                    order={order}
                                    vignettesData={vignettes}
                                    showUserMessage={showUserMessage}
                                    totalCardAmount={totalCardAmount}
                                    getSheetCardsWithVignettes={getSheetCardsWithVignettes}
                                    refreshData={refreshData}
                                />
                            ))}
                    </div>
                </div>
            </SortableContext>
        </DndContext>
    );
});