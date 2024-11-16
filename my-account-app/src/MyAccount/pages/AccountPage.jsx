import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSheetsAccountAPI } from '../../assets/api/MyAccountAppAPI/DomainServices';
import { UserMessage } from '../components/UserMessage';
import { AccountForm } from '../components/account/AccountForm';
import { SheetsForm } from '../components/account/SheetsForm';

export const AccountPage = ({ isDarkMode, setAccountListener, accountListener, setPageName }) => {
    const { accountId } = useParams(); 
    const [ sheets, setSheets ] = useState([]); 
    const [ message, setMessage ] = useState(''); 
    const [ showMessage, setShowMessage] = useState(false); 

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

    const showUserMessage = (message) => {
        setMessage(message);
        setShowMessage(true);            
    }
    
    return (
        <>
            <div className="row" style={ { height: "30px" } }>
                <UserMessage message={ message } show={ showMessage } setShowMessage={ setShowMessage }/>
            </div>

            <AccountForm 
                isDarkMode={ isDarkMode } 
                accountId={ accountId }
                showUserMessage={ showUserMessage } 
                setPageName={ setPageName }
            />

            <SheetsForm
                accountId={ accountId }
                isDarkMode={ isDarkMode } 
                setSheets={ setSheets }
                accountListener={ accountListener }
                setAccountListener={ setAccountListener }
                sheets={ sheets }
                setMessage={ setMessage }
                setShowMessage={ setShowMessage }
                showUserMessage={ showUserMessage }
            />
        </>
    )
}
