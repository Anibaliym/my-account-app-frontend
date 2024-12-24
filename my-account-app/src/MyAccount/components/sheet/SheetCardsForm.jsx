import { Tooltip } from '@nextui-org/react';
import { CreateCardModal } from './CreateCardModal';
import { CardForm } from './CardForm';

export const SheetCardsForm = ({ showModalCreateCard, setShowModalCreateCard, showUserMessage, fetchCard, sheetCards }) => {

    return (

        <div className="sheet-cards-form">
            <CreateCardModal 
                showModalCreateCard={ showModalCreateCard } 
                setShowModalCreateCard={ setShowModalCreateCard } 
                showUserMessage={ showUserMessage } 
                fetchCard={ fetchCard } 
            />

            <div className="card-control-navbar mb-2">
                <Tooltip placement="bottom" content="crear carta" color="secondary" closeDelay={ 50 }>
                    <i className="bx bx-add-to-queue text-light r" onClick={ () => ( setShowModalCreateCard(!showModalCreateCard) ) } ></i>
                </Tooltip>
            </div>

            { 
                (sheetCards.length === 0) && (<div  className="animate__animated animate__fadeInDown animate__faster"><small> <span className="sheet-list ml-2">No hay cartas creadas para la hoja de cálculo ...</span> </small></div>)
            }

            {
                sheetCards.map( ({ id, title, vignettes }) => (
                    <CardForm
                        key={ id }
                        cardId={ id }
                        title={ title }
                        vignettesData={ vignettes }
                        showUserMessage={ showUserMessage }
                        fetchCard={ fetchCard }
                    />
                ))
            }
        </div>
    )
}
