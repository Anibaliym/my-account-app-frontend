import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { GetSheetByIdAsync, UpdateCashBalanceAPI, UpdateCurrentAccountBalanceAPI } from '../../assets/api/MyAccountAppAPI/Sheet';
import { formatNumber, formatNumberWithThousandsSeparator } from '../../assets/utilities/BalanceFormater';
import { Tooltip } from '@nextui-org/react';
import '/src/assets/css/sheet.css'; 
import { useRef } from 'react';

export const SheetPage = ({ showUserMessage }) => {
    const { sheetId } = useParams();

    const cashBalanceRef = useRef(); 
    const currentAccountBalanceRef = useRef(); 

    const [ sheet, setSheet ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ balances, setBalances ] = useState({ cashBalance: '', currentAccountBalance: '' });
    const [ oldCashBalance, setOldCashBalance ] = useState(0); 
    const [ oldCurrentAccountBalance, setCurrentAccountBalance ] = useState(0); 
    const [ totalAviable, setTotalAviable ] = useState(0); 
    const [ leftBalance, setLeftBalance ] = useState(0); 
    const [ sheetName, setSheetName ] = useState('hoja de cálculo'); 
    const [ showSaveIconCashBalance, setShowSaveIconCashBalance ] = useState(false); 
    const [ showOkIconCashBalance, setShowOkIconCashBalance ] = useState(false); 
    const [ showSaveIconCurrentAccountBalance, setShowSaveIconCurrentAccountBalance ] = useState(false); 
    const [ showOkIconCurrentAccountBalance, setShowOkIconCurrentAccountBalance ] = useState(false); 

    useEffect(() => {
        fetchSheet();
    }, [ sheetId ]);

    useEffect(() => {
        setShowSaveIconCashBalance(formatNumber(balances.cashBalance) != oldCashBalance); 
    }, [ balances.cashBalance ])

    useEffect(() => {
        setShowSaveIconCurrentAccountBalance(formatNumber(balances.currentAccountBalance) != oldCurrentAccountBalance); 
    }, [ balances.currentAccountBalance ])

    useEffect(() => {
        const firstAmount = Number(formatNumber(balances.cashBalance)); 
        const secondAmount = Number(formatNumber(balances.currentAccountBalance)); 
        setTotalAviable( formatNumberWithThousandsSeparator( firstAmount + secondAmount ) )
    }, [ balances ])
    
    useEffect(() => {
        if(showOkIconCashBalance) {
            setTimeout(() => {
                setShowOkIconCashBalance(false); 
            }, 1500);
        }

        if(showOkIconCurrentAccountBalance) {
            setTimeout(() => {
                setShowOkIconCurrentAccountBalance(false); 
            }, 1500);
        }

    }, [ showOkIconCashBalance, showOkIconCurrentAccountBalance ])

    const fetchSheet = async () => {
        try {
            const { isError, data } = await GetSheetByIdAsync(sheetId);
            const { description, cashBalance, currentAccountBalance } = await data;

            if (isError) {
                showUserMessage('Ocurrió un error al intentar cargar la hoja de cálculo.')
                return;
            }

            setSheetName( description ); 
            
            setBalances({
                cashBalance: `$${formatNumberWithThousandsSeparator( cashBalance )}`,
                currentAccountBalance: `$${formatNumberWithThousandsSeparator( currentAccountBalance )}`,
            });

            setOldCashBalance(cashBalance);
            setCurrentAccountBalance(currentAccountBalance); 
            setSheet(data);
        } 
        catch (error) 
        {
            showUserMessage('Error fetching sheet:', error);
        } 
        finally 
        {
            setIsLoading(false);
        }
    };

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
            <div className="containerr">
                <div className="section section-1">
                    <h1 className="display-6">{ sheetName }</h1>

                    <hr />

                    { 
                        isLoading 
                            ? ( <p>Loading...</p>) 
                            : 
                            (
                                <div>
                                    <small>Efectivo</small>
                                    <input
                                        ref={ cashBalanceRef }
                                        name="cashBalance"
                                        type="text"
                                        className="no-focus balance-input-text display-6 mb-1  animate__animated animate__fadeInDown animate__faster"
                                        maxLength={11}
                                        onChange={ ( e ) => handleChange( e, 'cashBalance')}
                                        onKeyDown={ ( e ) => handleKeyDown( e, 'cashBalance', balances.cashBalance) }
                                        onClick={ () => ( cashBalanceRef.current.select() ) }
                                        value={ balances.cashBalance }
                                    />

                                    <div className="icon-save mt-1">
                                        { ( showSaveIconCashBalance ) && (<i className={ `bx bx-save icon animate__animated animate__${ (showSaveIconCashBalance) ? 'fadeInUp' : 'fadeOutDown' } animate__faster` }></i>) }
                                        { ( showOkIconCashBalance ) && (<i className={ `bx bx-check-circle icon animate__animated animate__${ (showOkIconCashBalance) ? 'fadeInUp' : 'fadeOutDown' } animate__faster` }></i>) }
                                    </div>

                                    <hr />
                                    <small>cuenta corriente</small>
                                    <input
                                        ref={ currentAccountBalanceRef }
                                        name="currentAccountBalance"
                                        type="text"
                                        className="no-focus balance-input-text display-6  animate__animated animate__fadeInDown animate__faster"
                                        maxLength={ 11 }
                                        onChange={  ( e ) => handleChange( e, 'currentAccountBalance')}
                                        onKeyDown={  ( e ) => handleKeyDown( e, 'currentAccountBalance', balances.currentAccountBalance)}
                                        onClick={ () => ( currentAccountBalanceRef.current.select() ) }
                                        value={balances.currentAccountBalance}
                                    />

                                    <div className="icon-save mt-1">
                                        { ( showSaveIconCurrentAccountBalance ) && ( <i className={ `bx bx-save icon animate__animated animate__${ (showSaveIconCurrentAccountBalance) ? 'fadeInUp' : 'fadeOutDown' } animate__faster` }></i> ) }
                                        { ( showOkIconCurrentAccountBalance ) && ( <i className={ `bx bx-check-circle icon animate__animated animate__${ (showOkIconCurrentAccountBalance) ? 'fadeInUp' : 'fadeOutDown' } animate__faster` }></i> ) }
                                    </div>


                                    <hr />

                                    <small>total disponible: ${ totalAviable }</small><br />
                                    <small>total restante: ${ leftBalance }</small>

                                    <div className="row mt-5">
                                        <div className="col icon-save">

                                            <Tooltip placement="bottom" content="crear carta" color="secondary" closeDelay={ 50 }>
                                                <i className="bx bx-add-to-queue icon" ></i>
                                            </Tooltip>

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

                                </div>

                            )
                        }                    
                </div>
                <div className="section section-2">
                    <small>acordion</small>
                </div>
            </div>
        </>
    );
};