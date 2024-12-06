import { Tooltip } from '@nextui-org/react'; 
import { useParams } from 'react-router-dom';
import { formatNumber, formatNumberWithThousandsSeparator } from '../../../assets/utilities/BalanceFormater';
import { UpdateCashBalanceAPI, UpdateCurrentAccountBalanceAPI } from '../../../assets/api/MyAccountAppAPI/Sheet';

export const SheetBalanceForm = ({ sheetName, setSheetName, cashBalanceRef, balances, icons, currentAccountBalanceRef, totalAvailable, setBalances, setIcons, fetchSheet}) => {
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

            <h1 className="display-6">{sheetName}</h1>

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
                <div className="icon-save mt-1">
                    {icons.save.cashBalance && <i className="bx bx-save icon animate__animated animate__fadeInUp animate__faster"></i>}
                    {icons.ok.cashBalance && <i className="bx bx-check-circle icon animate__animated animate__fadeInUp animate__faster"></i>}
                </div>
                <hr />
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

                <hr />
                <small>Total Disponible: ${totalAvailable}</small><br />
                <small>Total Restante: $1,000</small>
            </div>        
        </div>
    )
}
