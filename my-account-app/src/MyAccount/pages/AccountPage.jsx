import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSheetsAccountAPI } from '../../assets/api/MyAccountAppAPI/DomainServices';
import { CardAccount } from '../components/account/CardAccount';
import { CardSheetAdd } from '../components/account/CardSheetAdd';
import { CardListSheet } from '../components/account/CardListSheet';

export const AccountPage = ({ setAccountListener, accountListener, isDarkMode, setPageName, showUserMessage, setShow, setModalMessage }) => {
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
            <CardAccount
                accountId={ accountId }
                setPageName={ setPageName }
                setAccountListener={ setAccountListener }
                accountListener={ accountListener }
                showUserMessage={ showUserMessage } 
                setShow={ setShow }
                setModalMessage={ setModalMessage }
            />

            <CardSheetAdd
                accountId={ accountId }
                setSheets={ setSheets }
                accountListener={ accountListener }
                setAccountListener={ setAccountListener }
                showUserMessage={ showUserMessage }            
            />

            <CardListSheet
                sheets={ sheets }
                setSheets={ setSheets }
                accountId={ accountId }
                isDarkMode={ isDarkMode }   
                showUserMessage={ showUserMessage }        
                setAccountListener={ setAccountListener }
                accountListener={ accountListener }
            />
        </>
    )
}
