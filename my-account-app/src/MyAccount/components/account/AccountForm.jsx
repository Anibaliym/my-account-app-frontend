import { useEffect, useState } from 'react';
import { DeleteAccountAPI, UpdateAccountAPI, getActiveAccountByIdAPI } from '../../../assets/api/MyAccountAppAPI/account';
import { formatDate } from '../../../assets/utilities/DateFormater';
import { useRef } from 'react';
import { Tooltip } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

export const AccountForm = ({ isDarkMode, accountId, showUserMessage, setPageName, setAccountListener, accountListener }) => {
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

        if(newNameAccount === nameAccount){
            setShowSaveButtom(false); 
            return; 
        }

        if(newNameAccount.length === 0) {
            setShowSaveButtom(false); 
            return; 
        }

        if(newNameAccount.length > 0){
            setShowSaveButtom(true); 
            return; 
        }

    }, [ newNameAccount ])



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
        const { isError } = await UpdateAccountAPI(accountId, newNameAccount); 

        if(isError)
            showUserMessage('Ocurrió un error al intentar actualizar el nombre la cuenta.'); 
        else {
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
            showUserMessage(message); 
        else 
        {
            showUserMessage(message); 
            setAccountListener( accountListener - 1 )
            navigate('/');
        }
    }

    return (

        <div className="cardd">
            <div className="cardd-header">
                Cuenta
            </div>
            <div className="cardd-body" onClick={ () => ( accountNameRef.current.select() ) }>
                <input 
                    ref={ accountNameRef }
                    type="text" 
                    placeholder="nombre cuenta"
                    className={ `form-control-sm mb-3 no-focus ${ (isDarkMode) && 'bg-dark text-light' }` }
                    onChange={ onChangeDescriptionAccount }
                    onKeyDown={ onKeyDownDescriptionAccount }
                    value={ newNameAccount }
                    style={{ width:'100%' }}

                    maxLength="20"
                />

                <br />
            </div>
            <div className="cardd-footer">
                <p className="cardd-text"><small>{ creationDate }</small></p>

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
