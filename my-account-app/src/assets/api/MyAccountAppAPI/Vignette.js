const API_URL = import.meta.env.VITE_API_URL;

export const createVignetteFetch = async ( cardId, order ) => {
    const url = `${ API_URL }/api/Vignette/CreateVignette`;

    const body = {
        cardId, 
        description: '', 
        amount: 0, 
        color: 'DEFAULT',
        order
    };

    try 
    {
        const response = await fetch(url, {
            method: 'post', 
            headers: {
                "accept": "*/*", 
                "content-type": "application/json",
            }, 
            body: JSON.stringify( body )
        });     

        const { data, resolution, message} = await response.json();
        return { isError: !resolution, message, data}
    } 
    catch (error) 
    {
        return { isError: true }
    }
}

export const getVignetteByCardIdFetch = async ( cardId ) => {
    const url = `${ API_URL }/api/Vignette/GetVignetteByCardId/${ cardId }`;

    try 
    {
        const response = await fetch(url, {
            method: 'get', 
            headers: { 'accept' : 'text/plain' }
        });     

        const data = await response.json(); 

        return { isError: false, data }
    } 
    catch (error) 
    {
        return { isError: false, data: null }
    }
}

export const updateVignetteOrderItemsFetch = async ( vignettes ) => {
    const url = `${ API_URL }/api/Vignette/UpdateVignetteOrderItems`;

    try 
    {
        const response = await fetch(url,{
            method: 'put', 
            headers: {
                'accept': '*/*', 
                'content-type': 'application/json',
            },
            body: JSON.stringify( vignettes ),
        });       

        return { isError: false }; 
    } 
    catch (error) {
        return { isError: true }; 
    }
}