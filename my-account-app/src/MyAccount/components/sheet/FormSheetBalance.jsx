import { useEffect, useState, useRef } from 'react';
import { updateCashBalanceFetch, updateCurrentAccountBalanceFetch, updateSheetFetch } from '../../../assets/api/MyAccountAppAPI/Sheet';
import { formatNumber, formatNumberWithThousandsSeparator } from '../../../assets/utilities/BalanceFormater';
import { formatDate } from '../../../assets/utilities/DateFormater';
import { IconToolsbar } from './IconToolsbar';
import { FormCalculatedBalances } from './FormCalculatedBalances';

export const FormSheetBalance = ({ sheetData, cardsSheetData, showUserMessage, setAccountListener, accountListener, calculatedBalances, refreshData }) => {
    const { id: sheetId, creationDate, accountId, description, cashBalance, currentAccountBalance, order } = sheetData;

    const sheetDescriptionRef = useRef(null);
    const sheetCashBalanceRef = useRef(null);
    const sheetCurrentAccountBalanceRef = useRef(null);

    const [sheetDescription, setSheetDescription] = useState('');
    const [sheetDescriptionOld, setSheetDescriptionOld] = useState(description);
    const [sheetCashBalance, setSheetCashBalance] = useState('');
    const [sheetCurrentAccountBalance, setSheetCurrentAccountBalance] = useState('');
    const [sheetCashBalanceOld, setSheetCashBalanceOld] = useState('');
    const [sheetCurrentAccountBalanceOld, setSheetCurrentAccountBalanceOld] = useState('');
    const [iconCashBalance, setIconCashBalance] = useState(false);
    const [iconCurrentAccountBalance, setIconCurrentAccountBalance] = useState(false);
    const [animateCashBalance, setAnimateCashBalance] = useState(false);
    const [animateCurrentAccountBalance, setAnimateCurrentAccountBalance] = useState(false);
    const [animationClass, setAnimationClass] = useState('');

    // Detecta cambios en sheetId y activa la animación
    useEffect(() => {
        setAnimationClass("animate__fadeIn");

        // Elimina la clase después de 500ms (duración de la animación)
        const timeout = setTimeout(() => setAnimationClass(""), 500);

        return () => clearTimeout(timeout);
    }, [sheetId]); // Se ejecuta cuando sheetId cambia

    useEffect(() => {
        // Se ejecuta solo cuando cambia iconCashBalance
        setAnimateCashBalance(true);
        const timeout = setTimeout(() => setAnimateCashBalance(false), 500);
        return () => clearTimeout(timeout);
    }, [iconCashBalance]);

    useEffect(() => {
        // Se ejecuta solo cuando cambia iconCashBalance
        setAnimateCurrentAccountBalance(true); // Activa la animación
        const timeout = setTimeout(() => setAnimateCurrentAccountBalance(false), 500);
        return () => clearTimeout(timeout);
    }, [iconCurrentAccountBalance]);

    useEffect(() => {
        const newCashBalance = Number(formatNumber(sheetCashBalance));
        const oldCashBalance = Number(formatNumber(sheetCashBalanceOld));
        setIconCashBalance(newCashBalance === oldCashBalance);
    }, [sheetCashBalance])

    useEffect(() => {
        const newCurrentAccountBalance = Number(formatNumber(sheetCurrentAccountBalance));
        const oldCurrentAccountBalance = Number(formatNumber(sheetCurrentAccountBalanceOld));
        setIconCurrentAccountBalance(newCurrentAccountBalance === oldCurrentAccountBalance);
    }, [sheetCurrentAccountBalance])

    useEffect(() => {
        setSheetDescription(description);
        setSheetCashBalance(`$${formatNumberWithThousandsSeparator(cashBalance)}`);
        setSheetCashBalanceOld(`$${formatNumberWithThousandsSeparator(cashBalance)}`);
        setSheetCurrentAccountBalance(`$${formatNumberWithThousandsSeparator(currentAccountBalance)}`);
        setSheetCurrentAccountBalanceOld(`$${formatNumberWithThousandsSeparator(currentAccountBalance)}`);
    }, [sheetId]);

    const handleBlur = async (controlName) => {
        switch (controlName) {
            case 'sheetDescription':
                if (sheetDescription.length === 0)
                    setSheetDescription(description);
                else {
                    if (sheetDescriptionOld !== sheetDescription)
                        updateSheetDescription();
                }

                break;
            case 'cashBalance':
                const { isError: errorCashBalance } = await updateCashBalanceFetch(sheetId, formatNumber(sheetCashBalance));

                if (errorCashBalance)
                    showUserMessage('Ocurrió un error al intentar actualizar el saldo en efectivo.', 'error');
                else {
                    setSheetCashBalanceOld(sheetCashBalance);
                    setIconCashBalance(true);
                    refreshData();
                }

                break;
            case 'currentAccountBalance':
                const { isError: errorCurrentAccountBalance } = await updateCurrentAccountBalanceFetch(sheetId, formatNumber(sheetCurrentAccountBalance));

                if (errorCurrentAccountBalance)
                    showUserMessage('Ocurrió un error al intentar actualizar el saldo de cuenta bancaria.', 'error');
                else {
                    setSheetCashBalanceOld(sheetCurrentAccountBalance);
                    setIconCurrentAccountBalance(true);
                    refreshData();
                }

                break;
        }
    }

    const handleChange = (e, field) => {
        const value = e.target.value;

        switch (field) {
            case 'sheetDescription':
                setSheetDescription(value);
                break;
            case 'cashBalance':
                setSheetCashBalance(`$${formatNumberWithThousandsSeparator(value.replace(/\D/g, ''))}`);
                break;
            case 'currentAccountBalance':
                setSheetCurrentAccountBalance(`$${formatNumberWithThousandsSeparator(value.replace(/\D/g, ''))}`);
                break;
        }
    };

    const handleKeyDown = async (e, field, value) => {
        if (e.key === 'Enter') {
            switch (field) {
                case 'sheetDescription':
                    if (sheetDescriptionOld !== sheetDescription)
                        updateSheetDescription();
                    break;
                case 'cashBalance':
                    const { isError: errorCashBalance } = await updateCashBalanceFetch(sheetId, formatNumber((value === '$' ? '$0' : value)));

                    if (errorCashBalance)
                        showUserMessage('Ocurrió un error al intentar actualizar el saldo en efectivo.', 'error');
                    else {
                        setSheetCashBalanceOld(value);
                        setIconCashBalance(true);
                    }

                    break;
                case 'currentAccountBalance':
                    const { isError: errorCurrentAccountBalance } = await updateCurrentAccountBalanceFetch(sheetId, formatNumber(sheetCurrentAccountBalance));

                    if (errorCurrentAccountBalance)
                        showUserMessage('Ocurrió un error al intentar actualizar el saldo de cuenta bancaria.', 'error');
                    else {
                        setSheetCurrentAccountBalanceOld(sheetCurrentAccountBalance);
                        setIconCurrentAccountBalance(true);
                    }

                    break;
            }

            e.target.blur();
        }
    };

    const updateSheetDescription = async () => {
        const { isError } = await updateSheetFetch(accountId, sheetId, sheetDescription, cashBalance, currentAccountBalance, order);

        if (isError) {
            showUserMessage('Ocurrió un error al intentar actualizar el nombre de la hoja de cálculo', 'error');
            return;
        }

        setSheetDescriptionOld(sheetDescription);
        showUserMessage(`Se ha actualizado el nombre de la hoja de cálculo "${sheetDescriptionOld}" a "${sheetDescription}".`, 'success');
        setAccountListener(accountListener + 1);
    }

    return (
        <div className="sheet-balances-form">
            <input
                ref={sheetDescriptionRef}
                type="text"
                value={sheetDescription}
                maxLength={11}
                className={`balance-input-text display-6 animate__animated ${animationClass}`}
                onClick={() => sheetDescriptionRef.current.select()}
                onBlur={() => handleBlur('sheetDescription')}
                onKeyDown={(e) => handleKeyDown(e, 'sheetDescription', null)}
                onChange={(e) => handleChange(e, 'sheetDescription')}
            />

            <small style={{ fontSize: '12px' }}>{formatDate(creationDate)}</small>

            <IconToolsbar
                refreshData={refreshData}
                cardsSheetData={cardsSheetData}
                sheetDescription={sheetDescription}
                setAccountListener={setAccountListener}
                accountListener={accountListener}
                showUserMessage={showUserMessage}
            />

            <hr />

            <small>Saldo Efectivo</small>
            <input
                ref={sheetCashBalanceRef}
                name="cashBalance"
                type="text"
                className={`no-focus balance-input-text display-6 animate__animated ${animationClass}`}
                style={{ borderBottom: '1px solid white' }}
                maxLength={11}
                value={sheetCashBalance}
                onChange={(e) => handleChange(e, 'cashBalance')}
                onClick={() => sheetCashBalanceRef.current.select()}
                onKeyDown={(e) => handleKeyDown(e, 'cashBalance', sheetCashBalance)}
                onBlur={() => (handleBlur('cashBalance'))}
                autoComplete="off"
            />

            <div className="icon-save">
                <li
                    style={{ marginTop: '-35px' }}
                    className={`text-white animate__animated ${animateCashBalance ? 'animate__fadeInUp' : ''} bx ${iconCashBalance ? 'bx-check-circle' : 'bx-save'} icon animate__faster`}>
                </li>
            </div>

            <br />
            <small>Saldo Cuenta Bancaria</small>
            <input
                ref={sheetCurrentAccountBalanceRef}
                name="currentAccountBalance"
                type="text"
                className={`no-focus balance-input-text display-6 animate__animated ${animationClass}`}
                style={{ borderBottom: '1px solid white' }}
                maxLength={11}
                value={sheetCurrentAccountBalance}
                onChange={(e) => handleChange(e, 'currentAccountBalance')}
                onClick={() => sheetCurrentAccountBalanceRef.current.select()}
                onKeyDown={(e) => handleKeyDown(e, 'currentAccountBalance', sheetCurrentAccountBalance)}
                onBlur={() => (handleBlur('currentAccountBalance'))}
                autoComplete="off"
            />

            <div className="icon-save">
                <li
                    style={{ marginTop: '-35px' }}
                    className={`text-white animate__animated ${animateCurrentAccountBalance ? 'animate__fadeInUp' : ''} bx ${iconCurrentAccountBalance ? 'bx-check-circle' : 'bx-save'} icon animate__faster`}>
                </li>
            </div>

            <FormCalculatedBalances calculatedBalances={calculatedBalances} />
        </div>
    );
};