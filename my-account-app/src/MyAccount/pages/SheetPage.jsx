import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { GetSheetByIdAsync } from '../../assets/api/MyAccountAppAPI/Sheet';
import { formatNumber, formatNumberWithThousandsSeparator } from '../../assets/utilities/BalanceFormater';
import { SheetCardsForm } from '../components/sheet/SheetCardsForm';
import { SheetBalanceForm } from '../components/sheet/SheetBalanceForm';
import { getSheetCardsWithVignettesFetch } from '../../assets/api/MyAccountAppAPI/DomainServices';

export const SheetPage = ({ showUserMessage, isDarkMode, accountListener, setAccountListener }) => {
    const { sheetId } = useParams();

    const cashBalanceRef = useRef();
    const currentAccountBalanceRef = useRef();

    const [ sheetCards, setSheetCards ] = useState([]);
    const [ balances, setBalances ] = useState({ cashBalance: '', currentAccountBalance: '' });
    const [ oldBalances, setOldBalances ] = useState({ cashBalance: 0, currentAccountBalance: 0 });
    const [ availableTotalBalance, setAvailableTotalBalance ] = useState(0);
    const [ toSpendBalance, settoSpendBalance ] = useState(0); 
    const [ inFavorBalance, setinFavorBalance ] = useState(0); 
    const [ totalCardsBalances, setTotalCardsBalances ] = useState(0);
    const [ showModalCreateCard, setShowModalCreateCard ] = useState(false);
    const [ sheetName, setSheetName ] = useState('hoja de cálculo');

    const [ icons, setIcons ] = useState({
        save: { cashBalance: false, currentAccountBalance: false },
        ok: { cashBalance: false, currentAccountBalance: false },
    });

    useEffect(() => {
        fetchSheet();
        fetchCard();
    }, [ sheetId ]);

    useEffect(() => {
        setIcons((prev) => ({
            ...prev,
            save: {
                ...prev.save,
                cashBalance: Number(formatNumber(balances.cashBalance)) !== oldBalances.cashBalance,
            },
        }));

        setIcons((prev) => ({
            ...prev,
            save: {
                ...prev.save,
                currentAccountBalance: Number(formatNumber(balances.currentAccountBalance)) !== oldBalances.currentAccountBalance,
            },
        }));

        const total = Number(formatNumber(balances.cashBalance)) + Number(formatNumber(balances.currentAccountBalance));
        setAvailableTotalBalance(total);
    
        // "Gastos Planificados"
        settoSpendBalance(totalCardsBalances);
    
        // "Saldo Disponible" (puede ser negativo)
        const availableBalance = total - totalCardsBalances;
        setinFavorBalance(availableBalance);
    }, [balances, totalCardsBalances]);

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
        let calcTotalCardsAmount = 0; 
        const { isError, data } = await getSheetCardsWithVignettesFetch(sheetId); 

        data.map(({ id, totalCardAmount }) => {
            calcTotalCardsAmount += totalCardAmount;
        });

        setTotalCardsBalances(calcTotalCardsAmount);
        if (!isError) setSheetCards(data);
    };

    const fetchSheet = async () => {
        try {
            const { isError, data } = await GetSheetByIdAsync(sheetId);
            const { description, cashBalance, currentAccountBalance } = await data;

            if (isError) {
                showUserMessage('Ocurrió un error al intentar cargar la hoja de cálculo.', 'error');
                return;
            }

            setSheetName(description);
            setBalances({
                cashBalance: `$${formatNumberWithThousandsSeparator(cashBalance)}`,
                currentAccountBalance: `$${formatNumberWithThousandsSeparator(currentAccountBalance)}`,
            });

            setOldBalances({ cashBalance, currentAccountBalance });
        } catch (error) {
            showUserMessage('Ocurrió un error al intentar cargar la hoja de cálculo:', error, 'error');
        }
    };

    const getCalculatedCardTotals = async () => {
        let calcTotalCardsAmount = 0; 
        const { isError, data } = await getSheetCardsWithVignettesFetch(sheetId); 

        if(!isError) {
            data.map(({ id, totalCardAmount }) => {
                calcTotalCardsAmount += totalCardAmount;
            });
    
            setTotalCardsBalances(calcTotalCardsAmount);
        }
        else 
            showUserMessage('Ocurrió un error al intentar cargar las cartas de la hoja de cálculo.', 'error');
    }

    return (
        <div className="page-principal-container">
            <SheetBalanceForm
                sheetName={sheetName}
                cashBalanceRef={cashBalanceRef}
                balances={balances}
                icons={icons}
                currentAccountBalanceRef={currentAccountBalanceRef}
                availableTotalBalance={availableTotalBalance}
                toSpendBalance={toSpendBalance}
                inFavorBalance={inFavorBalance}
                setBalances={setBalances}
                setIcons={setIcons}
                fetchSheet={fetchSheet}
                showModalCreateCard={showModalCreateCard}
                setShowModalCreateCard={setShowModalCreateCard}
                fetchCard={fetchCard}
                showUserMessage={showUserMessage}
                accountListener={ accountListener }
                setAccountListener={ setAccountListener }
            />

            <SheetCardsForm
                showUserMessage={showUserMessage}
                fetchCard={fetchCard}
                sheetCards={sheetCards}
                getCalculatedCardTotals={ getCalculatedCardTotals }
                isDarkMode={ isDarkMode }
            />
        </div>
    );
};