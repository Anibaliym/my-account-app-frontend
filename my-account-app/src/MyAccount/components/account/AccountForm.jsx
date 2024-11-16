import { useEffect } from "react";
import { UpdateAccountAPI, getActiveAccountByIdAPI } from "../../../assets/api/MyAccountAppAPI/account";
import { useState } from "react";
import { formatDate } from "../../../assets/utilities/DateFormater";
import { useRef } from "react";

export const AccountForm = ({ isDarkMode, accountId, showUserMessage, setPageName }) => {
    const accountNameRef = useRef(false); 
    const [ nameAccount, setnameAccount ] = useState(''); 
    const [ creationDate, setcreationDate ] = useState('Fecha de creación')

    useEffect(() => {
        getAccountData(); 
    }, [])

    const getAccountData = () => {
        getActiveAccountById(); 
    }

    const getActiveAccountById = async () => {
        const { isError, description, creationDate } = await getActiveAccountByIdAPI(accountId); 
        setcreationDate( formatDate(creationDate)); 

    }

    const updateDescriptionAccount = async  () => {
        const { isError } = await UpdateAccountAPI(accountId, nameAccount); 

        if(isError)
            showUserMessage('Ocurrió un error al intentar actualizar el nombre la cuenta.'); 
        else {
            setPageName(nameAccount);
            showUserMessage('Cuenta actualizada correctamente'); 
            setnameAccount('');
        }
    }

    const onChangeDescriptionAccount = (e) => ( setnameAccount(e.target.value) ); 
    
    const onKeyDownDescriptionAccount = (e) => {
        if(e.which === 13) {
            if(nameAccount.length > 0) 
                updateDescriptionAccount();
            else 
                showUserMessage('Debe ingresar un nombre de cuenta válido'); 
        }
    }

    return (

        <div className="card">
            <div className="card-header">
                Cuenta
            </div>
            <div className="card-body" onClick={ () => ( accountNameRef.current.select() ) }>
                <input 
                    ref={ accountNameRef }
                    type="text" 
                    placeholder="nombre cuenta"
                    className={ `form-control-sm mb-3 no-focus ${ (isDarkMode) && 'bg-dark text-light' }` }
                    onChange={ onChangeDescriptionAccount }
                    onKeyDown={ onKeyDownDescriptionAccount }
                    value={ nameAccount }
                    maxLength="20"
                />

                <br />
                <p className="card-text"><small className="text-body-secondary">{ creationDate }</small></p>
            </div>
            <div className="card-footer">
                <i className='bx bx-save icon' onClick={ ()=>{ console.log('click') } } ></i>
                <i className='bx bx-trash icon' onClick={ ()=>{ console.log('click') } } ></i>
            </div>
        </div>
    )
}
