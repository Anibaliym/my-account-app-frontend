import React from 'react'; 
import { useState } from 'react';
import { useRef } from 'react';
import { formatNumber, formatNumberWithThousandsSeparator } from '../../../assets/utilities/BalanceFormater';
import { useEffect } from 'react';
import { UpdateCashBalanceAPI } from '../../../assets/api/MyAccountAppAPI/Sheet';

export const CardCashBalance = React.memo(({ sheet }) => {
    const { cashBalance, id  } = sheet; 

    const amountRef = useRef(); 
    const [ newCashBalance, setNewCashBalance ] = useState( `$${ formatNumberWithThousandsSeparator( cashBalance ) }` );
    const [ showSaveIcon, setShowSaveIcon ] = useState(false); 
    const [ showOkIcon, setShowOkIcon ] = useState(false); 

    useEffect(() => {
        setNewCashBalance(`$${ formatNumberWithThousandsSeparator( cashBalance ) }`); 

    }, [ sheet ])
    
    useEffect(() => {
        setShowSaveIcon( formatNumber(newCashBalance) != cashBalance ); 

        if(formatNumber(newCashBalance) == 0)
            setShowSaveIcon(false);

    }, [ newCashBalance ])

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
            const { isError } = await UpdateCashBalanceAPI( id, formatNumber(newCashBalance) );
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
        setNewCashBalance( `$${ formatNumberWithThousandsSeparator(number) }` );
    };

    return (
        <div className="card-amount animate__animated animate__fadeIn animate__faster" onClick={ onClick }>
            <div className="card-amount-header">
                Efectivo
            </div>
            <div className="card-amount-text mt-1">
                <input
                    ref={ amountRef }
                    className="card-input-text display-6 text-center"
                    type="text"
                    value={ newCashBalance }
                    onChange={ onchange }
                    onKeyDown={ onKeyDown }
                    maxLength={ 11 }
                />
            </div>
            <div className="card-amount-footer mt-1">
                <center>
                    { showSaveIcon && <i className="bx bx-save icon  animate__animated animate__fadeIn animate__faster"></i> }
                    { showOkIcon && <i className="bx bx-check-circle icon"></i> }
                </center>
            </div>
        </div>        
    )
}); 
