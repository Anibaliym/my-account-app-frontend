const API_URL = import.meta.env.VITE_API_URL;

export const CreateVignetteFetch = async ( cardId, order ) => {

    const body = {
        cardId, 
        description: '', 
        amount: 0, 
        color: 'WHITE',
        order
    };

    try 
    {
        const response = await fetch(`${ API_URL }/api/Vignette/CreateVignette`, {
            method: 'post', 
            headers: {
                'accept': '*/*', 
                'constent-type': 'application/json', 
            }, 
            body: JSON.stringify( body )
        });     

        const data = await response.json();

        return { isError: false }
    } 
    catch (error) 
    {
        return { isError: true }
    }
}