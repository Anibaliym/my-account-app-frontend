import { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tooltip } from '@nextui-org/react'; 
import { UpdateCashBalanceAPI, UpdateCurrentAccountBalanceAPI } from '../../../assets/api/MyAccountAppAPI/Sheet';
import { formatNumber, formatNumberWithThousandsSeparator } from '../../../assets/utilities/BalanceFormater';

export const SheetBalanceForm = ({ sheetName, isLoading, balances, setBalances, fetchSheet} ) => {
    const { sheetId } = useParams();
    const refcashBalance = useRef(); 
    const refcurrentAccountBalance = useRef(); 

    const [ totalAviable, setTotalAviable ] = useState(0); 

    const [ showSaveIconCashBalance, setShowSaveIconCashBalance ] = useState(false); 
    const [ showOkIconCashBalance, setShowOkIconCashBalance ] = useState(false); 
    const [ showSaveIconCurrentAccountBalance, setShowSaveIconCurrentAccountBalance ] = useState(false); 
    const [ showOkIconCurrentAccountBalance, setShowOkIconCurrentAccountBalance ] = useState(false); 

    useEffect(() => {
        // Cuando balances.cashBalance cambia, activa el icono
        if (balances.cashBalance) {
            setShowSaveIconCashBalance(true);

            // Opcional: desactiva automáticamente el ícono después de un tiempo
            const timeout = setTimeout(() => {
                setShowSaveIconCashBalance(false);
            }, 1500); // 1.5 segundos

            return () => clearTimeout(timeout); // Limpia el timeout al desmontar
        }
    }, [balances.cashBalance]); // Escucha cambios en balances.cashBalance



    const handleChange = (e, field) => {
        const value = e.target.value.replace(/\D/g, ''); 

        setBalances( (prevBalances) => ({
            ...prevBalances,
            [ field ]: `$${formatNumberWithThousandsSeparator(value)}`,
        }));
    };

    const handleKeyDown = async (e, field, value) => {
        const aschiiKey = e.which; 

        if(aschiiKey === 13) {
            switch (field) {
                case 'cashBalance':
                    await UpdateCashBalanceAPI( sheetId, formatNumber(value) );
                    setShowOkIconCashBalance(true); 
                    setShowSaveIconCashBalance(false); 
                    break;
                case 'currentAccountBalance':
                    await UpdateCurrentAccountBalanceAPI( sheetId, formatNumber(value) );
                    setShowOkIconCurrentAccountBalance(true); 
                    setShowSaveIconCurrentAccountBalance(false); 
                    
                    break;
            }

            fetchSheet(); 
            e.target.blur();
        }
    }    

    return (
        <>
            <h1 className="display-6">{ sheetName }</h1>

            <div className="row">
                <div className="col icon-save">
                    <Tooltip placement="bottom" content="crear respaldo" color="secondary" closeDelay={ 50 }>
                        <i className="bx bx-duplicate icon" ></i>
                    </Tooltip>
                    <Tooltip placement="bottom" content="eliminar" color="secondary" closeDelay={ 50 }>
                        <i className="bx bx-trash icon" ></i>
                    </Tooltip>
                    <Tooltip placement="bottom" content="exportar" color="secondary" closeDelay={ 50 }>
                        <i className='bx bx-export icon'></i>
                    </Tooltip>
                    <Tooltip placement="bottom" content="calendario" color="secondary" closeDelay={ 50 }>
                        <i className='bx bxs-calendar icon' ></i>
                    </Tooltip>
                </div>
            </div>

            <hr />
            { 
                isLoading 
                    ? ( <p>Loading...</p>) 
                    : 
                    (
                        <div>
                            <small>Efectivo</small>
                            <input
                                ref={ refcashBalance }
                                name="cashBalance"
                                type="text"
                                className="no-focus balance-input-text display-6 mb-1  animate__animated animate__fadeInDown animate__faster"
                                maxLength={11}
                                onChange={ ( e ) => handleChange( e, 'cashBalance')}
                                onKeyDown={ ( e ) => handleKeyDown( e, 'cashBalance', balances.cashBalance) }
                                onClick={ () => ( refcashBalance.current.select() ) }
                                value={ balances.cashBalance }
                            />

                            <div className="icon-save mt-1">
                                { ( showSaveIconCashBalance ) && (<i className={ `bx bx-save icon animate__animated animate__${ (showSaveIconCashBalance) ? 'fadeInUp' : 'fadeOutDown' } animate__faster` }></i>) }
                                { ( showOkIconCashBalance ) && (<i className={ `bx bx-check-circle icon animate__animated animate__${ (showOkIconCashBalance) ? 'fadeInUp' : 'fadeOutDown' } animate__faster` }></i>) }
                            </div>

                            <hr />
                            <small>cuenta corriente</small>
                            <input
                                ref={ refcurrentAccountBalance }

                                name="currentAccountBalance"
                                type="text"
                                className="no-focus balance-input-text display-6  animate__animated animate__fadeInDown animate__faster"
                                maxLength={ 11 }
                                onChange={  ( e ) => handleChange( e, 'currentAccountBalance')}
                                onKeyDown={  ( e ) => handleKeyDown( e, 'currentAccountBalance', formatNumberWithThousandsSeparator(balances.currentAccountBalance))}
                                onClick={ () => ( refcurrentAccountBalance.current.select() ) }

                                value={balances.currentAccountBalance}
                            />

                            <div className="icon-save mt-1">
                                { ( showSaveIconCurrentAccountBalance ) && ( <i className={ `bx bx-save icon animate__animated animate__${ (showSaveIconCurrentAccountBalance) ? 'fadeInUp' : 'fadeOutDown' } animate__faster` }></i> ) }
                                { ( showOkIconCurrentAccountBalance ) && ( <i className={ `bx bx-check-circle icon animate__animated animate__${ (showOkIconCurrentAccountBalance) ? 'fadeInUp' : 'fadeOutDown' } animate__faster` }></i> ) }
                            </div>

                            <hr />

                            <small>total disponible: ${ totalAviable }</small><br />
                            <small>total restante: $0</small>
                        </div>
                    )
            }
        </>
    )
}