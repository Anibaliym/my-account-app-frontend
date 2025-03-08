import { useEffect, useState } from 'react';
import { GetUserAccountsWithSheetsFetch } from '../../assets/api/MyAccountAppAPI/DomainServices';
import { AccountsForm } from '../components/account/AccountsForm';
import { SheetsForm } from '../components/account/SheetsForm';

export const AccountsPage = ({ setPageName, isDarkMode, showUserMessage, setAccountListener, accountListener }) => {
    const userData = JSON.parse( localStorage.getItem('user') );
    const { id: userId } = userData; 

    const [ userAccountsWithSheets, setUserAccountsWithSheets ] = useState([]); 
    const [ accountIdOnView, setAccountIdOnView ] = useState(''); 

    useEffect(() => {
        setPageName('CUENTAS');
        GetUserAccountsWithSheets(); 
    }, [ setPageName, accountListener ]); 
    
    const GetUserAccountsWithSheets = async () => {
        const { isError, data } = await GetUserAccountsWithSheetsFetch(userId);

        if(!isError)
            setUserAccountsWithSheets(data.data.accounts);
    }

    return (
        <div className="accounts-principal-container">
            <AccountsForm
                isDarkMode={ isDarkMode } 
                userAccountsWithSheetsData = { userAccountsWithSheets }
                showUserMessage={ showUserMessage }
                userId={ userId }
                setAccountListener={ setAccountListener }
                accountListener={ accountListener }
                setAccountIdOnView={ setAccountIdOnView }
            />
            {
                (accountIdOnView.length > 0) 
                && (
                    <SheetsForm 
                        accountId = { accountIdOnView }
                        isDarkMode={ isDarkMode }
                        showUserMessage={ showUserMessage }
                        setAccountListener = { setAccountListener }
                        accountListener = { accountListener }
                        setAccountIdOnView = { setAccountIdOnView }
                    />
                )
            }
        </div> 
    );
}