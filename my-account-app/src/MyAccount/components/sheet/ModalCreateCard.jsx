import Modal from 'react-bootstrap/Modal';
import { useParams } from 'react-router-dom';
import { createCardFetch } from '../../../assets/api/MyAccountAppAPI/Card';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import '/src/assets/css/Modal.css'; 
import { CustomInputText } from '../controls/CustomInputText';

export const ModalCreateCard = ({ isDarkMode = false, showModalCreateCard, setShowModalCreateCard, showUserMessage, refreshData }) => {
    const RefTitle = useRef(); 
    const { sheetId } = useParams();
    const [ title, setTitle ] = useState(''); 
    const [ description, setDescription ] = useState(''); 
    const [ modalMessage, setModalMessage ] = useState(' '); 
    const [ animationClass, setAnimationClass ] = useState('');

    useEffect(() => {
        if(showModalCreateCard)
            RefTitle.current.select(); 
    }, [showModalCreateCard])
    
    useEffect(() => {
        if (modalMessage) {
            setAnimationClass('animate__animated animate__shakeX');
        
            // Elimina la clase de animación después de que termine
            const timeout = setTimeout(() => {
                setAnimationClass(''); // Limpia la clase para reutilizar
            }, 1000); // Duración de la animación (coincide con animate.css)
        
            return () => clearTimeout(timeout); // Limpia el timeout si el componente se desmonta
        }
    }, [ modalMessage ]);

    const handleClick = () => {
        createCard(); 
    }

    const handleChange = (e, controlName) => {
        const value = e.target.value; 

        if(controlName === 'title')
            setTitle(value); 
        

        if(controlName === 'description')
            setDescription(value); 
    }

    const handleKeyDown = (e) => {
        const aschiiKey = e.which; 

        if(aschiiKey === 13)
            createCard(); 
    }

    const createCard = async  () => {
        if(title.trim().length === 0){
            setModalMessage('El nombre de la "Carta", es inválido.');
            RefTitle.current.select(); 
            return; 
        }

        const { isError, message } = await createCardFetch(sheetId, title.toUpperCase(), description); 

        if(isError) 
            showUserMessage('Ocurrió un error al intentar crear la carta de planificación.', 'error');
        else 
            showUserMessage(`Se ha creado la carta de planificación "${ title }" correctamente.`, 'success');

        setTitle('');
        setDescription('');
        setModalMessage('');
        setShowModalCreateCard(false);
        refreshData(); 
    }

    return (
        <Modal show={ showModalCreateCard } onHide={ setShowModalCreateCard } className="modal-blur">
            <Modal.Body className="modal-content">
                
                <h5 className="card-title text-color-default mb-3">CREAR CARTA DE PLANIFICACIÓN</h5>

                <CustomInputText
                    isDarkMode = { isDarkMode }
                    inputRef = { RefTitle }
                    value = { title.toUpperCase() }
                    onChangeEvent = { setTitle }
                    onKeyDownEvent = { ( e ) => handleKeyDown(e, 'title') }
                    placeHolder={ 'Nombre Carta' }
                />

                <button className="modal-button mt-3" onClick={ handleClick }>
                    CREAR CARTA
                </button>

                <small className={ `text-center text-danger mt-3 animate__fast ${ animationClass }` }> { modalMessage } </small>

          </Modal.Body>
        </Modal>
    );
};