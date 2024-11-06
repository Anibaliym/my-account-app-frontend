import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSheetsAccountAPI } from '../../assets/api/MyAccountAppAPI/DomainServices';
import { PageTitle } from '../components/PageTitle';
import { Tooltip } from "@nextui-org/react";
import { useRef } from 'react';
import { GetSheetByAccountIdAPI, createSheetAPI } from '../../assets/api/MyAccountAppAPI/Sheet';
import { SheeListItem } from '../components/account/SheeListItem';
import { IsLoading } from '../components/IsLoading';

export const AccountPage = ({ isDarkMode }) => {
    const addSheetInputText = useRef(); 
    const { accountId } = useParams(); 
    const [ account, setAccount ] = useState({ name: '', creationDate: '' })
    const [ sheets, setSheets ] = useState([]); 
    const [ sheetName, setSheetName ] = useState(''); 
    const [ isLoading, setIsLoading] = useState(false); 

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
            setAccount(account);
            setSheets(sheetsData); 
        }
    }

    const onAddSheet = () => {
        if(sheetName.length === 0){
            console.log('nombre de la hoja no valido'); 
            return; 
        }

        createSheet(); 
    }
    
    const createSheet = async () => {
        setIsLoading(true); 
        const { isError } = await createSheetAPI(accountId, sheetName); 

        if(!isError) {
            setIsLoading(false); 
            setSheetName('');
            const { data: dataSheets } = await GetSheetByAccountIdAPI( accountId ); 
            setSheets(dataSheets); 
        }
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
    };    

    return (
        <>
            <PageTitle titleDescription={ account.name } />

            <br />
            <div className="row">
                <div className="col-2">

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
                        content="Nueva hoja de calculo"
                        color="secondary"
                        closeDelay={ 50 }
                    >
                        <button 
                            className={ `no-focus form-control mt-2 btn btn-outline-${ (isDarkMode) ? 'light' : 'dark' } btn-sm me-2` }
                            onClick={ onAddSheet }
                        >
                            Crear
                        </button>
                    </Tooltip>

                    {
                        (isLoading) && (<IsLoading isDarkMode={ isDarkMode } />)
                    }

                </div>
                <div className="col-4">
                    <ul className="list-group">

                        {
                            (sheets.length === 0) && (<small className="animate__animated animate__fadeInDown animate__faster"> No hay hojas de calculo disponibles. </small>)
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
                                    />
                                ))
                        }                        
                    </ul>
                </div>
            </div>
        </>
    )
}
