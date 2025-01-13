import { Tooltip } from '@nextui-org/react';
import { CreateCardModal } from './CreateCardModal';
import { CardForm } from './CardForm';

export const SheetCardsForm = ({ showModalCreateCard, setShowModalCreateCard, showUserMessage, fetchCard, sheetCards, getCalculatedCardTotals }) => {
    return (
        <div className="sheet-cards-form">
            <CreateCardModal 
                showModalCreateCard={ showModalCreateCard } 
                setShowModalCreateCard={ setShowModalCreateCard } 
                showUserMessage={ showUserMessage } 
                fetchCard={ fetchCard } 
            />

            <div className="card-control-navbar mb-2">
                <Tooltip placement="bottom" content="crear carta de planificación" color="secondary" closeDelay={ 50 }>
                    <i className="bx bx-add-to-queue text-light r" onClick={ () => ( setShowModalCreateCard(!showModalCreateCard) ) } ></i>
                </Tooltip>
            </div>

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
