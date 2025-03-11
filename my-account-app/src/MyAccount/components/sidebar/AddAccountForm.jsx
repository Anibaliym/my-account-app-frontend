import { Tooltip } from '@nextui-org/react';
import { CustomInputText } from '../controls/CustomInputText';
import { useState } from 'react';
import { CreateAccountAPI } from '../../../assets/api/MyAccountAppAPI/account';

export const AddAccountForm = ({ userId, isDarkMode, reloadAccount }) => {
    const [ newAccount, setNewAccount] = useState(false); 
    const [ newAccountName, setNewAccountName ] = useState(''); 

    const onKeyDownAccountName = (e) => {
        if(e.which === 13){
            
            if(newAccountName.length > 0){
                createAccount();
            }

            setNewAccount(false);
            setNewAccountName('');
        }
    }

    const createAccount = async () => {
        const { isError } = await CreateAccountAPI(userId, newAccountName); 
        
        if(!isError)
            reloadAccount();
    }

    return (
        <>
            <Tooltip
                placement="right"
                content="Crea una cuenta"
                color="foreground"
                closeDelay={ 50 }
            >
                <button className="dropdown-btn d-flex justify-content-center align-items-center mt-1" onClick={() => ( setNewAccount(!newAccount) )}>
                    <i className='bx bx-plus' style={{ fontSize: '20px' }} ></i>
                </button>
            </Tooltip>
            {
                (newAccount) && (
                    <div className="mt-2 animate__animated  animate__fadeInDown animate__faster">
                        <CustomInputText
                            isDarkMode = { isDarkMode }
                            value = { newAccountName }
                            onChangeEvent = { (e) => setNewAccountName(e) }
                            onKeyDownEvent = { onKeyDownAccountName }
                            placeHolder={ 'agregar cuenta' }
                        />
                    </div>
                )
            }        
        </>        
    )
}
