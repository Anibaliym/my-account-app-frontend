import { useEffect } from 'react'; 
import { formatNumberWithThousandsSeparator } from '../../../assets/utilities/BalanceFormater';
import { Tooltip } from '@nextui-org/react';
import { CreateVignetteFetch } from '../../../assets/api/MyAccountAppAPI/Vignette';

export const CardVignette = ({ Vignettes }) => {
    const { id, description, amount } = Vignettes; 

    useEffect(() => {
        // console.log({ id, description, amount })
    }, [])

    const onCreateVignette = async () => {
        const algo = await CreateVignetteFetch(); 
    }

    return (
        <>
            <div  className="excel-card-vignette animate__animated animate__fadeInDown">
                <div className="excel-card-row">
                    <div className="excel-card-cell description">
                        <input 
                            type="text" 
                            className="vignette-input-text-description no-focus"
                            maxLength={ 60 }
                            value={ description } 
                            onChange={ () => {} }
                        />
                    </div>
                    <div className="excel-card-cell value">
                        <input 
                            type="text" 
                            className="vignette-input-text-amount no-focus"
                            maxLength={ 12 }
                            value={ `$${ formatNumberWithThousandsSeparator(amount) }` }
                            onChange={ () => {} }
                        />
                    </div>
                    <div className="excel-card-cell action">

                        {/* <i className='bx bx-save card-icon text-success'></i> */}
                        {/* <i className='bx bx-check-circle card-icon text-success'></i>  */}

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
            </div>

        </>
    )
}
