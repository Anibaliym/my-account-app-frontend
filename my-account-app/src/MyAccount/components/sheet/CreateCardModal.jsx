import Modal from 'react-bootstrap/Modal';
import { useParams } from 'react-router-dom';
import { createCardFetch } from '../../../assets/api/MyAccountAppAPI/Card';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import '/src/assets/css/Modal.css'; 

export const CreateCardModal = ({ showModalCreateCard, setShowModalCreateCard, showUserMessage, fetchCard }) => {
    const RefTitle = useRef(); 
    const RefDescription = useRef(); 
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
            setModalMessage('Debe ingresar un titulo válido.');
            RefTitle.current.select(); 
            return; 
        }

        const { isError, message } = await createCardFetch(sheetId, title.toUpperCase(), description); 

        showUserMessage(message);
        setTitle('');
        setDescription('');
        setModalMessage('');
        setShowModalCreateCard(false);
        fetchCard(); 
    }

    return (
        <Modal show={ showModalCreateCard } onHide={ setShowModalCreateCard } className="modal-blur">
            <Modal.Body className="modal-content">
                <div className="container-fluid">
                    <div className="row">
                        <input 
                            style={{ textTransform:'uppercase' }}
                            ref={ RefTitle }
                            type="text" 
                            className="no-focus modal-input-text display-6"
                            placeholder="Descripción de la carta"  
                            onChange={ ( e ) => handleChange( e, 'title') }
                            onKeyDown={ ( e ) => handleKeyDown(e, 'title') }
                            value={ title }
                            maxLength={ 25 }
                        />

                    </div>

                    <div className="row">
                        <small className={ `mt-5 mb-1 text-right text-danger ${ animationClass }` }> { modalMessage } </small>
                    </div>
  
                    <div className="row">
                        <button
                            className="modal-button"
                            onClick={ handleClick }
                        >
                            Guardar
                        </button>

                    </div>
                </div>
           </Modal.Body>
        </Modal>
    );
};