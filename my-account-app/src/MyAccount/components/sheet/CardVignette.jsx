import { Tooltip } from '@nextui-org/react';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { formatNumber, formatNumberWithThousandsSeparator } from '../../../assets/utilities/BalanceFormater';
import { deleteVignetteAndRecalculateTotalFetch, updateVignetteAndRecalculateTotalFetch } from '../../../assets/api/MyAccountAppAPI/DomainServices';

export const CardVignette = ({ cardId, vignette, showUserMessage, setVignettes, vignettes, setCardTotalAmount, getCalculatedCardTotals }) => {
    const { id: vignetteId, description, amount, order } = vignette; 
    
    const refDesription = useRef(); 
    const refAmount = useRef(); 

    const [ showSuccessIcon, setShowSuccessIcon ] = useState(false); 
    const [ newDescription, setNewDescription ] = useState(description); 
    const [ newAmount, setNewAmount ] = useState(amount); 
    const [ newVignette, setNewVignette] = useState({}); 
    const [ showSaveIcon, setShowSaveIcon ] = useState(false);

    useEffect(() => {
        if(showSuccessIcon) {
            setTimeout(() => {
                setShowSuccessIcon(false); 
            }, 1500);
        }
    }, [ showSuccessIcon ])

    useEffect(() => {
        setShowSaveIcon(newDescription !== description); 
    }, [ newDescription, newAmount ])

    const updateVignette = async () => {

        const newData = { 
            id: vignetteId, 
            cardId, 
            description: newDescription, 
            amount: (newAmount.length === 0) ? 0 : newAmount, 
            color: 'WHITE', 
            order 
        }

        const { isError, data } = await updateVignetteAndRecalculateTotalFetch( newData ); 

        if(!isError) {
            getCalculatedCardTotals(); 
            setShowSaveIcon(false); 
            setShowSuccessIcon(true); 
            setCardTotalAmount(data.totalAmount);
        }
        else 
            showUserMessage('Ocurrió un error al intentar actualizar la viñata'); 
    }

    const onChangeDescription = (e) =>  setNewDescription(e.target.value);

    const onChangeAmount = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        setNewAmount( formatNumber(value)); 
    };

    const deleteVignette = async () => {
        const { isError, data } = await deleteVignetteAndRecalculateTotalFetch( vignette.id ); 

        showUserMessage( (isError) ? 'Ocurrió un error al intentar eliminar la viñeta' : 'Viñeta eliminada' ); 
        if(!isError){

            getCalculatedCardTotals(); 

            setCardTotalAmount(data.data.totalAmount);
            setVignettes(vignettes.filter(item => item.id !== vignette.id));
        }
    }



    const handleBlur = ( controlName ) => {

        switch (controlName) {
            case 'description':
                if(description === newDescription.trim()) return; 
                break;
            case 'amount':
                if(amount === newAmount) { return; }
                    // setChangeCard(!changeCard);
                break;
        }

        setNewVignette({ id: vignetteId, cardId, description: newDescription, amount: newAmount, color: 'WHITE', order, })
        updateVignette(); 
    }

    const handleKeyDown = (e, controlName) => {

        switch (controlName) {
            case 'description':
                if(e.which === 13) refAmount.current.select(); 
                break;
            case 'amount':
                if(e.which === 13) e.target.blur();
                break;
        }
    }

    return (
        <>
            <div className="excel-card-vignette animate__animated animate__fadeInDown animate__faster">
                <div className="excel-card-row">
                    <div className="excel-card-cell description">
                        <input 
                            type="text" 
                            className="vignette-input-text-description no-focus"
                            ref={ refDesription }
                            maxLength={ 60 }
                            value={ newDescription } 
                            onChange={ onChangeDescription }
                            onClick={ () => ( refDesription.current.select() ) }
                            onBlur={ () => ( handleBlur('description') ) }
                            onKeyDown={ (e) => handleKeyDown(e, 'description') }
                        />
                    </div>
                    <div className="excel-card-cell value">
                        <input 
                            type="text" 
                            ref={ refAmount }
                            className="vignette-input-text-amount no-focus"
                            maxLength={ 11 }
                            value={ `$${ formatNumberWithThousandsSeparator(newAmount) }` }
                            onChange={ onChangeAmount }
                            onBlur={ () => ( handleBlur('amount') ) }
                            onClick={ () => ( refAmount.current.select() ) }
                            onKeyDown={ (e) => handleKeyDown(e, 'amount') }
                        />
                    </div>
                    <div className="excel-card-cell action">

                        { (showSaveIcon) && ( <i className='bx bx-save card-icon text-success animate__animated animate__fadeInUp animate__faster'></i> ) }
                        

                        { (showSuccessIcon) && ( <i className='bx bx-check-circle card-icon text-success animate__animated animate__fadeInUp animate__faster'></i> ) }

                        <Tooltip placement="bottom" content="eliminar" color="secondary" closeDelay={50}>
                            <i className='bx bx-trash card-icon' onClick={ deleteVignette } ></i>
                        </Tooltip>
                        {/* <Tooltip placement="bottom" content="color" color="secondary" closeDelay={50}>
                            <i className='bx bxs-palette card-icon' ></i>
                        </Tooltip> */}
                        <Tooltip placement="bottom" content="orden" color="secondary" closeDelay={50}>
                            <i className='bx bx-sort-alt-2 card-icon' ></i>
                        </Tooltip>
                    </div>
                </div>
            </div>

        </>
    )
}