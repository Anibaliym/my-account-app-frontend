import { Tooltip } from '@nextui-org/react';
import { useState, useEffect, useRef } from 'react';
import { deleteCardWithVignettesFetch } from '../../../assets/api/MyAccountAppAPI/DomainServices';
import { createVignetteFetch, getVignetteByCardIdFetch, updateVignetteOrderItemsFetch } from '../../../assets/api/MyAccountAppAPI/Vignette';
import { formatNumberWithThousandsSeparator } from '../../../assets/utilities/BalanceFormater';
import { useParams } from 'react-router-dom';
import { updateCardFetch } from '../../../assets/api/MyAccountAppAPI/Card';
import { Vignette } from './Vignette';
import { ModalDeleteCardConfirmation } from './ModalDeleteCardConfirmation';

import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export const FormCardDragable = ({ id, title, order, vignettesData, showUserMessage, getSheetCardsWithVignettes, totalCardAmount, refreshData }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const style = { transform: CSS.Transform.toString(transform), transition };

    const { sheetId } = useParams()
    const cardTitleRef = useRef(null);

    const [cardTitle, setCardTitle] = useState(title);
    const [cardTitleOld, setCardTitleOld] = useState(title);
    const [vignettes, setVignettes] = useState(vignettesData);
    const [modalConfirmDeleteCard, setModalConfirmDeleteCard] = useState(false);
    const [cardTotalAmount, setCardTotalAmount] = useState(totalCardAmount);
    const [isAnimating, setIsAnimating] = useState(false);


    useEffect(() => {
        // Activa la animación cuando cambia el valor de cardTotalAmount
        setIsAnimating(true);

        // Remueve la clase después de un tiempo (duración de la animación)
        const timer = setTimeout(() => {
            setIsAnimating(false);
        }, 1000); // Ajusta el tiempo según la duración de tu animación CSS

        return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
    }, [cardTotalAmount]);

    const createVignette = async () => {
        const { isError, message, data: vignette } = await createVignetteFetch(id, 5);

        if (isError) {
            if (message === 'No se pueden crear mas de 20 viñetas en una sola carta.') {
                showUserMessage('No se pueden crear mas de "20 viñetas" en una sola carta.', 'warning');
                return;
            }

            showUserMessage('Ocurrió un error al intentar crear la viñeta', 'error');
            return;
        }

        setVignettes([...vignettes, vignette]);
    }

    const onDrawEnd = (event) => {
        const { active, over } = event;

        // Verifica si hay un destino válido
        if (!over || active.id === over.id) {
            return; // No hacer nada si no hay un destino o el elemento no se ha movido
        }

        // Encuentra los índices antiguos y nuevos en el array de vignettes
        const oldIndex = vignettes.findIndex(v => v.id === active.id);
        const newIndex = vignettes.findIndex(v => v.id === over.id);

        // Mueve el elemento dentro del array
        const newOrder = arrayMove(vignettes, oldIndex, newIndex);

        // Actualiza la propiedad "order" en base al nuevo índice
        const updatedOrder = newOrder.map((item, index) => ({
            ...item,
            order: index + 1, // Ajusta el orden basado en la nueva posición
        }));

        // Actualiza el estado con el nuevo orden
        setVignettes(updatedOrder);

        updateVignetteOrderItemsFetch(updatedOrder);
    };

    const deleteCard = async () => {
        const { isError, data: vignettes } = await getVignetteByCardIdFetch(id);

        if (!isError) {
            if (vignettes.length > 0)
                setModalConfirmDeleteCard(true);
            else {
                const { isError, data } = await deleteCardWithVignettesFetch(id);

                if (!isError)
                    showUserMessage(`La carta con el nombre "${title}", ha sido eliminada.`, 'success');
                else
                    showUserMessage('Ocurrió un error al intentar eliminar la carta.', 'error');

                getSheetCardsWithVignettes();
                refreshData();
            }
        }
        else
            showUserMessage('Ocurrió un error al intentar eliminar la carta.', 'error');
    }

    const deleteCardWithVignettes = async () => {
        const { isError } = await deleteCardWithVignettesFetch(id);

        if (!isError)
            showUserMessage('Carta eliminada correctamente.', 'success');
        else
            showUserMessage('Ocurrió un error al intentar eliminar la carta.', 'error');

        setModalConfirmDeleteCard(false);
        getSheetCardsWithVignettes();
    }

    const updateCard = async () => {
        const { isError } = await updateCardFetch(id, sheetId, cardTitle, order);

        if (isError) {
            showUserMessage('Ocurrió un error al intentar actualizar el nombre de la carta.', 'error');
            setCardTitle(title);
        }
        else {
            showUserMessage(`La carta "${title}", ha actualizado su nombre a "${cardTitle}".`, 'success');
            setCardTitleOld(cardTitle)
        }
    }

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {

            if (cardTitle === cardTitleOld) return;

            if (cardTitle.length === 0) {
                showUserMessage('El nombre de la carta es inválido.', 'warning');
                return;
            }

            updateCard();
        }
    }

    const handleBlur = async (e) => {
        if (cardTitle === cardTitleOld) return;

        if (cardTitle.length === 0) {
            showUserMessage('El nombre de la carta es inválido.', 'warning');
            setCardTitle(title);
            return;
        }

        updateCard();
    }

    return (
        <div
            className={`excel-card animate__animated animate__fadeIn animate__faster mb-4`}
            ref={setNodeRef}
            style={style}
            {...attributes}
        >
            <ModalDeleteCardConfirmation
                cardTitle={title}
                modalConfirmDeleteCard={modalConfirmDeleteCard}
                setModalConfirmDeleteCard={setModalConfirmDeleteCard}
                deleteCardWithVignettes={deleteCardWithVignettes}
            />

            <div className="excel-card-header border-white">
                <input
                    ref={cardTitleRef}
                    name="cardDescription"
                    type="text"
                    className={`no-focus card-title-input-text display-6`}
                    maxLength={40}
                    value={cardTitle.toUpperCase()}
                    onChange={(e) => (setCardTitle(e.target.value))}
                    onClick={() => (cardTitleRef.current.select())}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                    autoComplete="off"
                />

                <div className="icons-container">
                    <Tooltip placement="bottom" content="Agregar Viñeta" color="foreground" closeDelay={50}>
                        <i className="bx bx-plus icon cursor-pointer" onClick={createVignette} ></i>
                    </Tooltip>
                    <Tooltip placement="bottom" content="Eliminar la carta" color="danger" closeDelay={50}>
                        <i className="bx bx-trash icon ml-1 icon-trash cursor-pointer" onClick={deleteCard}></i>
                    </Tooltip>
                </div>
            </div>

            <div className="excel-card-body mt-3">
                <DndContext
                    collisionDetection={closestCenter}
                    onDragEnd={onDrawEnd}
                >
                    <SortableContext items={vignettes.map(v => v.id)} strategy={verticalListSortingStrategy}>
                        {
                            vignettes?.map((vignette) => (
                                <Vignette
                                    key={vignette.id}
                                    cardId={id}
                                    vignette={vignette}
                                    showUserMessage={showUserMessage}
                                    setVignettes={setVignettes}
                                    vignettes={vignettes}
                                    setCardTotalAmount={setCardTotalAmount}
                                    refreshData={refreshData}
                                />
                            ))
                        }
                    </SortableContext>
                </DndContext>
            </div>

            <div className={`excel-card-footer mt-1 animate__animated animate__faster ${isAnimating ? 'animate__flipInX' : ''}`}>
                <div className="excel-card-cell"></div>
                <h2 className="mt-2 dispplay-2" >
                    ${formatNumberWithThousandsSeparator(cardTotalAmount)}
                </h2>
            </div>
            <i className="bx bx-move cursor-pointer mr-2" {...listeners}></i>
        </div>
    )
}
