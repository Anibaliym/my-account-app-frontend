import { CardForm } from './CardForm';

export const SheetCardsForm = ({  showUserMessage, fetchCard, sheetCards, getCalculatedCardTotals }) => {
    return (
        <div className="sheet-cards-form">
            { 
                (sheetCards.length === 0) 
                    && (
                        <div className="animate__animated animate__fadeInDown animate__faster">
                            <h6> 
                                <span className="sheet-list">
                                    No hay cartas de planificación creadas en la hoja de cálculo.
                                </span> 
                            </h6>
                        </div>
                    )
            }

            {
                sheetCards.map( ({ id, title, vignettes, totalCardAmount }) => (
                    <CardForm
                        key={ id }
                        cardId={ id }
                        title={ title }
                        vignettesData={ vignettes }
                        showUserMessage={ showUserMessage }
                        fetchCard={ fetchCard }
                        totalCardAmount={ totalCardAmount }
                        getCalculatedCardTotals={ getCalculatedCardTotals }
                    />
                ))
            }
        </div>
    )
}
