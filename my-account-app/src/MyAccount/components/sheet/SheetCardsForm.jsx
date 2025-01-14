import { CardForm } from './CardForm';

export const SheetCardsForm = ({  showUserMessage, fetchCard, sheetCards, getCalculatedCardTotals }) => {
    return (
        <div className="sheet-cards-form">
            { 
                (sheetCards.length === 0) 
                    && (
                        <div className="animate__animated animate__fadeInDown animate__faster">
                            <h4> 
                                <center>
                                    <span className="sheet-list ml-2">
                                        No Hay Cartas De Planificación Creadas Aún
                                    </span> 
                                </center>
                            </h4>
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
