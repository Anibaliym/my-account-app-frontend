import Modal from 'react-bootstrap/Modal';
import { useParams } from 'react-router-dom';
import { createCardFetch, updateCardOrderItemsFetch } from '../../../assets/api/MyAccountAppAPI/Card';
import { useState, useRef, useEffect, useContext } from 'react';
import { CustomInputText } from '../controls/CustomInputText';
import { ThemeContext } from '../../../assets/context/ThemeProvider';
import { FormAddCards } from './FormAddCards';
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";

import '/src/assets/css/Modal.css';

export const ModalCreateCard = ({ showModalCreateCard, setShowModalCreateCard, showUserMessage, refreshData, cardsSheetData }) => {
    const { isDarkMode } = useContext(ThemeContext);
    const RefTitle = useRef();
    const { sheetId } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [modalMessage, setModalMessage] = useState(' ');
    const [animationClass, setAnimationClass] = useState('');

    // Estado para manejar la lista ordenada de cartas
    const [cards, setCards] = useState([]);

    useEffect(() => {
        if (cardsSheetData?.length > 0) {
            setCards(cardsSheetData);
        }
    }, [cardsSheetData]);

    useEffect(() => {
        if (showModalCreateCard)
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
    }, [modalMessage]);    

    const handleClick = () => createCard();

    const handleKeyDown = (e) => {
        const aschiiKey = e.which;

        if (aschiiKey === 13)
            createCard();
    }

    const createCard = async () => {
        if (title.trim().length === 0) {
            setModalMessage('El nombre de la "Carta", es inválido.');
            RefTitle.current.select();
            return;
        }

        const { isError } = await createCardFetch(sheetId, title.toUpperCase(), description);

        if (isError)
            showUserMessage('Ocurrió un error al intentar crear la carta de planificación.', 'error');
        else
            showUserMessage(`Se ha creado la carta de planificación "${title}" correctamente.`, 'success');

        setTitle('');
        setDescription('');
        setModalMessage('');
        // setShowModalCreateCard(false);
        refreshData();
    }

    const handleDragEnd = async (event) => {
        const { active, over } = event;

        // Encuentra los índices antiguos y nuevos
        const oldIndex = cards.findIndex(s => s.id === active.id);
        const newIndex = cards.findIndex(s => s.id === over.id);

        // Mueve el elemento dentro del array
        const newOrder = arrayMove(cards, oldIndex, newIndex);

        // Actualiza la propiedad "order" en base al nuevo índice
        const updatedCards = newOrder.map((item, index) => ({
            ...item,
            order: index + 1, // Ajusta el orden basado en la nueva posición
        }));

        await updateCardOrderItemsFetch(updatedCards);
        refreshData(); // Esto ya hará setCards con los datos actualizados


        setCards(updatedCards);
    };

    return (
        <Modal
            show={showModalCreateCard}
            onHide={setShowModalCreateCard}
            className="modal-blur"
        >

            <Modal.Body className="modal-content">
                <h5 className=" card-title text-color-default">CARTAS DE PLANIFICACIÓN</h5>
                <div className="row mt-2 p-2">
                    <div className="col">
                        <CustomInputText
                            isDarkMode={isDarkMode}
                            inputRef={RefTitle}
                            value={title.toUpperCase()}
                            onChangeEvent={setTitle}
                            onKeyDownEvent={(e) => handleKeyDown(e, 'title')}
                            placeHolder={'Nombre Carta'}
                            textAlign='text-left'
                        />

                        <button className="modal-button mt-2 mb-2" onClick={handleClick}>
                            Crear Carta
                        </button>

                        <br />

                        <small className={`text-center text-danger mt-3 animate__fast ${animationClass}`}> {modalMessage} </small>
                        {
                            (cards.length <= 0) 
                                && (<p className="mt-2 animate__animated animate__fadeInUp animate__faster text-color-default" style={{ fontSize: '12px' }}>No hay hojas de cálculo en esta cuenta.</p>)
                        }

                        <DndContext
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext items={cards} strategy={verticalListSortingStrategy}>
                                {
                                    cards.map((item) => (
                                        <FormAddCards
                                            key={item.id}
                                            {...item}
                                        />
                                    ))
                                }
                            </SortableContext>
                        </DndContext>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};