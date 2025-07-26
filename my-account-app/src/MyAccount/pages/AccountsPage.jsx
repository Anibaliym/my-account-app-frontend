import { useEffect, useState } from 'react';
import { getUserAccountsWithSheetsFetch } from '../../assets/api/MyAccountAppAPI/DomainServices';
import { AccountsForm } from '../components/account/AccountsForm';
import { SheetsForm } from '../components/account/SheetsForm';

export const AccountsPage = ({ setPageName, showUserMessage, setAccountListener, accountListener }) => {
    const userData = JSON.parse(localStorage.getItem('my-account-user'));
    const { id: userId } = userData;

    const [userAccountsWithSheets, setUserAccountsWithSheets] = useState([]);
    const [accountIdOnView, setAccountIdOnView] = useState('');

    useEffect(() => {
        setPageName('CUENTAS');
        GetUserAccountsWithSheets();
    }, [setPageName, accountListener]);

    const GetUserAccountsWithSheets = async () => {
        const { isError, data } = await getUserAccountsWithSheetsFetch(userId);

        if (!isError)
            setUserAccountsWithSheets(data.data.accounts);
    }

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

    return (
        <div className="accounts-wrapper">
             <AccountsForm
                 userAccountsWithSheetsData={userAccountsWithSheets}
                 showUserMessage={showUserMessage}
                 userId={userId}
                 setAccountListener={setAccountListener}
                 accountListener={accountListener}
                 setAccountIdOnView={setAccountIdOnView}
                 accountIdOnView={accountIdOnView}
             />

            <div className="container-sheets">
                {
                    (accountIdOnView.length > 0)
                        ? 
                        (
                            <SheetsForm
                                accountId={accountIdOnView}
                                showUserMessage={showUserMessage}
                                setAccountListener={setAccountListener}
                                accountListener={accountListener}
                                setAccountIdOnView={setAccountIdOnView}
                            />
                        )
                        :
                        (
                            <p className="animate__animated animate__fadeInLeft animate__faster text-color-default" style={{ fontSize: '12px' }}>Seleccione una cuenta</p>
                        )
                }
            </div>
        </div>
    );
}