import { useState } from 'react';
import { AccountListItem } from './AccountListItem';
import { useRef } from 'react';
import { useEffect } from 'react';
import { CreateAccountAPI } from '../../../assets/api/MyAccountAppAPI/account';
import { CustomButtom } from '../controls/CustomButtom';
import { CustomInputText } from '../controls/CustomInputText';

export const AccountsForm = ({ isDarkMode, userAccountsWithSheetsData, showUserMessage, userId, setAccountListener, accountListener, setAccountIdOnView }) => {
    const [ accountsArr, setAccountsArr ] = useState([]); 

    useEffect(() => {
        if (userAccountsWithSheetsData.length > 0) {
            setAccountsArr(
                userAccountsWithSheetsData.map(item => ({
                    ...item.account,  
                    sheetsCount: item.sheets.length 
                }))
            );
        }
    }, [ userAccountsWithSheetsData ]);

    const accountDescriptionRef = useRef(); 
    const [ newAccountDescription, setNewAccountDescription ] = useState(''); 

    useEffect(() => {
        accountDescriptionRef.current.focus();
    }, [])

    const onKeyDown = (event) => {
        if (event.key === 'Enter') {
            if(newAccountDescription.trim().length === 0){
                showUserMessage('debe ingresar un nombre de cuenta válido', 'warning');
                accountDescriptionRef.current.select();
            }

            createAccount();
        }
    };

    const createAccount = async () => {
        if(newAccountDescription.trim().length === 0){
            showUserMessage('debe ingresar un nombre de cuenta válido', 'warning');
            accountDescriptionRef.current.select();
            return; 
        }

        const { isError, resolution, message, data } = await CreateAccountAPI( userId, newAccountDescription.trim() );

        if(isError) {
            showUserMessage('ocurrió un error al intentar crear la cuenta', 'error');
            return; 
        }
        
        if(resolution) {
            showUserMessage('cuenta creada', 'success');
            setNewAccountDescription('');
            setAccountListener( accountListener => accountListener + 1 );
            setAccountsArr( accountsArr => [ ...accountsArr, { id: data.id, description: newAccountDescription.trim() } ] );
        }
        else {
            if(message.includes('No se pueden crear mas de 20'))
                showUserMessage(`No se puede crear la cuenta "${newAccountDescription}" porque cada usuario puede tener hasta un máximo de 20 cuentas`, 'info');
                accountDescriptionRef.current.select(); 
        }
    }

    return (
        <div className="accounts-balances-form">
            <CustomInputText
                isDarkMode = { isDarkMode }
                inputRef = { accountDescriptionRef }
                value = { newAccountDescription }
                onChangeEvent = { setNewAccountDescription }
                onKeyDownEvent = { onKeyDown }
                placeHolder={ 'nombre cuenta' }
            />

            <CustomButtom event={ () => createAccount() }/>

            <AccountListItem
                accountsArr = { accountsArr }
                setAccountsArr = { setAccountsArr }
                isDarkMode={ isDarkMode }
                showUserMessage={ showUserMessage }
                setAccountListener={ setAccountListener }
                accountListener={ accountListener }
                setAccountIdOnView={ setAccountIdOnView }
            />
        </div>
    )
}
