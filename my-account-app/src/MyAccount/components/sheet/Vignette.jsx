import { useState, useRef, useEffect, useContext } from 'react';
import { formatNumberWithThousandsSeparator } from '../../../assets/utilities/BalanceFormater';
import { deleteVignetteAndRecalculateTotalFetch, updateVignetteAndRecalculateTotalFetch } from '../../../assets/api/MyAccountAppAPI/DomainServices';

import { useSortable } from "@dnd-kit/sortable"; 
import { CSS } from '@dnd-kit/utilities'; 
import { Tooltip } from '@nextui-org/react';
import { FormSelectColor } from './FormSelectColor';
import { ThemeContext } from '../../../assets/context/ThemeProvider';

export const Vignette = ({ cardId, vignette, showUserMessage, setVignettes, vignettes, setCardTotalAmount, refreshData }) => {
    const {isDarkMode} = useContext(ThemeContext);
    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({ id: vignette.id });
    const {id: vignetteId, description, amount, order, color} = vignette;

    const refDesription = useRef(); 
    const refAmount = useRef(); 

    const [showSuccessIcon, setShowSuccessIcon] = useState(false); 
    const [newDescription, setNewDescription] = useState(description); 
    const [oldDescription, setOldDescription] = useState(description); 
    const [newAmount, setNewAmount] = useState(amount); 
    const [newVignette, setNewVignette] = useState({}); 
    const [showSaveIcon, setShowSaveIcon] = useState(false);
    const [vignetteColorTheme, setVignetteColorTheme] = useState( (color.length === 0) ? 'DEFAULT' : color ); 
    
    useEffect(() => {
        if(showSuccessIcon) {
            setTimeout(() => {
                setShowSuccessIcon(false); 
            }, 1500);
        }
    }, [ showSuccessIcon ])

    useEffect(() => {
        setShowSaveIcon(newDescription !== oldDescription); 
    }, [ newDescription, newAmount ])

    const updateVignette = async () => {
        let amountString = String(newAmount); 

        const newData = {
            id: vignetteId,
            cardId,
            description: newDescription,
            amount: amountString.length === 0 ? 0 : parseInt(amountString.replace(/\./g, ""), 10), // Convertir a número
            color: vignetteColorTheme,
            order,
        };

        setOldDescription(newDescription); 
        setNewAmount( (newData.amount === 0) ? 0: newData.amount ); 

        const { isError, data } = await updateVignetteAndRecalculateTotalFetch(newData);

        if (!isError) {
            refreshData();
            setShowSaveIcon(false);
            setShowSuccessIcon(true);
            setCardTotalAmount(data.totalAmount);
        } 
        else 
            showUserMessage("Ocurrió un error al intentar actualizar la viñeta.", "error");
    };

    const onChangeDescription = (e) =>  setNewDescription(e.target.value);

    const onChangeAmount = (e) => {
        let value = e.target.value;
    
        // Permitir solo números y un "-" al inicio
        value = value.replace(/[^0-9-]/g, ''); 
    
        // Asegurar que solo haya un "-" al inicio
        if (value.includes("-") && value.indexOf("-") !== 0)
            value = value.replace("-", "");
    
        // Evitar ceros a la izquierda, excepto si el número es solo "0"
        if (value.length > 1 && value.startsWith("0") && !value.startsWith("-"))
            value = value.substring(1);
    
        // Si el input es "-0", convertirlo en "-"
        if (value === "-0")
            value = "-";
    
        // Aplicar el formato de miles solo si no está en edición activa
        setNewAmount(value);
    };
    const deleteVignette = async () => {
        const { isError, data } = await deleteVignetteAndRecalculateTotalFetch( vignette.id ); 

        if(!isError){
            if(newDescription.length > 0)
                showUserMessage(`La viñeta con la descripción "${ newDescription }", ha sido eliminada.`, 'success'); 
        }
        else 
            showUserMessage('Ocurrió un error al intentar eliminar la viñeta.', 'error'); 


        if(!isError){
            refreshData(); 
            setCardTotalAmount(data.data.totalAmount);
            setVignettes(vignettes.filter(item => item.id !== vignette.id));
        }
    }

    const handleBlur = ( controlName ) => {

        switch (controlName) {
            case 'description':
                if(oldDescription === newDescription.trim()) return; 
                break;
            case 'amount':
                if(amount === newAmount) { return; }
                    // setChangeCard(!changeCard);
                break;
        }

        setNewVignette({ id: vignetteId, cardId, description: newDescription, amount: newAmount, color: 'DEFAULT', order, })
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
        <div
            ref={setNodeRef}
            style={{ transform: CSS.Transform.toString(transform, transition) }}
            className={`excel-card-vignette color-selector-${isDarkMode ? 'dark' : 'light'}Theme-${vignetteColorTheme}`}
        >
            <div className="card-vignette-description">
                <input 
                    type="text" 
                    className={ `vignette-input-text-description no-focus color-selector-${ (isDarkMode) ? 'dark' : 'light' }Theme-${ vignetteColorTheme }` }
                    ref={ refDesription }
                    maxLength={ 60 }
                    value={ newDescription } 
                    onChange={ onChangeDescription }
                    onClick={ () => ( refDesription.current.select() ) }
                    onBlur={ () => ( handleBlur('description') ) }
                    onKeyDown={ (e) => handleKeyDown(e, 'description') }
                />
            </div>
            <div className="card-vignette-amount">
                <input 
                    type="text" 
                    ref={ refAmount }
                    className={ `vignette-input-text-amount no-focus color-selector-${ (isDarkMode) ? 'dark' : 'light' }Theme-${ vignetteColorTheme }` }
                    maxLength={ 12 }
                    value={ `$${ formatNumberWithThousandsSeparator(newAmount) }` }
                    onChange={ onChangeAmount }
                    onBlur={ () => ( handleBlur('amount') ) }
                    onClick={ () => ( refAmount.current.select() ) }
                    onKeyDown={ (e) => handleKeyDown(e, 'amount') }
                />                

            </div>
            <div className="card-vignette-actions">
                <span className="mobile-hide">
                    { (showSaveIcon) && ( <i className='bx bx-save card-icon text-success animate__animated animate__fadeInUp animate__faster'></i> ) }
                    { (showSuccessIcon) && ( <i className='bx bx-check-circle card-icon text-success animate__animated animate__fadeInUp animate__faster'></i> ) }
                </span>
                        
                <i className='bx bx-trash icon icon icon-trash text-color-danger card-icon' onClick={ deleteVignette } ></i>

                <span className="mobile-hide">
                    <Tooltip 
                        content={<FormSelectColor vignetteId={ vignetteId } setVignetteColorTheme={ setVignetteColorTheme }/>} 
                        placement="down"
                        closeDelay={ 50 }
                    >
                        <i className='bx bx-palette icon text-color-primary card-icon '></i>
                    </Tooltip> 
                    <i className='bx bx-sort-alt-2 icon text-color-primary card-icon' {...listeners} {...attributes}></i>                
                </span>
            </div>
        </div>            
    )
}