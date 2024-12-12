import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { GetSheetByIdAsync } from '../../assets/api/MyAccountAppAPI/Sheet';
import { formatNumber, formatNumberWithThousandsSeparator } from '../../assets/utilities/BalanceFormater';
import { getCardBySheetIdFetch } from '../../assets/api/MyAccountAppAPI/Card';
import { SheetCardsForm } from '../components/sheet/SheetCardsForm';
import { SheetBalanceForm } from '../components/sheet/SheetBalanceForm';
import { getSheetCardsWithVignettesFetch } from '../../assets/api/MyAccountAppAPI/DomainServices';

export const SheetPage = ({ showUserMessage }) => {
    const { sheetId } = useParams();

    const cashBalanceRef = useRef();
    const currentAccountBalanceRef = useRef();

    const [ sheetCards, setSheetCards ] = useState([]);
    const [ balances, setBalances ] = useState({ cashBalance: '', currentAccountBalance: '' });
    const [ oldBalances, setOldBalances ] = useState({ cashBalance: 0, currentAccountBalance: 0 });
    const [ totalAvailable, setTotalAvailable ] = useState(0);
    const [ showModalCreateCard, setShowModalCreateCard ] = useState(false);
    const [ sheetName, setSheetName ] = useState('hoja de cálculo');

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
    }, [ balances ]);

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
        const { isError, data } = await getSheetCardsWithVignettesFetch(sheetId); 
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

    return (
        <div className="sheet-form-container">
                <SheetBalanceForm
                    sheetName={ sheetName }
                    setSheetName={ setSheetName }
                    cashBalanceRef={ cashBalanceRef }
                    balances={ balances }
                    icons={ icons }
                    currentAccountBalanceRef={ currentAccountBalanceRef }
                    totalAvailable={ totalAvailable }
                    setBalances={ setBalances }
                    setIcons={ setIcons }
                    fetchSheet={ fetchSheet }
                />

                <SheetCardsForm
                    showModalCreateCard={ showModalCreateCard }
                    setShowModalCreateCard={ setShowModalCreateCard }
                    showUserMessage={ showUserMessage }
                    fetchCard={ fetchCard }
                    sheetCards={ sheetCards }
                />
        </div>
    );
};