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

    return (
        <div className="accounts-principal-container">
            acco
        </div>
    );
}