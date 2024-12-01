import { Tooltip } from '@nextui-org/react';

export const BarTools = () => {
    return (
        <div className="sheet-bar-tools">

            <Tooltip
                placement="bottom"
                content="Crear nueva carta"
                color="secondary"
                closeDelay={ 50 }
            >
                <button className="btn btn-outline-primary btn-sm">
                    <i className='bx bx-add-to-queue' ></i>
                </button>
            </Tooltip>

            <Tooltip
                placement="bottom"
                content="duplicar o crear respaldo"
                color="secondary"
                closeDelay={ 50 }
            >
                <button className="btn btn-outline-primary btn-sm ml-1">
                    <i className='bx bx-copy-alt'></i>
                </button>
            </Tooltip>

            <Tooltip
                placement="bottom"
                content="exportar a excel"
                color="secondary"
                closeDelay={ 50 }
            >
                <button className="btn btn-outline-primary btn-sm ml-1">
                    <i className='bx bxs-file-export' ></i>
                </button>                    
            </Tooltip>

        </div>

    )
}
