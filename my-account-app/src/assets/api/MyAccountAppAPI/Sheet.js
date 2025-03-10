const API_URL = import.meta.env.VITE_API_URL;

export const createSheetAPI = async (accountId, description) => {
    let responseMessage = '';

    const payload = {
        accountId: accountId,
        description: description
    };

    try {
        const response = await fetch(`${ API_URL }/api/Sheet/CreateSheet`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const { data, errors, message, resolution } = await response.json();

        if(!resolution) {
            if(errors[0].includes('al menos 3 caracteres')) 
                responseMessage = 'El nombre de la hoja de cálculo, debe contener al menos 3 carácteres!'; 
        }

        return {
            isError: !resolution, 
            message: responseMessage
        };

    } 
    catch (error) 
    {
        return {
            isError: true, 
            message: `Ocurrio un error al intentar crear la hoja de cálculo. Mas detalles: ${ error }`, 
            data: null
        };
    }
}


export const deleteSheetAPI = async (sheetId) => {

    try {
        const response = await fetch(`${ API_URL }/api/Sheet/DeleteSheet?id=${ sheetId }`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json'
            }
        });

        const { resolution, message, errors } = await response.json();

        return { isError: false,  resolution,  message,  errors };
    } 
    catch (error) {
        return {
            isError: true, 
            message: 'Ocurrió un error al intentare eliminar la hoja de cálculo' 
        };
    }
}

export const updateSheetAPI = async ( accountId, sheetId, description, cashBalance, currentAccountBalance, order ) => {

    try 
    {
        const response = await fetch(`${ API_URL }/api/Sheet/UpdateSheet`, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                id: sheetId,
                accountId, 
                description, 
                cashBalance, 
                currentAccountBalance, 
                Order: order
            })
        
        });
        const { resolution, message, data } = await response.json();
        
        return { 
            isError: false, 
            resolution, 
            message, 
            data 
        };
    } 
    catch (error) {
        return { isError: true, };
    }
}

export const GetSheetByAccountIdAPI = async ( accountId ) => {
    try 
    {
        const response = await fetch(`${ API_URL }/api/Sheet/GetSheetByAccountId/${ accountId }`, {
            'Accept': 'application/json'
        }); 

        const responseJSON = await response.json();

        return {
            isError: false, 
            data: responseJSON
        }
    }
    catch (error) 
    {
        return {
            isError: true, 
            data: []
        }
    }
}

export const updateSheetOrderItemsAPI  = async(sheetOrderItems) => {

    console.log(sheetOrderItems)
    try 
    {
        const response = await fetch( `${ API_URL }/api/Sheet/UpdateSheetOrderItems` , {
            method: "PUT", // Método HTTP PUT
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sheetOrderItems) // Convertir el cuerpo de la solicitud a JSON
        });

        if (!response.ok)
            throw new Error(`HTTP error! Status: ${response.status}`);


        const { resolution } = await response.json(); // Parsear el JSON de la respuesta
        return { isError: !resolution }
    } 
    catch (error) 
    {

        return { isError: true }
    }
}

export const GetSheetByIdAsync = async ( sheetId ) => {

    try 
    {
        const response = await fetch( `${ API_URL }/api/Sheet/GetSheetById/${ sheetId }`, {
            method: 'get', 
            headers: { 'accept': 'text/plain' }
        });     
        
        const data = await response.json();

        return { isError: false, data: data }

    } 
    catch (error) 
    {
        return { isError: true, data: { } }
        
    }

}

export const UpdateCashBalanceAPI = async ( sheetId, cashBalance ) => {

    try 
    {
        const response = await fetch( `${ API_URL }/api/Sheet/UpdateCashBalance/${ sheetId }`, {
            method: 'patch', 
            headers: {
                'accept': '*/*', 
                'content-type': 'application/json',
            }, 
            body: JSON.stringify( cashBalance )
        });     

        const { resolution } = await response.json();

        return { isError: !resolution }; 
    } 
    catch (error) 
    {
        return { isError: true }; 
    }
}


export const UpdateCurrentAccountBalanceAPI = async ( sheetId, currentAccountBalance ) => {

    try 
    {
        const response = await fetch( `${ API_URL }/api/Sheet/UpdateCurrenteAccountBalance/${ sheetId }`, {
            method: 'patch', 
            headers: {
                'accept': '*/*', 
                'content-type': 'application/json',
            }, 
            body: JSON.stringify( currentAccountBalance )
        });     

        const { resolution } = await response.json();

        return { isError: !resolution }; 
    } 
    catch (error) 
    {
        return { isError: true }; 
    }
}


