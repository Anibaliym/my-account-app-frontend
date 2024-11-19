import { Tooltip } from '@nextui-org/react'; 
import { useState } from 'react';
import { GetSheetByAccountIdAPI, createSheetAPI } from '../../../assets/api/MyAccountAppAPI/Sheet';

export const CardSheetAdd = ({ accountId, setSheets, accountListener, setAccountListener, showUserMessage }) => {
    const [ sheetName, setSheetName ] = useState(''); 

    const onChangeSheetName = (e) => {
        const { value } = e.target; 
        setSheetName(value); 
    }
    
    const onKeyDownSheetName = (e) => {
        if(e.keyCode === 13)
            onAddSheet(); 
    }

    const onAddSheet = () => {
        if(sheetName.length === 0){
            showUserMessage('El nombre de la hoja de cálculo, es invalida!');
            return; 
        }

        createSheet(); 
    }

    const createSheet = async () => {
        const { isError, message } = await createSheetAPI(accountId, sheetName); 

        if(!isError) {
            setSheetName('');
            const { data: dataSheets } = await GetSheetByAccountIdAPI( accountId ); 
            setSheets(dataSheets); 
            setAccountListener( accountListener + 1 )

            showUserMessage('Hoja de calculo creada correctamente');
        }
        else 
            showUserMessage(message);
    }        

    return (
        <div className="card-sheet animate__animated animate__fadeIn animate__faster">
            <div className="card-sheet-header">
                Hola de cálculo: 
            </div>
            <div className="card-sheet-title">
                <input 
                    className="card-input-text display-6 text-center" 
                    placeholder="ingrese el nombre de la hoja de cálculo" 
                    type="text" 
                    maxLength={ 20 }
                    onChange={ onChangeSheetName }
                    onKeyDown={ onKeyDownSheetName }
                    value={ sheetName }
                />

                <Tooltip
                    placement="bottom"
                    content="agregar hoja de cálculo"
                    color="secondary"
                    closeDelay={ 50 }
                >
                    <center>
                        <i className='bx bx-plus icon mt-3' onClick={ onAddSheet }></i>
                    </center>

                </Tooltip>
            </div>
            <div className="card-sheet-footer mt-3">
                <small>
                    Puedes agregar cuantas hojas de cálculo necesites
                </small>
            </div>
        </div>        
    )
}
