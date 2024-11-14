import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSheetsAccountAPI } from '../../assets/api/MyAccountAppAPI/DomainServices';
import { Tooltip } from "@nextui-org/react";
import { useRef } from 'react';
import { GetSheetByAccountIdAPI, createSheetAPI } from '../../assets/api/MyAccountAppAPI/Sheet';
import { UserMessage } from '../components/UserMessage';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SheetDragableListItem } from '../components/account/SheetDragableListItem';

export const AccountPage = ({ isDarkMode, setAccountListener, accountListener, setPageName }) => {
    const addSheetInputText = useRef(); 
    const { accountId } = useParams(); 
    const [ sheets, setSheets ] = useState([]); 
    const [ sheetName, setSheetName ] = useState(''); 
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

    const onChangeSheetName = (e) => {
        const { value } = e.target; 
        setSheetName(value); 
    }
    
    const onKeyDownSheetName = (e) => {
        if(e.keyCode === 13)
            onAddSheet(); 
    }

    const onDeleteItem = (sheetId) => {
        setSheets((prevSheets) => prevSheets.filter(sheet => sheet.id !== sheetId));
        setAccountListener( accountListener - 1 )
    };    

    const onUpdateSheetRefresh = () => {
        setAccountListener( accountListener - 1 )
    };

    const onDrawEnd = (event) => {
        const { active, over } = event;
    
        // Encuentra los índices antiguos y nuevos
        const oldIndex = sheets.findIndex(s => s.id === active.id);
        const newIndex = sheets.findIndex(s => s.id === over.id);
    
        // Mueve el elemento dentro del array
        const newOrder = arrayMove(sheets, oldIndex, newIndex);
    
        // Actualiza la propiedad "order" en base al nuevo índice
        const updatedOrder = newOrder.map((item, index) => ({
            ...item,
            order: index + 1, // Ajusta el orden basado en la nueva posición
        }));
    
        setSheets(updatedOrder);
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
                        placement="right"
                        content="Nueva hoja de cálculo"
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
                </div>
            </div>
            <div className="row">
                <div className="col-3">

                    <DndContext
                        collisionDetection={ closestCenter }
                        onDragEnd={ onDrawEnd }
                    >
                        <ul className="list-group mt-3">
                            <SortableContext items={ sheets } strategy={ verticalListSortingStrategy }> 
                                {
                                    (sheets.length === 0) && (<small className="animate__animated animate__fadeInDown animate__faster"> <span className="sheet-list">no hay hojas de cálculo disponibles ...</span> </small>)
                                }

                                {

                                    (sheets)
                                        .slice() // Crea una copia del array para no mutar el original
                                        .sort((a, b) => a.order - b.order) // Ordena por el campo "order" en orden ascendente
                                        .map(({ description, id, order, cashBalance, currentAccountBalance }) => (
                                            <SheetDragableListItem
                                                key={ id }
                                                id={ id }
                                                description={ description }
                                                isDarkMode={ isDarkMode }
                                                onDeleteItem={ onDeleteItem }
                                                onUpdateSheetRefresh={ onUpdateSheetRefresh }
            
                                            />
                                    ))
                                }                                
                            </SortableContext>
                        </ul>
                    </DndContext>

                </div>
            </div>
        </>
    )
}
