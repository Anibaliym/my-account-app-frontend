import { Switch, Tooltip } from '@nextui-org/react'; 
import { useParams } from 'react-router-dom';
import { formatNumber, formatNumberWithThousandsSeparator } from '../../../assets/utilities/BalanceFormater';
import { UpdateCashBalanceAPI, UpdateCurrentAccountBalanceAPI } from '../../../assets/api/MyAccountAppAPI/Sheet';
import { CreateCardModal } from './CreateCardModal';
import { useState, useEffect } from 'react';

export const SheetBalanceForm = ({ sheetName, cashBalanceRef, balances, icons, currentAccountBalanceRef, availableTotalBalance, setBalances, setIcons, fetchSheet, toSpendBalance, inFavorBalance, showModalCreateCard, setShowModalCreateCard, fetchCard, showUserMessage }) => {
    const { sheetId } = useParams(); 
    const [ animationClass, setAnimationClass ] = useState(''); 

    useEffect(() => {
        // Activar la animación cuando sheetName cambia
        setAnimationClass("animate__fadeInUp");
    
        // Remover la animación después de un tiempo para permitir futuras animaciones
        const timeout = setTimeout(() => {
          setAnimationClass("");
        }, 500); // La duración de "animate__faster" es 500ms
    
        return () => clearTimeout(timeout);
      }, [sheetName]); // Se ejecuta cada vez que sheetName cambia

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

    const handleBlur = async ( controlName ) => {
        switch (controlName) {
            case 'cashBalance':
                await UpdateCashBalanceAPI(sheetId, formatNumber(balances.cashBalance));
                setIcons((prev) => ({
                    ...prev,
                    ok: { ...prev.ok, cashBalance: true },
                    save: { ...prev.save, cashBalance: false },
                }));
                break;
            case 'currentAccountBalance':
                await UpdateCurrentAccountBalanceAPI(sheetId, formatNumber(balances.currentAccountBalance));
                setIcons((prev) => ({
                    ...prev,
                    ok: { ...prev.ok, currentAccountBalance: true },
                    save: { ...prev.save, currentAccountBalance: false },
                }));
                break;
        }
    }

    return (
        <div className="sheet-balances-form">
            <CreateCardModal
                showModalCreateCard={ showModalCreateCard } 
                setShowModalCreateCard={ setShowModalCreateCard } 
                showUserMessage={ showUserMessage } 
                fetchCard={ fetchCard } 
            />

            <div className="sheet-balances-form-header">
                <h1 className={`display-6 animate__animated ${animationClass} animate__faster`}>{sheetName}</h1>

                <div className="row">
                    <div className="col icon-save">
                        <Tooltip placement="bottom" content="Crear carta de planificación" color="foreground" closeDelay={ 50 }>
                            <i className="bx bx-add-to-queue icon" onClick={ () => ( setShowModalCreateCard(!showModalCreateCard) ) } ></i>
                        </Tooltip>

                        <Tooltip placement="bottom" content="Crear Respaldo" color="foreground" closeDelay={ 50 }>
                            <i className='bx bxs-backpack icon' ></i>
                        </Tooltip>
                        <Tooltip placement="bottom" content="Eliminar hoja de cálculo" color="danger" closeDelay={ 50 }>
                            <i className="bx bx-trash icon" ></i>
                        </Tooltip>
                        <Tooltip placement="bottom" content="Exportar a excel" color="foreground" closeDelay={ 50 }>
                            <i className='bx bx-export icon'></i>
                        </Tooltip>
                        <Tooltip placement="bottom" content="Calendario" color="foreground" closeDelay={ 50 }>
                            <i className='bx bxs-calendar icon' ></i>
                        </Tooltip>
                    </div>
                </div>

            </div>

            <hr />

            <div>
                <small>Saldo Efectivo</small>

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
                    onBlur={ () => ( handleBlur('cashBalance') ) }
                />
                <div className="icon-save">
                    {icons.save.cashBalance && <i className="bx bx-save icon animate__animated animate__fadeInUp animate__faster"></i>}
                    {icons.ok.cashBalance && <i className="bx bx-check-circle icon animate__animated animate__fadeInUp animate__faster"></i>}
                </div>
                <small>Saldo Cuenta Bancaria</small>
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
                    onBlur={ () => ( handleBlur('currentAccountBalance') ) }
                />
                <div className="icon-save mt-1">
                    { icons.save.currentAccountBalance && <i className="bx bx-save icon animate__animated animate__fadeInUp animate__faster"></i> }
                    { icons.ok.currentAccountBalance && <i className="bx bx-check-circle icon animate__animated animate__fadeInUp animate__faster"></i> }
                </div>

                <div className="balance-calculate-amount-form mt-3">
                    <div className="balance-calculate-amount-item">
                        <small style={{ fontSize:'12px' }}>Total disponible</small>
                        <p className="mb-1 ml-3">${formatNumberWithThousandsSeparator(availableTotalBalance)}</p>
                    </div>
                    <div className="balance-calculate-amount-item">
                        <small style={{ fontSize:'12px' }}>Total gastos planificados</small>
                        <p className="mb-1 ml-3">${formatNumberWithThousandsSeparator(toSpendBalance)}</p>
                    </div>
                    <div className={ `${ inFavorBalance >= 0 ? 'balance-calculate-amount-item' : 'animate__animated animate__flipInX animate__faster balance-calculate-amount-item-danger' }` }>
                        <small style={{ fontSize:'12px' }}>{ (inFavorBalance >= 0) ? 'Saldo a favor' : 'Diferencia' }</small>
                        <p className="mb-1 ml-3">${ formatNumberWithThousandsSeparator(inFavorBalance) }</p>
                    </div>
                </div>
            </div>        
        </div>
    );
};