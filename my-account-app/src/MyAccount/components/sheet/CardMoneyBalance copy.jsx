import React, { useState } from 'react';
import { formatNumber } from '../../../assets/utilities/BalanceFormater';
import { UpdateBalanceAPI } from '../../../assets/api/MyAccountAppAPI/Sheet';

export const CardMoneyBalance = ({ sheetData, description, balance, balanceType, showUserMessage }) => {
    
    const [ value, setValue ] = useState(formatNumber(balance));

    const onChange = (e) => {
        const inputValue = e.target.value;
        const formattedValue = formatNumber(inputValue);
        setValue(formattedValue); // Actualizar el estado con el valor formateado
    };
    
    const onKeyDown = (e) => {
        if(e.which === 13) {
            
            if( value.length === 0 ){
                showUserMessage('Debe ingresar un saldo válido'); 
                setValue(0); 
                return; 
            }

            const formattedValue = value;
            const numericValue = parseInt(formattedValue.replace(/\./g, ""), 10);

            switch ( balanceType ) {
                case 'CurrentAccountBalance':
                    UpdateCashBalance(numericValue); 
                    break;
                case 'CashBalance':
                    break;
            }
        }
    }

    const UpdateCashBalance = async (newBalance) => {
        const algo = await UpdateBalanceAPI( sheetData, newBalance ); 
    }

    const UpdateCurrentAccountBalance = async () => {
        
    }


    return (
        <div className="card-balance animate__animated animate__fadeIn animate__faster">
            <div className="card-test-header">{description}</div>
                <center>
                    <h1 className="display-6" style={{ fontSize: "25px" }}>
                        <input
                            className="card-input-text display-6 text-center"
                            placeholder="Saldo en cuenta corriente"
                            type="text"
                            maxLength={ 10 } 
                            inputMode="numeric"
                            value={ value }
                            onChange={ onChange }
                            onKeyDown={ onKeyDown }
                        />
                    </h1>
                </center>
            </div>
        
    );
};