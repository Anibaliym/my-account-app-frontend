const API_URL = 'http://localhost:5215/api/Account'; 

export const getActiveAccountByIdAPI = async ( accountId ) => {
    try 
    { 
        const response = await fetch(`${ API_URL }/GetActiveAccountById/${ accountId }`, {
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