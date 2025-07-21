import { useEffect, useState } from 'react';
import { getUserAccountsWithSheetsFetch } from '../../assets/api/MyAccountAppAPI/DomainServices';
import { AccountsForm } from '../components/account/AccountsForm';
import { SheetsForm } from '../components/account/SheetsForm';

export const AccountsPage = ({ setPageName, showUserMessage, setAccountListener, accountListener }) => {
    const userData = JSON.parse(localStorage.getItem('my-account-user'));
    const { id: userId } = userData;

    const [userAccountsWithSheets, setUserAccountsWithSheets] = useState([]);
    const [accountIdOnView, setAccountIdOnView] = useState('');

    // useEffect(() => {
    //     console.log(accountIdOnView)
    // }, [accountIdOnView])
    

    useEffect(() => {
        setPageName('CUENTAS');
        GetUserAccountsWithSheets();
    }, [setPageName, accountListener]);

    const GetUserAccountsWithSheets = async () => {
        const { isError, data } = await getUserAccountsWithSheetsFetch(userId);

        if (!isError)
            setUserAccountsWithSheets(data.data.accounts);
    }

    return (
        <div className="accounts-principal-container">
            <AccountsForm
                userAccountsWithSheetsData={userAccountsWithSheets}
                showUserMessage={showUserMessage}
                userId={userId}
                setAccountListener={setAccountListener}
                accountListener={accountListener}
                setAccountIdOnView={setAccountIdOnView}
                accountIdOnView={accountIdOnView}
            />

            <div className="accounts-sheets-form">
                {
                    (accountIdOnView.length > 0)
                        && (
                            <SheetsForm
                                accountId={accountIdOnView}
                                showUserMessage={showUserMessage}
                                setAccountListener={setAccountListener}
                                accountListener={accountListener}
                                setAccountIdOnView={setAccountIdOnView}
                            />
                    )
                }
            </div> 
        </div>
    );
}