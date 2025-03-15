const API_URL = import.meta.env.VITE_API_URL;

export const createCardFetch = async ( sheetId, title, description ) => {
    const body = {
        sheetId,
        title,
        description,
        color: 'DEFAULT'
    }

    try 
    {
        const response = await fetch(`${ API_URL }/api/Card/CreateCard`, {
            method: 'post', 
            headers: {
                'accept' : '*/*',
                'content-type' : 'application/json',
            }, 
            body: JSON.stringify( body )
        }); 

        const data = await response.json(); 
        return { isError: false, message: 'Carta creada correctamente.' }

    } 
    catch (error) 
    {
        return { isError: true, message: 'Ocurrió un error al intentar crear la carta.' }
    }
}

export const getCardBySheetIdFetch = async (sheetId) => {
    try 
    {
        const response = await fetch(`${ API_URL }/api/Card/GetCardBySheetId/${ sheetId }`, {
            headers: { 'accept' : 'text/plain' }
        });       

        const data = await response.json();

        return { isError: false, data }
    } 
    catch (error) 
    {
        return { isError: false, data: {} }
    }
}


export const updateCardFetch = async ( cardId, sheetId, title ) => {
    const url = `${ API_URL }/api/Card/UpdateCard`;
    
    try 
    {
        const response = await fetch(url, {
            method: 'put', 
            headers: { 'Accept': '*/*', 'Content-Type': 'Application/json' },
            body: JSON.stringify({
                id: cardId, 
                sheetId, 
                title, 
                description:'', 
                color: 'DEFAULT'
            })
        }); 

        const { resolution } = await response.json();

        return { isError: !resolution }
    } 
    catch (error) {
        return { isError: false }
    } 
}