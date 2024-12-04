import { useEffect } from 'react'; 
import { formatNumberWithThousandsSeparator } from '../../../assets/utilities/BalanceFormater';
import { Tooltip } from '@nextui-org/react';

export const CardVignette = ({ Vignettes }) => {
    const { id, description, amount } = Vignettes; 

    useEffect(() => {
        console.log({ id, description, amount })
    }, [])
    
    return (
        <>
            <div  className="excel-card-vignette animate__animated animate__fadeInDown">
                <div className="excel-card-cell description ml-1">{ description }</div>
                <div className="excel-card-cell value">{ (description.length > 0) ? `$${ formatNumberWithThousandsSeparator(amount) }` : ''  }</div>
                <div className="excel-card-cell action">

                    {/* <i className='bx bx-check-circle card-icon text-success'></i> */}
                    <Tooltip placement="bottom" content="eliminar" color="secondary" closeDelay={50}>
                        <i className='bx bx-trash card-icon'></i>
                    </Tooltip>
                    <Tooltip placement="bottom" content="color" color="secondary" closeDelay={50}>
                        <i className='bx bxs-palette card-icon' ></i>
                    </Tooltip>
                    <Tooltip placement="bottom" content="orden" color="secondary" closeDelay={50}>
                        <i className='bx bx-sort-alt-2 card-icon' ></i>
                    </Tooltip>
                </div>
            </div>

        </>
    )
}
