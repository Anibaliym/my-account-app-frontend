import { Tooltip } from '@nextui-org/react';
import { CreateCardModal } from './CreateCardModal';

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
                    sheetCards.map( ({ id, title, description }, index) => (
                        <div key={ id } className={ `excel-card animate__animated animate__fadeInDown animate__faster` }>
                            <div className="excel-card-header mb-3">
                                <small>{title}</small>
                                <i className="bx bx-trash text-danger excel-icon"></i>
                            </div>

                            <div className="excel-card-body">
                                <div className="excel-card-row">
                                    <div className="excel-card-cell description">Mes</div>
                                    <div className="excel-card-cell value">$232.000</div>
                                    <div className="excel-card-cell action">
                                        <i className='bx bx-check-circle icon'></i>
                                        <i className='bx bx-trash icon'></i>
                                        <i className='bx bxs-palette icon' ></i>
                                        <i className='bx bx-sort-alt-2 icon' ></i>
                                    </div>
                                </div>
                                <div className="excel-card-row">
                                    <div className="excel-card-cell description">Benc</div>
                                    <div className="excel-card-cell value">$232.000</div>
                                    <div className="excel-card-cell action">
                                        <i className='bx bx-check-circle icon'></i>
                                        <i className='bx bx-trash icon'></i>
                                        <i className='bx bxs-palette icon' ></i>
                                        <i className='bx bx-sort-alt-2 icon' ></i>
                                    </div>
                                </div>
                                <div className="excel-card-row">
                                    <div className="excel-card-cell description">Mes</div>
                                    <div className="excel-card-cell value">$232.000</div>
                                    <div className="excel-card-cell action">
                                        <i className='bx bx-check-circle icon'></i>
                                        <i className='bx bx-trash icon'></i>
                                        <i className='bx bxs-palette icon' ></i>
                                        <i className='bx bx-sort-alt-2 icon' ></i>
                                    </div>
                                </div>
                                
                            </div>
                            <div className="excel-card-footer">
                                <div className="excel-card-cell">Total</div>
                                <div className="cell action">
                                    <h1 className="display-6" style={{ fontSize:'20px', color:'var(--primary-color)', fontWeight:'400' }}>$232.000</h1>
                                </div>
                            </div>
                        </div>
                    ))
                }


        </div>
    )
}
