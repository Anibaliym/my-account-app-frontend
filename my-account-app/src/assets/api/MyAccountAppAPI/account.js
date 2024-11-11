const API_URL = import.meta.env.VITE_API_URL;

export const getActiveAccountByIdAPI = async ( accountId ) => {
    try 
    { 
        const response = await fetch(`${ API_URL }/api/Account/GetActiveAccountById/${ accountId }`, {
            method: 'get',
            headers: { 'Accept': 'text/plain' }, 
        }); 

        const data = await response.json();

        return {
            isError: false, 
            description: data.description, 
            creationDate: data.creationDate
        }
    }
    catch(error)
    {
        return {
            isError: true, 
            description: '', 
            creationDate: ''
        }
    }
}

export const GetUserAccountsWithSheetsAPI = async ( userId ) => {

    try
    {
        const response = await fetch(`${ API_URL }/api/DomainServices/GetUserAccountsWithSheets/${ userId }`, {
            method: 'GET',
            headers: { 'Accept': 'application/json' }            
        });

        const data = await response.json();
         
        return {
            isError: false, 
            data
        };
    }
    catch (error)
    {
        return {
            isError: true, 
            data: {}
        };
    }
}