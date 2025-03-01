import { useEffect, useLayoutEffect } from 'react';
import { Accordion, AccordionItem, Tooltip } from '@nextui-org/react';
import { GetUserAccountsWithSheetsFetch } from '../../assets/api/MyAccountAppAPI/DomainServices';
import { useState } from 'react';
import { motionProps } from '../../assets/data/accountMotionProps';
import { formatDate } from '../../assets/utilities/DateFormater';
// import { DndContext, closestCenter } from '@dnd-kit/core';
// import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities'; 

export const AccountsPage = ({ setPageName, isDarkMode }) => {
    const userData = JSON.parse( localStorage.getItem('user') );
    const { id: userId } = userData; 
    const [ userAccountsWithSheets, setUserAccountsWithSheets ] = useState([])

    useEffect(() => {
        setPageName('CUENTAS');
        GetUserAccountsWithSheets(); 
    }, [setPageName]); 
    
    const GetUserAccountsWithSheets = async () => {
        const { isError, data } = await GetUserAccountsWithSheetsFetch(userId);

        if(!isError)
            setUserAccountsWithSheets(data.data.accounts);
    }

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
        updateOrder(updatedOrder); 
    };        

    return (
        <div className="accounts-principal-container">
            <div className="account-balances-form mt-2">
                <input 
                    type="text" 
                    className={ `animate__animated animate__fadeIn d-flex justify-content-center align-items-center mt-1 text-center no-focus form-control form-control-sm ${ (isDarkMode) ? 'bg-dark text-light' : '' }` }
                    placeholder="nombre cuenta"
                    maxLength="30"
                />

                {/* <button className="dropdown-btn d-flex justify-content-center align-items-center mt-1">
                    <i className='bx bx-plus' ></i>
                </button> */}

            </div>
            <div className="account-cards-form mt-2">
                {
                    userAccountsWithSheets.map( ({ account, sheets }) => {
                        return (
                            <div key={ account.id } className={ `excel-card animate__animated animate__fadeInDown animate__faster mb-4` }>
                                <div className="excel-card-header">
                                    <h4>{ account.description }</h4>
                                    <div className="icons-container">
                                        <i className="bx bx-move card-icon mr-1"></i> 
                                    </div>
                                </div>

                                <div  className="excel-card-body mt-2">
                                    {
                                        sheets.map( (sheet, index) => {

                                            const { id: sheetId, order, description } = sheet.sheet;
                                            return (
                                                // <p key={ sheetId }>{ order } | { description }</p>
                                                <div 
                                                // ref={ setNodeRef } 
                                                // style={ {transform: CSS.Transform.toString(transform), transition} } // Estilos dinámicos de movimiento
                                                className={ `excel-card-vignette` }
                                                key={ sheetId }
                                            >
                                            <div className="excel-card-row">

                                                <div className="excel-card-cell description">
                                                    <input 
                                                        type="text" 
                                                        className={ `vignette-input-text-description no-focus` }
                                                        value={ description }
                                                        onChange={ ()=>{} }
                                                    />
                                                </div>
                                                <div className="excel-card-account-cell action">
                                                    <i className='bx bx-trash text-color-danger card-icon mr-5'></i>
                                                    <i className='bx bx-play-circle text-color-primary card-icon mr-1'></i>
                                                    <i className='bx bx-sort-alt-2 text-color-primary card-icon mr-1'></i>
                                                </div>
                                            </div>
                                            </div>

                                            )
                                        })

                                    }

                                    <div className={ `excel-card-row ${ (sheets.length != 0) ? 'mt-4' : 'mt-2' }` }>
                                        <div className="excel-card-cell description mb-2">
                                            <input 
                                                type="text" 
                                                style={ {border: 'none',}}
                                                className={ `animate__animated animate__fadeIn d-flex justify-content-center align-items-center mt-1 text-center no-focus form-control form-control-sm ${ (isDarkMode) ? 'bg-dark text-light' : '' }` }
                                                placeholder="nombre hoja de cálculo"
                                                maxLength="30"
                                            />
                                        </div>
                                    </div>
                                    <center>
                                        <i className='bx bx-plus card-icon text-success animate__animated animate__fadeInUp animate__faster'></i>
                                        <i className='bx bx-save card-icon text-success animate__animated animate__fadeInUp animate__faster'></i>
                                    </center>
                                </div>

                                <div className={`excel-card-footer mt-4 animate__animated animate__faster`}>
                                    <i className='bx bx-trash text-color-danger card-icon mr-1'  ></i>
                                </div>            
                            </div>        
                        )
                    })
                }
          </div>
        </div> 
    );
}