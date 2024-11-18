import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSheetsAccountAPI } from '../../assets/api/MyAccountAppAPI/DomainServices';
import { AccountForm } from '../components/account/AccountForm';
import { SheetsForm } from '../components/account/SheetsForm';

export const AccountPage = ({ isDarkMode, setAccountListener, accountListener, setPageName, setMessage, setShowMessage, showUserMessage }) => {
    const { accountId } = useParams(); 
    const [ sheets, setSheets ] = useState([]); 

    useEffect(() => {
        getSheetsAccount();
    }, [ accountId ])

    const getSheetsAccount  = async () => {
        const { isError, data } = await getSheetsAccountAPI( accountId ); 

        if(!isError){
            const { account, sheets: sheetsData } = data; 
            setPageName(account.name); 
            setSheets(sheetsData); 
        }
    }

    return (
        <>
            <SheetsForm
                accountId={ accountId }
                isDarkMode={ isDarkMode } 
                setSheets={ setSheets }
                accountListener={ accountListener }
                setAccountListener={ setAccountListener }
                sheets={ sheets }
                showUserMessage={ showUserMessage }
            />
            
            <AccountForm 
                isDarkMode={ isDarkMode } 
                accountId={ accountId }
                setPageName={ setPageName }
                setAccountListener={ setAccountListener }
                accountListener={ accountListener }
                showUserMessage={ showUserMessage } 
            />
        </>
    )
}
