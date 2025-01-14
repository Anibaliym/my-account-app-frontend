import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { formatNumber, formatNumberWithThousandsSeparator } from '../../../assets/utilities/BalanceFormater';
import { deleteVignetteAndRecalculateTotalFetch, updateVignetteAndRecalculateTotalFetch } from '../../../assets/api/MyAccountAppAPI/DomainServices';

import { useSortable } from "@dnd-kit/sortable"; 
import { CSS } from '@dnd-kit/utilities'; 


export const CardVignette = ({ cardId, vignette, showUserMessage, setVignettes, vignettes, setCardTotalAmount, getCalculatedCardTotals}) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: vignette.id });
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

        showUserMessage( (!isError) ? 'viñeta eliminada' : 'ocurrió un error al intentar eliminar la viñeta' ); 

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
            <div 
                ref={ setNodeRef } 
                style={ {transform: CSS.Transform.toString(transform), transition} } // Estilos dinámicos de movimiento
                className="excel-card-vignette"
            >
                <div className="excel-card-row">
                    
                    <div className="excel-card-cell action">
                        <i className='bx bx-sort-alt-2 text-color-primary card-icon mr-1' {...listeners} {...attributes}></i>
                        <i className='bx bx-trash text-color-danger card-icon mr-1' onClick={ deleteVignette } ></i>
                        <i className='bx bx-cog text-color-primary card-icon mr-1'></i>
                        { (showSaveIcon) && ( <i className='bx bx-save card-icon text-success animate__animated animate__fadeInUp animate__faster'></i> ) }
                        { (showSuccessIcon) && ( <i className='bx bx-check-circle card-icon text-success animate__animated animate__fadeInUp animate__faster'></i> ) }
                    </div>


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
                </div>
            </div>

        </>
    )
}