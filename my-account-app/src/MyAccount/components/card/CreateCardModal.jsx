import Modal from 'react-bootstrap/Modal';
import '/src/assets/css/Modal.css'; 
import { useParams } from 'react-router-dom';
import { createCardFetch } from '../../../assets/api/MyAccountAppAPI/Card';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';

export const CreateCardModal = ({ createCardModal, setCreateCardModal, showUserMessage }) => {
    const RefTitle = useRef(); 
    const RefDescription = useRef(); 

    const { sheetId } = useParams();
    const [ title, setTitle ] = useState(''); 
    const [ description, setDescription ] = useState(''); 
    const [ modalMessage, setmodalMessage ] = useState(''); 



    useEffect(() => {
        if(createCardModal)
            RefTitle.current.select(); 
    }, [createCardModal])
    

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
        
        if(title.length === 0){
            setmodalMessage('el titulo es invalido');
            RefTitle.current.select(); 
            return; 
        }

        if(description.length === 0){
            setmodalMessage('La descripción es invalida');
            RefDescription.current.select(); 
            return; 
        }

        const { isError, message } = await createCardFetch(sheetId, title, description); 

        showUserMessage(message);
        setTitle('');
        setDescription('');
        setmodalMessage('');
        setCreateCardModal(false);
    }

    return (
        <Modal show={ createCardModal } onHide={ setCreateCardModal } className="modal-blur">

            <Modal.Body className="modal-content">
            <h5>Crear Carta</h5>

                <input 
                    ref={ RefTitle }
                    type="text" 
                    className="form-control form-control-sm no-focus" 
                    placeholder="Titulo .."  
                    onChange={ ( e ) => handleChange( e, 'title') }
                    onKeyDown={ ( e ) => handleKeyDown(e, 'title') }
                    value={ title }
                    maxLength={ 30 }
                />

                <div className="form-floating mt-3">
                    <textarea 
                        ref={ RefDescription }
                        className="form-control no-focus" 
                        id="floatingTextarea" 
                        maxLength={ 300 }
                        onChange={ ( e ) => handleChange( e, 'description') }
                        onKeyDown={ handleKeyDown }
                        value={ description }
                    ></textarea>
                    <label htmlFor="floatingTextarea">Descripción opcional ...</label>
                </div>     

                <small className="mt-2"> { modalMessage } </small>
                
                <button
                    className="btn btn-primary btn-sm form-control button-color mt-5"
                    onClick={ handleClick }
                >
                    Guardar
                    
                </button>

           </Modal.Body>
        </Modal>
    );
};