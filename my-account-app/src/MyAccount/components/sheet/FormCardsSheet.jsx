import { memo } from 'react';
import { FormCard } from './FormCard';

export const FormCardsSheet = memo(({ cardsSheetData, showUserMessage,  isDarkMode, getSheetCardsWithVignettes, refreshData }) => {
    if(cardsSheetData == null) return; 

    return (
        <div className="sheet-cards-form">
            { 
                (cardsSheetData.length === 0) 
                    && (
                        <div className="animate__animated animate__fadeInDown animate__faster">
                            <h6> 
                                <span className=" text-color-default">
                                    Actualmente no hay cartas de planificación registradas en esta hoja.
                                </span> 
                            </h6>
                        </div>
                    )
            }
            
            {
                cardsSheetData.map( ({ id: cardId, title, vignettes, totalCardAmount, order }) => (
                    <FormCard
                        key = { cardId }
                        cardId = { cardId }
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
    );
});