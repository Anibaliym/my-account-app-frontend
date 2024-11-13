import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSheetsAccountAPI } from '../../assets/api/MyAccountAppAPI/DomainServices';
import { Tooltip } from "@nextui-org/react";
import { useRef } from 'react';
import { GetSheetByAccountIdAPI, createSheetAPI } from '../../assets/api/MyAccountAppAPI/Sheet';
import { SheeListItem } from '../components/account/SheeListItem';
import { IsLoading } from '../components/IsLoading';
import { UserMessage } from '../components/UserMessage';

export const AccountPage = ({ isDarkMode, setAccountListener, accountListener, setPageName }) => {
    const addSheetInputText = useRef(); 
    const { accountId } = useParams(); 
    const [ sheets, setSheets ] = useState([]); 
    const [ sheetName, setSheetName ] = useState(''); 
    const [ isLoading, setIsLoading] = useState(false); 

    const [ message, setMessage ] = useState(''); 
    const [ showMessage, setShowMessage] = useState(false); 
    
    useEffect(() => {
        getSheetsAccount();
    }, [ accountId ])

    useEffect(() => {
        addSheetInputText.current.select(); 
    }, [])
    
    const getSheetsAccount  = async () => {
        const { isError, data } = await getSheetsAccountAPI( accountId ); 

        if(!isError){
            const { account, sheets: sheetsData } = data; 
            setPageName(account.name); 
            setSheets(sheetsData); 
        }
    }

    const showUserMessage = (message) => {
        setMessage(message);
        setShowMessage(true);            
    }
    
    const onAddSheet = () => {
        if(sheetName.length === 0){
            showUserMessage('El nombre de la hoja de cálculo, es invalida!');
            return; 
        }

        createSheet(); 
    }
    
    const createSheet = async () => {
        setIsLoading(true); 
        const { isError, message } = await createSheetAPI(accountId, sheetName); 

        if(!isError) {
            setIsLoading(false); 
            setSheetName('');
            const { data: dataSheets } = await GetSheetByAccountIdAPI( accountId ); 
            setSheets(dataSheets); 
            setAccountListener( accountListener + 1 )

            showUserMessage('Hoja de calculo creada correctamente');
        }
        else 
            showUserMessage(message);
    }

    const onChangeSheetName = (e) => {
        const { value } = e.target; 
        setSheetName(value); 
    }
    
    const onKeyDownSheetName = (e) => {
        if(e.keyCode === 13)
            onAddSheet(); 
    }

    const handleDeleteSheetRefresh = (sheetId) => {
        setSheets((prevSheets) => prevSheets.filter(sheet => sheet.id !== sheetId));
        setAccountListener( accountListener - 1 )
    };    

    const handleUpdateSheetRefresh = () => {
        setAccountListener( accountListener - 1 )
    };

    return (
        <>
            <div className="container-fluid">
                <div className="row" style={ { height: "30px" } }>
                    <UserMessage message={ message } show={ showMessage } setShowMessage={ setShowMessage }/>
                </div>
            </div>

            <div className="row">
                <div className="col-3">
                    <input 
                        type="text" 
                        maxLength="300"
                        ref={ addSheetInputText }
                        value={ sheetName }
                        onChange={ onChangeSheetName }
                        onKeyDown={ onKeyDownSheetName }
                        className={ `form-control form-control-sm ${ (isDarkMode) ? 'bg-dark text-light' : '' } no-focus` } 

                        placeholder="Titulo hoja de cálculo" 
                    />

                    <Tooltip
                        placement="bottom"
                        content="Nueva hoja de cálculo"
                        color="secondary"
                        closeDelay={ 50 }
                    >
                        <button 
                            className={ `no-focus form-control mt-2 btn btn-outline-${ (isDarkMode) ? 'light' : 'dark' } btn-sm me-2` }
                            onClick={ onAddSheet }
                        >
                            Crear
                            {/* {
                                (isLoading) && (<IsLoading isDarkMode={ isDarkMode } />)
                            } */}
                            
                        </button>
                    </Tooltip>


                </div>
            </div>
            <div className="row">
                <div className="col-3">

                    <ul className="list-group mt-3">

                        {
                            (sheets.length === 0) && (<small className="animate__animated animate__fadeInDown animate__faster"> <span className="sheet-list">no hay hojas de cálculo disponibles ...</span> </small>)
                        }

                        {
                            (sheets)
                                .slice() // Crea una copia del array para no mutar el original
                                .sort((a, b) => a.order - b.order) // Ordena por el campo "order" en orden ascendente
                                .map(({ description, id, order, cashBalance, currentAccountBalance }) => (
                                    <SheeListItem 
                                        key={id} 
                                        order={order}
                                        cashBalance={cashBalance}
                                        currentAccountBalance={currentAccountBalance}
                                        sheetId={id}
                                        accountId={accountId} 
                                        description={description} 
                                        isDarkMode={isDarkMode} 
                                        onDeleteSheetRefresh={ handleDeleteSheetRefresh } // Pasa la función como prop
                                        onUpdateSheetRefresh={ handleUpdateSheetRefresh }
                                        setMessage={ setMessage }
                                        setShowMessage={ setShowMessage }                                        
                                    />
                                ))
                        }                        
                    </ul>


                </div>
            </div>
        </>
    )
}
