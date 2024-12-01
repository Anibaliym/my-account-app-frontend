import React from 'react'; 
import { useState } from 'react';
import { useRef } from 'react';
import { formatNumber, formatNumberWithThousandsSeparator } from '../../../assets/utilities/BalanceFormater';
import { useEffect } from 'react';
import { UpdateCurrentAccountBalanceAPI } from '../../../assets/api/MyAccountAppAPI/Sheet';

export const CardCurrentAccountBalance = React.memo(({ sheet }) => {
    const { currentAccountBalance, id  } = sheet; 

    const amountRef = useRef(); 
    const [ newCurrentAccountBalance, setNewCurrentAccountBalance ] = useState( `$${ formatNumberWithThousandsSeparator( currentAccountBalance ) }` );
    const [ showSaveIcon, setShowSaveIcon ] = useState(false); 
    const [ showOkIcon, setShowOkIcon ] = useState(false); 

    useEffect(() => {
        setNewCurrentAccountBalance(`$${ formatNumberWithThousandsSeparator( currentAccountBalance ) }`); 

    }, [ sheet ])
    
    useEffect(() => {
        setShowSaveIcon( formatNumber(newCurrentAccountBalance) != currentAccountBalance ); 

        if(formatNumber(newCurrentAccountBalance) == 0)
            setShowSaveIcon(false);

    }, [ newCurrentAccountBalance ])

    useEffect(() => {

        if(showOkIcon) {
            setTimeout(() => {
                setShowOkIcon(false); 
            }, 2000);
        }

    }, [ showOkIcon ])
    
    
    const onClick = () => {
        amountRef.current.select();
    };    

    const onKeyDown = async (e) => {
        const aschiiKey = e.which; 

        if(aschiiKey === 13) {
            const { isError } = await UpdateCurrentAccountBalanceAPI( id, formatNumber(newCurrentAccountBalance) );
            if(!isError) {
                console.log('efectivo guardado')
                setShowOkIcon(true); 
                setShowSaveIcon(false); 
            }
        }
    }
    
    const onchange = (e) => {
        // Obtener el valor del input
        let number = e.target.value;
    
        // Remueve cualquier carácter no numérico
        number = number.replace(/\D/g, '');
    
        // Actualiza el estado con el número formateado
        setNewCurrentAccountBalance( `$${ formatNumberWithThousandsSeparator(number) }` );
    };

    return (
        <div className="card-amount animate__animated animate__fadeIn animate__faster" onClick={ onClick }>
            <div className="card-amount-header">
                cuenta corriente
            </div>
            <div className="card-amount-text mt-1">
                <input
                    ref={ amountRef }
                    className="card-input-text display-6 text-center"
                    type="text"
                    value={ newCurrentAccountBalance }
                    onChange={ onchange }
                    onKeyDown={ onKeyDown }
                    maxLength={ 11 }
                />
            </div>
            <div className="card-amount-footer mt-1">
                <center>
                    { showSaveIcon && <i className="bx bx-save icon  animate__animated animate__fadeIn animate__faster"></i> }
                    { showOkIcon && <i className="bx bx-check-circle icon "></i> }
                </center>

            </div>
        </div>        
    )
}); 
