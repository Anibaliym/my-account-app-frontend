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
        // Añade la clase de animación
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

        if(description.trim().length === 0){
            setModalMessage('Debe ingresar una descripción válida.');
            RefDescription.current.select(); 
            return; 
        }

        const { isError, message } = await createCardFetch(sheetId, title, description); 

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
                            ref={ RefTitle }
                            type="text" 
                            className="no-focus modal-input-text display-6"
                            placeholder="TITULO"  
                            onChange={ ( e ) => handleChange( e, 'title') }
                            onKeyDown={ ( e ) => handleKeyDown(e, 'title') }
                            value={ title }
                            maxLength={ 30 }
                        />

                    </div>

                    <div className="row">
                        <div className="form-floating mt-3">
                            <textarea 
                                ref={ RefDescription }
                                className="no-focus modal-input-text-area display-6" 
                                placeholder="Descripción"
                                id="floatingTextarea" 
                                maxLength={ 300 }
                                onChange={ ( e ) => handleChange( e, 'description') }
                                onKeyDown={ handleKeyDown }
                                value={ description }
                            ></textarea>
                        </div>     

                    </div>

                    <div className="row">
                        <small className={ `mt-5 text-right text-light ${ animationClass }` }> { modalMessage } </small>
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