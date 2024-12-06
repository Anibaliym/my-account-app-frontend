import { Tooltip } from '@nextui-org/react';
import { CreateCardModal } from './CreateCardModal';
import { CardVignette } from './CardVignette';
import { vinetasCarta } from '../../../assets/data/testVinetas';
import { useEffect } from 'react';

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
                (sheetCards.length === 0) && (<div  className="animate__animated animate__fadeInDown animate__faster"><small> <span className="sheet-list">no hay hojas de cálculo disponibles ...</span> </small></div>)
            }

            {
                sheetCards.map( ({ id, title, description, vignettes}, index) => (
                    <div key={ id } className={ `excel-card animate__animated animate__fadeInDown animate__faster` }>
                        <div className="excel-card-header">
                            <small className="lead">
                                { title }
                            </small>

                            <div className="icons-container">
                                <Tooltip placement="bottom" content="Eliminar la carta" color="secondary" closeDelay={50}>
                                    <i className="bx bx-trash icon excel-icon"></i>
                                </Tooltip>
                                <Tooltip placement="bottom" content="Agregar una viñeta" color="secondary" closeDelay={50}>
                                    <i className="bx bx-plus icon excel-icon"></i>
                                </Tooltip>
                            </div>
                        </div>

                        <div className="excel-card-body">
                            {  
                                vignettes?.map( ( vignette, index ) => (
                                    <CardVignette key={ index} Vignettes={vignette} />
                                ))
                            }
                        </div>
                        <div className="excel-card-footer">
                            <div className="excel-card-cell">Total</div>
                            <div className="cell action">
                                <h1 className="display-6" style={{ fontSize:'20px', color:'var(--primary-color)', fontWeight:'400' }}>$0</h1>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
