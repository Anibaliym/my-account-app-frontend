const API_URL = import.meta.env.VITE_API_URL;

export const createAccountFetch = async ( userId, description ) => {
    const url = `${ API_URL }/api/Account/CreateAccount`; 

    try 
    {
        const response = await fetch(url, {
            method: 'post', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({ userId, description })
        });     

        const { resolution, data, message } = await response.json();
        return { isError: false, resolution, message, data }; 
    } 
    catch (error) 
    {
        return { isError: true }; 
    }
}

export const updateAccountFetch = async ( accountId, description ) => {
    const url = `${ API_URL }/api/Account/UpdateAccount`;    

    try 
    {
        const response = await fetch(url, {
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

export const deleteAccountFetch = async ( accountId ) => {
    const url = `${ API_URL }/api/Account/DeleteAccount?id=${ accountId }`;

    try 
    {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: { 'Accept': '*/*', },
        });
  
        const { resolution, message } = await response.json(); // Si hay un cuerpo JSON en la respuesta
         
        return { isError : false, resolution, message }
    } 
    catch (error) 
    {
        return { isError : true }
    }
}

export const updateAccountOrderItemsFetch = async ( accountsNewOrder ) => {
    const url = `${ API_URL }/api/Account/UpdateAccountOrderItems`;

    try 
    {
        const responde = await fetch(url, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(accountsNewOrder)
        });
        
        const { resolution } = await responde.json();
        return { isError : !resolution }

    } 
    catch (error) {
        return { isError : true }
    }
}