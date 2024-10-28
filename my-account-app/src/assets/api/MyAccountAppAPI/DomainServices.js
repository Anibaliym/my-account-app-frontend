const API_URL = 'http://localhost:5215/api/DomainServices';

export const LoginUserApi = async (email, password) => {
    
    try 
    {
        const response = await fetch(`${ API_URL }/Login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password })
        });

        if(response.status === 200 || response.status === 401){
            const responseDataParse = await response.json();

            return {
                isError: false, 
                message: '', 
                data: responseDataParse
            };
        }
        else 
        {
            return {
                isError: false, 
                message: 'Ocurrió un error al intentar contactar con el servidor.', 
                data: {}
            };
        }
    } catch (error) {
        return {
            isError: true, 
            message: 'Ocurrió un error inesperado.',             
            data: {}
        };
    }
};