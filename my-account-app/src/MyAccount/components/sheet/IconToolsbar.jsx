import { Tooltip } from '@nextui-org/react'; 
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CreateCardModal } from './CreateCardModal';
import { DeleteSheetConfirmationModal } from './DeleteSheetConfirmationModal';
import { CreateSheetBackupFetch } from '../../../assets/api/MyAccountAppAPI/DomainServices';

export const IconToolsbar = ({ refreshData, isDarkMode, sheetDescription, setAccountListener, accountListener, showUserMessage }) => {
    const { sheetId } = useParams();

    const [showModalCreateCard, setshowModalCreateCard] = useState(false); 
    const [modalConfirmDeleteSheet, setModalConfirmDeleteSheet] = useState(false); 

    const createSheetBackup = async () => {
        const { isError } = await CreateSheetBackupFetch(sheetId);
        
        if(isError)
            showUserMessage('Ocurrió un error al intentar crear el respaldo de la "Hoja de cálculo"','error');
        else
        {
            setAccountListener(accountListener - 1);
            showUserMessage(`Se ha creado un respaldo de la hoja de cálculo "${ sheetDescription }" correctamente.`,'success');
        }
    }


    return (
        <div className="row mt-2">

            <CreateCardModal
                isDarkMode={ isDarkMode }
                showModalCreateCard={ showModalCreateCard } 
                setShowModalCreateCard={ setshowModalCreateCard } 
                showUserMessage={ showUserMessage } 
                refreshData={ refreshData } 
            />

            <DeleteSheetConfirmationModal
                sheetId={ sheetId }
                sheetDescription = { sheetDescription }
                modalConfirmDeleteSheet = { modalConfirmDeleteSheet }
                setModalConfirmDeleteSheet = { setModalConfirmDeleteSheet }
                setAccountListener={ setAccountListener } 
                accountListener={ accountListener }
                showUserMessage={ showUserMessage }
            />

            <div className="col icon-save">
                <Tooltip placement="bottom" content="Crear carta de planificación" color="foreground" closeDelay={ 50 }>
                    <i className="bx bx-add-to-queue icon" onClick={ () => ( setshowModalCreateCard(!showModalCreateCard) ) } ></i>
                </Tooltip>
                <Tooltip placement="bottom" content="Crear Respaldo" color="foreground" closeDelay={ 50 }>
                    <i className='bx bxs-backpack icon' onClick={ createSheetBackup } ></i>
                </Tooltip>
                <Tooltip placement="bottom" content="Exportar a excel" color="foreground" closeDelay={ 50 }>
                    <i className='bx bx-export icon'></i>
                </Tooltip>
                <Tooltip placement="bottom" content="Calendario" color="foreground" closeDelay={ 50 }>
                    <i className='bx bxs-calendar icon' ></i>
                </Tooltip>
                <Tooltip placement="bottom" content="Eliminar hoja de cálculo" color="danger" closeDelay={ 50 }>
                    <i className="bx bx-trash icon" onClick={ () => setModalConfirmDeleteSheet(true) }></i>
                </Tooltip>
            </div>
        </div>
    )
}
