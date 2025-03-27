import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSheetByIdFetch } from '../../assets/api/MyAccountAppAPI/Sheet';
import { FormSheetBalance } from '../components/sheet/FormSheetBalance';
import { getSheetCardsWithVignettesFetch } from '../../assets/api/MyAccountAppAPI/DomainServices';
import { FormCardsSheet } from '../components/sheet/FormCardsSheet';

export const SheetPage = ({ setPageName, showUserMessage, accountListener, setAccountListener }) => {
const {sheetId} = useParams();

const [sheetData, setSheetData] = useState(null);
    const [cardsSheetData, setCardsSheetData] = useState([]); 
    const [availableTotalBalance, setAvailableTotalBalance] = useState(0); 
    const [toSpendBalance, setToSpendBalance] = useState(0); 
    const [inFavorBalance, setInFavorBalance] = useState(0); 

    const getSheetData = async () => {
        // Obtiene los datos de la hoja de cálculo.
        try {
            const { isError, data } = await getSheetByIdFetch(sheetId);
            if (!isError && data) setSheetData(data);
        } catch (error) {
            showUserMessage("Error al obtener la hoja de cálculo:", error);
        }
    };
    
    const getSheetCardsWithVignettes = async () => {
        // Obtiene los datos las cartas y calcula los totales.
        try {
            const { isError, data } = await getSheetCardsWithVignettesFetch(sheetId);

            if (isError) {
                showUserMessage('Ocurrió un error al intentar cargar las cartas.', 'error');
                return;
            }
            setCardsSheetData(data || []);
        } catch (error) {
            showUserMessage("Error al obtener las cartas:", error);
        }
    };

    const calculateBalances = () => {
        // Recalcula los valores totales. Calcula los valores según la data obtenida.

        if (!sheetData) return;

        const availableBalance = (sheetData.cashBalance || 0) + (sheetData.currentAccountBalance || 0);
        const plannedBalance = cardsSheetData.reduce((acc, card) => acc + (card.totalCardAmount || 0), 0);
        const favorBalance = availableBalance - plannedBalance;

        setAvailableTotalBalance(availableBalance);
        setToSpendBalance(plannedBalance);
        setInFavorBalance(favorBalance);
    };

    const refreshData = async () => {
        await getSheetData(); 
        await getSheetCardsWithVignettes();
        calculateBalances(); 
    };

    useEffect(() => {
        refreshData();
        setPageName('HOJA DE CÁLCULO'); 
    }, [sheetId]);

    useEffect(() => {
        calculateBalances();
    }, [sheetData, cardsSheetData]);

    if (!sheetData) return (<div className="spinner-border" role="status"></div>);

    return (
        <div className="page-principal-container">
            <FormSheetBalance 
                sheetData={ sheetData }
                showUserMessage={ showUserMessage }
                setAccountListener={ setAccountListener }
                accountListener={ accountListener }
                calculatedBalances={ { availableTotalBalance, toSpendBalance, inFavorBalance }}
                refreshData={ refreshData} 
            />

            <FormCardsSheet
                cardsSheetData={ cardsSheetData }
                showUserMessage={ showUserMessage }
                getSheetCardsWithVignettes={ getSheetCardsWithVignettes }
                refreshData={ refreshData } 
            />
        </div>
    );
};