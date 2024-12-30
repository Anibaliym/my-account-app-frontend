import { Tooltip } from '@nextui-org/react';
import { CardVignette } from './CardVignette';
import { useState } from 'react';
import { DeleteCardConfirmationModal } from './DeleteCardConfirmationModal';
import { deleteCardWithVignettesFetch } from '../../../assets/api/MyAccountAppAPI/DomainServices';
import { CreateVignetteFetch, GetVignetteByCardIdFetch } from '../../../assets/api/MyAccountAppAPI/Vignette';
import { formatNumberWithThousandsSeparator } from '../../../assets/utilities/BalanceFormater';

export const CardForm = ({ cardId, title, vignettesData, showUserMessage, fetchCard }) => {
    const [ vignettes, setVignettes ] = useState(vignettesData); 
    const [ modalConfirmDeleteCard, setModalConfirmDeleteCard ] = useState(false); 

    const createVignette = async () => {
        const { isError, message, data: vignette } = await CreateVignetteFetch( cardId, 5 );

        if(isError) {
            showUserMessage(message); 
            return; 
        }

        setVignettes([...vignettes, vignette]); 
    }

    const deleteCard = async () => {
        const { isError, data: vignettes } = await GetVignetteByCardIdFetch(cardId); 
        
        if(!isError) 
        {
            if(vignettes.length > 0) 
                setModalConfirmDeleteCard(true); 
            else {
                
                const { isError, data } = await deleteCardWithVignettesFetch(cardId);
                
                showUserMessage( (!isError) ? `Carta "${ title }" eliminada` : 'Ocurrió un error al intentar eliminar la carta.' )

                fetchCard(); 
            }
        }
        else 
            showUserMessage('Ocurrió un error al intentar eliminar la carta.')
    }

    const deleteCardWithVignettes = async () => {
        const { isError, data } = await deleteCardWithVignettesFetch(cardId);
        showUserMessage( (!isError) ? 'Carta eliminada exitosamente' : 'Ocurrió un error al intentar eliminar la carta.' )
        setModalConfirmDeleteCard( false ); 
        fetchCard(); 
    }

    return (
        <div className={ `excel-card animate__animated animate__fadeInDown animate__faster` }>
            <DeleteCardConfirmationModal
                cardTitle={ title }
                modalConfirmDeleteCard={ modalConfirmDeleteCard }
                setModalConfirmDeleteCard={ setModalConfirmDeleteCard }
                showUserMessage={ showUserMessage }
                deleteCardWithVignettes={ deleteCardWithVignettes }
            />

            <div className="excel-card-header">
                <small className="lead">
                    { title }
                </small>

                <div className="icons-container">
                    <Tooltip placement="bottom" content="Eliminar la carta" color="secondary" closeDelay={50}>
                        <i className="bx bx-trash icon excel-icon" onClick={ deleteCard }></i>
                    </Tooltip>
                    <Tooltip placement="bottom" content="Agregar una viñeta" color="secondary" closeDelay={50}>
                        <i className="bx bx-plus icon excel-icon" onClick={ createVignette } ></i>
                    </Tooltip>
                </div>
            </div>

            <div className="excel-card-body">
                {  
                    vignettes?.map( ( vignette ) => (
                        <CardVignette 
                            key={ vignette.id } 
                            cardId={ cardId }
                            vignette={ vignette } 
                            showUserMessage={ showUserMessage }
                            setVignettes={ setVignettes }
                            vignettes={ vignettes }
                        />
                    ))
                }
            </div>

            <div className="excel-card-footer">
                <div className="excel-card-cell"></div>
                <div className="cell action">
                    <h1 
                        className="display-6" 
                        style={{ 
                            fontSize:'25px', 
                            color:'var(--primary-color)', 
                            fontWeight:'400', 
                            // marginRight: '95px'
                        }}>
                            ${ formatNumberWithThousandsSeparator( 1000 ) }
                    </h1>
                </div>
            </div>
        </div>        
    )
}
