import { Tooltip } from '@nextui-org/react';
import { CardVignette } from './CardVignette';
import { CreateVignetteFetch } from '../../../assets/api/MyAccountAppAPI/Vignette';
import { useState } from 'react';
import { useEffect } from 'react';

export const CardForm = ({ cardId, title, description, vignettesData, showUserMessage }) => {

    const [ vignettes, setVignettes ] = useState(vignettesData); 

    const createVignette = async () => {
        const { isError, message, data: vignette } = await CreateVignetteFetch( cardId, 5 );

        if(isError) {
            showUserMessage(message); 
            return; 
        }

        setVignettes([...vignettes, vignette]); 
    }
    
    return (
        <div className={ `excel-card animate__animated animate__fadeInDown animate__faster` }>
            <div className="excel-card-header">
                <small className="lead">
                    { title }
                </small>

                <div className="icons-container">
                    <Tooltip placement="bottom" content="Eliminar la carta" color="secondary" closeDelay={50}>
                        <i className="bx bx-trash icon excel-icon"></i>
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
                <div className="excel-card-cell">Total</div>
                <div className="cell action">
                    <h1 className="display-6" style={{ fontSize:'20px', color:'var(--primary-color)', fontWeight:'400' }}>$0</h1>
                </div>
            </div>
        </div>        
    )
}
