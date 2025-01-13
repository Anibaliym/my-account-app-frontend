import { Tooltip } from '@nextui-org/react'; 
import { useParams } from 'react-router-dom';
import { formatNumber, formatNumberWithThousandsSeparator } from '../../../assets/utilities/BalanceFormater';
import { UpdateCashBalanceAPI, UpdateCurrentAccountBalanceAPI } from '../../../assets/api/MyAccountAppAPI/Sheet';

export const SheetBalanceForm = ({ sheetName, setSheetName, cashBalanceRef, balances, icons, currentAccountBalanceRef, availableTotalBalance, setBalances, setIcons, fetchSheet, toSpendBalance, inFavorBalance }) => {
    const { sheetId } = useParams(); 

    const handleChange = (e, field) => {
        const value = e.target.value.replace(/\D/g, '');
        setBalances((prevBalances) => ({
            ...prevBalances,
            [field]: `$${formatNumberWithThousandsSeparator(value)}`,
        }));
    };

    const handleKeyDown = async (e, field, value) => {
        if (e.key === 'Enter') {
            switch (field) {
                case 'cashBalance':
                    await UpdateCashBalanceAPI(sheetId, formatNumber(value));
                    setIcons((prev) => ({
                        ...prev,
                        ok: { ...prev.ok, cashBalance: true },
                        save: { ...prev.save, cashBalance: false },
                    }));
                    break;
                case 'currentAccountBalance':
                    await UpdateCurrentAccountBalanceAPI(sheetId, formatNumber(value));
                    setIcons((prev) => ({
                        ...prev,
                        ok: { ...prev.ok, currentAccountBalance: true },
                        save: { ...prev.save, currentAccountBalance: false },
                    }));
                    break;
            }
            fetchSheet();
            e.target.blur();
        }
    };

    return (
        <div className="sheet-balances-form">
            <div className="sheet-balances-form-header">
                <h1 className="display-6 ">{ sheetName }</h1>

                <div className="row">
                    <div className="col icon-save">
                        <Tooltip placement="bottom" content="crear respaldo" color="secondary" closeDelay={ 50 }>
                            <i className='bx bxs-backpack icon' ></i>
                        </Tooltip>
                        <Tooltip placement="bottom" content="eliminar hoja de cálculo" color="secondary" closeDelay={ 50 }>
                            <i className="bx bx-trash icon" ></i>
                        </Tooltip>
                        <Tooltip placement="bottom" content="exportar a excel" color="secondary" closeDelay={ 50 }>
                            <i className='bx bx-export icon'></i>
                        </Tooltip>
                        <Tooltip placement="bottom" content="calendario" color="secondary" closeDelay={ 50 }>
                            <i className='bx bxs-calendar icon' ></i>
                        </Tooltip>
                    </div>
                </div>

            </div>

            <hr />
            
            <div>
                <small>Efectivo</small>

                <input
                    ref={cashBalanceRef}
                    name="cashBalance"
                    type="text"
                    className="no-focus balance-input-text display-6 mb-1"
                    maxLength={11}
                    onChange={(e) => handleChange(e, 'cashBalance')}
                    onKeyDown={(e) => handleKeyDown(e, 'cashBalance', balances.cashBalance)}
                    onClick={() => cashBalanceRef.current.select()}
                    value={balances.cashBalance}
                />
                <div className="icon-save">
                    {icons.save.cashBalance && <i className="bx bx-save icon animate__animated animate__fadeInUp animate__faster"></i>}
                    {icons.ok.cashBalance && <i className="bx bx-check-circle icon animate__animated animate__fadeInUp animate__faster"></i>}
                </div>
                <small>Cuenta Corriente</small>
                <input
                    ref={currentAccountBalanceRef}
                    name="currentAccountBalance"
                    type="text"
                    className="no-focus balance-input-text display-6"
                    maxLength={11}
                    onChange={(e) => handleChange(e, 'currentAccountBalance')}
                    onKeyDown={(e) => handleKeyDown(e, 'currentAccountBalance', balances.currentAccountBalance)}
                    onClick={() => currentAccountBalanceRef.current.select()}
                    value={balances.currentAccountBalance}
                />
                <div className="icon-save mt-1">
                    { icons.save.currentAccountBalance && <i className="bx bx-save icon animate__animated animate__fadeInUp animate__faster"></i> }
                    { icons.ok.currentAccountBalance && <i className="bx bx-check-circle icon animate__animated animate__fadeInUp animate__faster"></i> }
                </div>


                <div className="list-group mt-2">

                    <Tooltip placement="right" content="Indica la cantidad total disponible sumando el efectivo y la cuenta corriente." color="secondary" closeDelay={ 50 }>
                        <a className="list-group-item">
                            <div className="d-flex w-100 justify-content-between">
                                <small className="text-body-secondary" style={{ color:'var(--text-color)' }}>Total Disponible</small>
                            </div>
                            <p className="mb-1 ml-3">${formatNumberWithThousandsSeparator(availableTotalBalance)}</p>
                        </a>
                    </Tooltip>
                    <Tooltip placement="right" content="Muestra el monto total ya asignado o presupuestado para los gastos actuales." color="secondary" closeDelay={ 50 }>
                        <a className="list-group-item">
                            <div className="d-flex w-100 justify-content-between">
                                <small className="text-body-secondary">Total Gastos Planificados</small>
                            </div>
                            <p className="mb-1 ml-3">${formatNumberWithThousandsSeparator(toSpendBalance)}</p>
                        </a>
                    </Tooltip>
                    <Tooltip placement="right" content="Indica el saldo restante después de descontar los gastos planificados del total disponible." color="secondary" closeDelay={ 50 }>
                        <a className={ `list-group-item ${ (inFavorBalance < 0 && 'list-group-item-danger' ) }` } style={{  color: `${ inFavorBalance < 0 ? 'red':'black' }` }}>
                            <div className="d-flex w-100 justify-content-between">
                                <small className="text-body-secondary">Saldo Libre</small>

                                {
                                    inFavorBalance < 0 && (<small className="animate__animated animate__fadeInDown animate__faster" style={{ color: 'red' }}>SALDO NEGATIVO</small>)
                                }

                            </div>
                            <p className="mb-1 ml-3">${formatNumberWithThousandsSeparator(inFavorBalance)}</p>
                        </a>
                    </Tooltip>


                </div>
     
            </div>        
        </div>
    );
};