import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSheetsAccountAPI } from '../../assets/api/MyAccountAppAPI/DomainServices';
import { PageTitle } from '../components/PageTitle';
import { Tooltip } from "@nextui-org/react";

export const AccountPage = ({ isDarkMode }) => {
    const { accountId } = useParams(); 
    const [ account, setAccount ] = useState({ name:'', creationDate: '' })
    const [ sheets, setSheets ] = useState([]); 

    useEffect(() => {
        getSheetsAccount();
    }, [ accountId ])
    
    const getSheetsAccount  = async () => {
        const { isError, data } = await getSheetsAccountAPI( accountId ); 
        
        if(!isError){
            const { account, sheets: sheetsData } = data; 
            setAccount(account);
            setSheets(sheetsData); 
        }
    }

    return (
        <>
            <PageTitle titleDescription={ account.name } />

            <br />
            <div className="row">
                <div className="col-5">
                    <ul className="list-group">
                        {
                            sheets.map(({ accountId ,cashBalance ,creationDate ,currentAccountBalance ,description ,id ,order }) => (
                                <li key={ id } className={ `list-group-item list-group-item-action d-flex justify-content-between align-items-center p-2 small ${ (isDarkMode) && 'bg-dark text-light' }` }>
                                    { description }
                                    <div>
                                        <Tooltip
                                            key="left"
                                            placement="left"
                                            content="Editar"
                                            color="secondary"
                                            closeDelay={ 50 }
                                        >
                                            <button className={ `btn btn-outline-${ (isDarkMode) ? 'light' : 'dark' } btn-sm me-2` }><i className='bx bx-edit'></i></button>
                                        </Tooltip>

                                        <Tooltip
                                            key="right"
                                            placement="right"
                                            content="Eliminar"
                                            color="secondary"
                                            closeDelay={ 50 }
                                        >
                                            <button className={ `btn btn-outline-${ (isDarkMode) ? 'light' : 'dark' } btn-sm` }><i className='bx bx-trash' ></i></button>
                                        </Tooltip>

                                    </div>
                                </li>
                            ))
                        }
                    </ul>

                    <br />
                    <Tooltip
                        key="right"
                        placement="right"
                        content="Agregar una nueva hoja de calculo"
                        color="secondary"
                        closeDelay={ 50 }
                    >
                        <button className={ `btn btn-outline-${ (isDarkMode) ? 'light' : 'dark' } btn-sm me-2` }><i className='bx bx-plus' ></i></button>
                    </Tooltip>
                </div>
            </div>
        </>
    )
}
