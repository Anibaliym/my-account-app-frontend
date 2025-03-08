import { Tooltip } from '@nextui-org/react'; 
import { useState } from 'react';
import { GetSheetByAccountIdAPI, createSheetAPI } from '../../../assets/api/MyAccountAppAPI/Sheet';
import { CardListSheet } from './CardListSheet';

export const CardSheetAdd = ({ accountId, setSheets, accountListener, setAccountListener, showUserMessage, sheets, isDarkMode }) => {
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
            showUserMessage('el nombre de la hoja de cálculo no es válido.', 'warning');
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

            showUserMessage('hoja de cálculo creada correctamente', 'success');
        }
        else 
            showUserMessage('ocurrió un error al intentar crear la hoja de cálculo', 'error');
    }        

    return (
        <div className="card-account animate__animated animate__fadeIn animate__faster">
            <h5 className="text-center">hojas de cálculo</h5>
            
            <input 
                className="card-input-text display-6 text-center mt-2" 
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
                color="foreground"
                closeDelay={ 50 }
            >
                <center>
                    <i className='bx bx-plus icon mt-3' onClick={ onAddSheet }></i>
                </center>
            </Tooltip>
            <hr />

            <CardListSheet
                sheets={ sheets }
                setSheets={ setSheets }
                accountId={ accountId }
                isDarkMode={ isDarkMode }   
                showUserMessage={ showUserMessage }        
                setAccountListener={ setAccountListener }
                accountListener={ accountListener }
            />
        </div>
    )
}
