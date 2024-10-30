import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PageTitle } from '../components/PageTitle'; 
import { getActiveAccountByIdAPI } from '../../assets/api/MyAccountAppAPI/account';
import { formatDate } from '../../assets/utilities/DateFormater';

export const AccountPage = () => {
    const { accountId } = useParams(); 

    const [ account, setAccount ] = useState({ description : 'Cuenta', creationDate: '' }); 

    useEffect(() => {
        getActiveAccountById();
    }, [accountId])
    
    const getActiveAccountById  = async () => {
        const { isError, description, creationDate } = await getActiveAccountByIdAPI( accountId ); 

        setAccount({ description, creationDate }); 

    }

    const { description, creationDate } = account; 

    return (
        <>
            <PageTitle titleDescription={ description } />
            <p>fecha de creación: { formatDate(creationDate) }</p>
        </>
    )
}
