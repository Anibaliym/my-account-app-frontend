import { memo, useState } from 'react';
import { useEffect } from 'react';
import { FormCardDragable } from './FormCardDragable';

export const FormCardsSheet = memo(({ cardsSheetData, showUserMessage, getSheetCardsWithVignettes, refreshData }) => {
    if (cardsSheetData == null) return;

    const [cards, setCards] = useState(cardsSheetData);

    useEffect(() => {
        setCards(cardsSheetData);
    }, [cardsSheetData]);

    return (
        <div className="sheet-cards-form">
            <div className="sheet-cards-form-pilar1">
                {
                    (cards.length <= 0) 
                        && 
                        (<p className="animate__animated animate__fadeInLeft animate__faster text-color-default" style={{ fontSize: '12px' }}>No se han creado cartas aún.</p>)
                }

                {
                    cards
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
                    ))
                }
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
    );
});