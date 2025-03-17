import { useEffect, useState } from 'react';
import { formatNumberWithThousandsSeparator } from '../../../assets/utilities/BalanceFormater';

export const FormCalculatedBalances = ({ calculatedBalances }) => {
    const { availableTotalBalance, inFavorBalance, toSpendBalance } = calculatedBalances;

    // Estados para activar la animación
    const [animateAvailable, setAnimateAvailable] = useState(false);
    const [animateToSpend, setAnimateToSpend] = useState(false);
    const [animateInFavor, setAnimateInFavor] = useState(false);

    // Detectar cambios en cada valor y activar la animación
    useEffect(() => {
        setAnimateAvailable(true);
        const timeout = setTimeout(() => setAnimateAvailable(false), 500);
        return () => clearTimeout(timeout);
    }, [availableTotalBalance]);

    useEffect(() => {
        setAnimateToSpend(true);
        const timeout = setTimeout(() => setAnimateToSpend(false), 500);
        return () => clearTimeout(timeout);
    }, [toSpendBalance]);

    useEffect(() => {
        setAnimateInFavor(true);
        const timeout = setTimeout(() => setAnimateInFavor(false), 500);
        return () => clearTimeout(timeout);
    }, [inFavorBalance]);

    return (
        <div className="balance-calculate-amount-form mt-3">
            <div className={ `balance-calculate-amount-item ${animateAvailable ? "animate__animated aniimate__faster animate__flipInX" : ""}` }>
                <small>Saldo Disponible:</small><br />
                <small className="display-6 ml-1" style={{ fontSize: '18px' }}>${formatNumberWithThousandsSeparator(availableTotalBalance)}</small>
            </div>
            <div className={ `balance-calculate-amount-item ${animateToSpend ? "animate__animated aniimate__faster animate__flipInX" : ""}` }>
                <small>Saldo Planificado:</small><br />
                <small className="display-6 ml-1" style={{ fontSize: '18px' }}>${formatNumberWithThousandsSeparator(toSpendBalance)}</small>
            </div>
            <div className={ `balance-calculate-amount-item ${inFavorBalance >= 0 ? "" : "balance-calculate-amount-item-danger"} ${animateInFavor ? "animate__animated aniimate__faster animate__flipInX" : ""}` }>
                <small>
                    { inFavorBalance >= 0 ? "SALDO EXCEDENTE:" : "SALDO INSUFICIENTE"}
                </small><br />
                <small className="display-6 ml-1" style={{ fontSize: '18px' }}>${formatNumberWithThousandsSeparator(inFavorBalance)}</small>
            </div>
        </div>
    );
};












