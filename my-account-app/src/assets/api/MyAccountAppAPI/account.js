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

export const CreateAccountAPI = async ( userId, description ) => {
    try 
    {
        const response = await fetch( `${ API_URL }/api/Account/CreateAccount`, {
            method: 'post', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({ userId, description })
        });     

        const { resolution } = await response.json();

        return { isError: !resolution }; 
    } 
    catch (error) 
    {
        return { isError: true }; 
    }
}


export const UpdateAccountAPI = async ( accountId, description ) => {
    try 
    {
        const response = await fetch( `${ API_URL }/api/Account/UpdateAccount`, {
            method: 'put', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({ id: accountId, description })
        } ); 

        const data = await response.json()

        return { isError: false }
    } 
    catch (error) 
    {
        return { isError: true }
    }
}

export const DeleteAccountAPI = async ( accountId ) => {

    try 
    {
        const response = await fetch(`${ API_URL }/api/Account/DeleteAccount?id=${ accountId }`, {
            method: 'DELETE',
            headers: { 'Accept': '*/*', },
        });
  
        const { resolution, message } = await response.json(); // Si hay un cuerpo JSON en la respuesta
         
        return { 
            isError : !resolution, 
            message
        }
    } 
    catch (error) 
    {
        console.error('Error al eliminar la cuenta:', error);
        return { isError : true }
    }
}
