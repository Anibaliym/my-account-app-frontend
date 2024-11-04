import { formatDate } from '../../assets/utilities/DateFormater';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSheetsAccountAPI } from '../../assets/api/MyAccountAppAPI/DomainServices';

export const AccountPage = () => {
    const { accountId } = useParams(); 
    const [ account, setAccount ] = useState({ name:'', creationDate: '' })
    const [ sheets, setSheets ] = useState([]); 
    
    useEffect(() => {
        getSheetsAccount();
    }, [accountId])
    
    const getSheetsAccount  = async () => {
        const { isError, message, data } = await getSheetsAccountAPI( accountId ); 

        if(!isError){
            const { account, sheets: sheetsData } = data; 

            setAccount(account);
            setSheets(sheetsData); 
        }
    }

    return (
        <>
            <p>{ account.name }</p>

            <div className="list-group">
                {
                    sheets.map( ({ description, order, cashBalance, currentAccountBalance, creationDate }) => (
                        // console.log(description, order, cashBalance, currentAccountBalance)
                        <a href="#" className="list-group-item list-group-item-action">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">{ description }</h5>
                                <small className="text-body-secondary">{ formatDate(creationDate) }</small>
                            </div>
                            <p className="mb-1">Some placeholder content in a paragraph.</p>
                            <small className="text-body-secondary">And some muted small print.</small>

                            <br />
                            <button className='btn btn-sm btn-outline-primary'>
                                <i className='bx bx-edit-alt'></i>
                            </button>
                            <button className='btn btn-sm btn-outline-danger'>
                                <i className='bx bxs-trash-alt' ></i>
                            </button>
                        </a>
                    ))

                }
            </div>
        </>
    )
}
