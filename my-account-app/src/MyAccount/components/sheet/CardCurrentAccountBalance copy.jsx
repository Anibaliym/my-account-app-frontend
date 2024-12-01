import { formatNumber } from '../../../assets/utilities/BalanceFormater';
import { UpdateBalanceAPI } from '../../../assets/api/MyAccountAppAPI/Sheet';
import { useEffect } from 'react';
import { useState } from 'react';

export const CardCurrentAccountBalance = ({ sheetId, currentAccountBalance, showUserMessage }) => {

    const [ newCurrentAccountBalance, setNewCurrentAccountBalance ] = useState( 0 ); 
    
    useEffect(() => {
        // console.log({ sheetId, currentAccountBalance, showUserMessage }); 
        setNewCurrentAccountBalance((currentAccountBalance.length === 0) ? '$ 0' : `$ ${ currentAccountBalance }`); 
    }, [ sheetId ])
    

    const onChange = (e) => {
        const inputValue = e.target.value;
        const formattedValue = `$ ${ formatNumber(inputValue) }`;
        // console.log(typeof formattedValue); 
        setNewCurrentAccountBalance(formattedValue); 
    };
    
    const onKeyDown = (e) => {
        if(e.which === 13) {
            

            console.log(currentAccountBalance)
            if( currentAccountBalance.length === 0 ){
                showUserMessage('Debe ingresar un saldo válido'); 
                setNewCurrentAccountBalance(`$ ${ formatNumber(inputValue) }`); 
                return; 
            }

            const formattedValue = currentAccountBalance;
            const numericValue = parseInt(formattedValue.replace(/\./g, ""), 10);
            UpdateCurrentAccountBalance(numericValue); 
         }
    }

    const UpdateCurrentAccountBalance = async (numericValue) => {
        const algo =  await UpdateBalanceAPI(sheetData, numericValue);
    }

    return (
        <div className="card-balance animate__animated animate__fadeIn animate__faster mt-3">
            <div className="card-test-header">
                Cuenta Corriente
            </div>
            <div className="card-test-text">
                <center>
                    <h1 className="display-6" style={{ fontSize: "25px" }}>
                        <input
                            className="card-input-text display-6 text-center"
                            placeholder="Saldo en cuenta corriente"
                            type="text"
                            maxLength={ 10 } 
                            inputMode="numeric"
                            value={ newCurrentAccountBalance }
                            onChange={ onChange }
                            onKeyDown={ onKeyDown }
                        />
                    </h1>
                </center>
            </div>
            <div className="card-test-footer p-1">
                <i className='bx bx-save icon' ></i>
                <i className='bx bx-check-circle icon' ></i>
            </div>

        </div>
    );
};