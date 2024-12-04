import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { GetSheetByIdAsync, UpdateCashBalanceAPI, UpdateCurrentAccountBalanceAPI } from '../../assets/api/MyAccountAppAPI/Sheet';
import { formatNumber, formatNumberWithThousandsSeparator } from '../../assets/utilities/BalanceFormater';
import { Tooltip } from '@nextui-org/react';
import { getCardBySheetIdFetch } from '../../assets/api/MyAccountAppAPI/Card';
import { SheetCardsForm } from '../components/sheet/SheetCardsForm';

import '/src/assets/css/sheet.css';

export const SheetPage = ({ showUserMessage }) => {
    const { sheetId } = useParams();

    const cashBalanceRef = useRef();
    const currentAccountBalanceRef = useRef();

    const [sheetCards, setSheetCards] = useState([]);
    const [balances, setBalances] = useState({ cashBalance: '', currentAccountBalance: '' });
    const [oldBalances, setOldBalances] = useState({ cashBalance: 0, currentAccountBalance: 0 });
    const [totalAvailable, setTotalAvailable] = useState(0);
    const [createCardModal, setCreateCardModal] = useState(false);
    const [sheetName, setSheetName] = useState('hoja de cálculo');

    const [icons, setIcons] = useState({
        save: { cashBalance: false, currentAccountBalance: false },
        ok: { cashBalance: false, currentAccountBalance: false },
    });

    useEffect(() => {
        fetchSheet();
        fetchCard();
    }, [sheetId]);

    useEffect(() => {
        setIcons((prev) => ({
            ...prev,
            save: {
                ...prev.save,
                cashBalance: Number(formatNumber(balances.cashBalance)) !== oldBalances.cashBalance,
            },
        }));
    }, [balances.cashBalance]);

    useEffect(() => {
        setIcons((prev) => ({
            ...prev,
            save: {
                ...prev.save,
                currentAccountBalance: Number(formatNumber(balances.currentAccountBalance)) !== oldBalances.currentAccountBalance,
            },
        }));
    }, [balances.currentAccountBalance]);

    useEffect(() => {
        const total = Number(formatNumber(balances.cashBalance)) + Number(formatNumber(balances.currentAccountBalance));
        setTotalAvailable(formatNumberWithThousandsSeparator(total));
    }, [balances]);

    useEffect(() => {
        const timeoutIds = [];

        if (icons.ok.cashBalance) {
            timeoutIds.push(
                setTimeout(() => {
                    setIcons((prev) => ({
                        ...prev,
                        ok: { ...prev.ok, cashBalance: false },
                    }));
                }, 1500)
            );
        }

        if (icons.ok.currentAccountBalance) {
            timeoutIds.push(
                setTimeout(() => {
                    setIcons((prev) => ({
                        ...prev,
                        ok: { ...prev.ok, currentAccountBalance: false },
                    }));
                }, 1500)
            );
        }

        return () => timeoutIds.forEach((id) => clearTimeout(id));
    }, [icons.ok]);

    const fetchCard = async () => {
        const { isError, data } = await getCardBySheetIdFetch(sheetId);
        if (!isError) setSheetCards(data);
    };

    const fetchSheet = async () => {
        try {
            const { isError, data } = await GetSheetByIdAsync(sheetId);
            const { description, cashBalance, currentAccountBalance } = await data;

            if (isError) {
                showUserMessage('Ocurrió un error al intentar cargar la hoja de cálculo.');
                return;
            }

            setSheetName(description);
            setBalances({
                cashBalance: `$${formatNumberWithThousandsSeparator(cashBalance)}`,
                currentAccountBalance: `$${formatNumberWithThousandsSeparator(currentAccountBalance)}`,
            });

            setOldBalances({
                cashBalance,
                currentAccountBalance,
            });
        } catch (error) {
            showUserMessage('Error fetching sheet:', error);
        }
    };

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
        <div className="sheet-form-container">
            <div className="sheet-balances-form">
                <h1 className="display-6">{sheetName}</h1>
                <div className="row">
                    <div className="col icon-save">
                        <Tooltip placement="bottom" content="Crear respaldo" color="secondary" closeDelay={ 50 }>
                                <i className="bx bx-duplicate icon" ></i>
                        </Tooltip>
                        <Tooltip placement="bottom" content="Eliminar hoja de cálculo" color="secondary" closeDelay={ 50 }>
                            <i className="bx bx-trash icon" ></i>
                        </Tooltip>
                        <Tooltip placement="bottom" content="Exportar a excel" color="secondary" closeDelay={ 50 }>
                            <i className='bx bx-export icon'></i>
                        </Tooltip>
                        <Tooltip placement="bottom" content="Calendario" color="secondary" closeDelay={ 50 }>
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
                        {icons.save.currentAccountBalance && <i className="bx bx-save icon animate__animated animate__fadeInUp animate__faster"></i>}
                        {icons.ok.currentAccountBalance && <i className="bx bx-check-circle icon animate__animated animate__fadeInUp animate__faster"></i>}
                    </div>
                    <hr />
                    <small>Total Disponible: ${totalAvailable}</small><br />
                    <small>Total Restante: $1,000</small>
                </div>
            </div>
            <div className="sheet-cards-form">
                <SheetCardsForm
                    createCardModal={createCardModal}
                    setCreateCardModal={setCreateCardModal}
                    showUserMessage={showUserMessage}
                    fetchCard={fetchCard}
                    sheetCards={sheetCards}
                />
            </div>
        </div>
    );
};