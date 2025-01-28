import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSheetsAccountAPI } from '../../assets/api/MyAccountAppAPI/DomainServices';
import { CardAccount } from '../components/account/CardAccount';
import { CardSheetAdd } from '../components/account/CardSheetAdd';
import { CardListSheet } from '../components/account/CardListSheet';

export const AccountPage = ({ setAccountListener, accountListener, isDarkMode, setPageName, showUserMessage, setModalMessage }) => {
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
        <div className="page-principal-container">
            <CardAccount
                accountId={ accountId }
                setPageName={ setPageName }
                setAccountListener={ setAccountListener }
                accountListener={ accountListener }
                showUserMessage={ showUserMessage } 
                setModalMessage={ setModalMessage }
            />

            <CardSheetAdd
                accountId={ accountId }
                setSheets={ setSheets }
                accountListener={ accountListener }
                setAccountListener={ setAccountListener }
                showUserMessage={ showUserMessage }            
                sheets={ sheets }
                isDarkMode={ isDarkMode }   
            />
       </div>
    )
}
