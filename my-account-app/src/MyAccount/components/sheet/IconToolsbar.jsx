import { Tooltip } from '@nextui-org/react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ModalCreateCard } from './ModalCreateCard';
import { ModalDeleteSheetConfirmation } from './ModalDeleteSheetConfirmation';
import { createSheetBackupFetch } from '../../../assets/api/MyAccountAppAPI/DomainServices';

export const IconToolsbar = ({ refreshData, cardsSheetData, sheetDescription, setAccountListener, accountListener, showUserMessage }) => {
    const { sheetId } = useParams();

    const [showModalCreateCard, setshowModalCreateCard] = useState(false);
    const [modalConfirmDeleteSheet, setModalConfirmDeleteSheet] = useState(false);

    const createSheetBackup = async () => {
        const { isError } = await createSheetBackupFetch(sheetId);

        if (isError)
            showUserMessage('Ocurrió un error al intentar crear el respaldo de la "Hoja de cálculo"', 'error');
        else {
            setAccountListener(accountListener - 1);
            showUserMessage(`Se ha creado un respaldo de la hoja de cálculo "${sheetDescription}" correctamente.`, 'success');
        }
    }

    return (
        <div className="row mt-2">
            <ModalCreateCard
                showModalCreateCard={showModalCreateCard}
                setShowModalCreateCard={setshowModalCreateCard}
                showUserMessage={showUserMessage}
                refreshData={refreshData}
                cardsSheetData={cardsSheetData}
            />

            <ModalDeleteSheetConfirmation
                sheetId={sheetId}
                sheetDescription={sheetDescription}
                modalConfirmDeleteSheet={modalConfirmDeleteSheet}
                setModalConfirmDeleteSheet={setModalConfirmDeleteSheet}
                setAccountListener={setAccountListener}
                accountListener={accountListener}
                showUserMessage={showUserMessage}
            />

            <div className="col icon-save">
                <Tooltip placement="bottom" content="Cartas de planificación" color="foreground" closeDelay={50}>
                    <i className="bx bx-spreadsheet icon cursor-pointer text-white ml-2" onClick={() => (setshowModalCreateCard(!showModalCreateCard))} ></i>
                </Tooltip>
                <Tooltip placement="bottom" content="Crear Respaldo" color="foreground" closeDelay={50}>
                    <i className='bx bxs-backpack icon cursor-pointer text-white ml-2' onClick={createSheetBackup} ></i>
                </Tooltip>
                <Tooltip placement="bottom" content="Eliminar hoja de cálculo" color="danger" closeDelay={50}>
                    <i className="bx bx-trash icon icon-trash cursor-pointer text-white icon-trash ml-2" onClick={() => setModalConfirmDeleteSheet(true)}></i>
                </Tooltip>
            </div>
        </div>
    )
}
