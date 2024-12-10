import { useEffect, useState } from 'react';
import { DeleteAccountAPI, UpdateAccountAPI, getActiveAccountByIdAPI } from '../../../assets/api/MyAccountAppAPI/account';
import { formatDate } from '../../../assets/utilities/DateFormater';
import { useRef } from 'react';
import { Tooltip } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';


export const CardAccount = ({ accountId, setPageName, setAccountListener, accountListener, showUserMessage, setModalMessage }) => {
    const navigate = useNavigate(); 
    const accountNameRef = useRef(false); 
    const [ nameAccount, setNameAccount ] = useState(''); 
    const [ newNameAccount, setNewNameAccount ] = useState(''); 
    const [ creationDate, setCreationDate ] = useState('Fecha de creación')
    const [ showSaveButtom, setShowSaveButtom] = useState(false); 

    useEffect(() => {
        getAccountData(); 
    }, [ accountId ])

    useEffect(() => {
        const shouldShowSaveButton = newNameAccount.length > 0 && newNameAccount !== nameAccount;
    
        setShowSaveButtom(shouldShowSaveButton);
    }, [ newNameAccount, nameAccount ]);

    const getAccountData = () => {
        getActiveAccountById(); 
    }

    const getActiveAccountById = async () => {
        const { isError, description, creationDate } = await getActiveAccountByIdAPI(accountId); 
        setCreationDate( formatDate(creationDate)); 
        setNameAccount(description); 
        setNewNameAccount(description);
    }

    const updateDescriptionAccount = async  () => {
        if(newNameAccount.length === 0){
            showUserMessage('Debe ingresar un nombre de cuenta válido'); 
            return; 
        }

        const { isError } = await UpdateAccountAPI(accountId, newNameAccount); 

        if(isError)
            showUserMessage('Ocurrió un error al intentar actualizar el nombre la cuenta.'); 
        else {
            setShowSaveButtom(false); 
            setPageName(newNameAccount);
            setAccountListener( accountListener - 1 )
            showUserMessage('Cuenta actualizada correctamente'); 
            setNameAccount('');
        }
    }

    const onChangeDescriptionAccount = (e) => ( setNewNameAccount(e.target.value) ); 
    
    const onKeyDownDescriptionAccount = (e) => {
        if(e.which === 13) {
            if(newNameAccount.length > 0) 
                updateDescriptionAccount();
            else 
                showUserMessage('Debe ingresar un nombre de cuenta válido'); 
        }
    }

    const onDeleteAccount = () => {
        DeleteAccount(); 
    }

    const DeleteAccount = async () => {
        const { isError, message } = await DeleteAccountAPI(accountId);

        if(isError) 
            setModalMessage(message);
        else {
            showUserMessage(message); 
            setAccountListener( accountListener - 1 )
            navigate('/');
        }
    }

    return (
        <div className="card-account animate__animated animate__fadeIn animate__faster">
            <div className="card-account-header">
                cuenta
            </div>
            <div className="card-account-title">
                <input 
                    ref={ accountNameRef }
                    className="card-input-text display-6" 
                    placeholder="ingrese el nombre de la cuenta" 
                    type="text" 
                    onChange={ onChangeDescriptionAccount }
                    onKeyDown={ onKeyDownDescriptionAccount }
                    value={ newNameAccount }
                    maxLength={20}
                />
            </div>
            <div className="card-account-text mt-3">
                <p className="text-right">
                    <small>
                        { creationDate }
                    </small>
                </p>
            </div>
            <div className="card-account-footer">
                <Tooltip
                    placement="bottom"
                    content="Guardar"
                    color="secondary"
                    closeDelay={ 50 }
                >
                    <i className={ `bx bx-save icon animate__animated animate__faster ${ (showSaveButtom) ? 'animate__fadeIn' : 'animate__fadeOut' }` } onClick={ updateDescriptionAccount }></i>
                </Tooltip>
                <Tooltip
                    placement="bottom"
                    content="Eliminar cuenta"
                    color="secondary"
                    closeDelay={ 50 }
                >
                    <i className='bx bx-trash icon text-danger' onClick={ onDeleteAccount }></i>
                </Tooltip>
            </div>
        </div>        
    )
}
