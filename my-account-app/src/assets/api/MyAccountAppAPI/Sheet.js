const API_URL = import.meta.env.VITE_API_URL;

export const createSheetFetch = async (accountId, description) => {
    const url = `${ API_URL }/api/Sheet/CreateSheet`;

    const payload = {
        accountId: accountId,
        description: description
    };

    try {
        const response = await fetch(url, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const { message, resolution } = await response.json();

        return { isError: false, message, resolution };
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

export const deleteSheetFetch = async (sheetId) => {
    const url = `${ API_URL }/api/Sheet/DeleteSheet?id=${ sheetId }`;

    try {
        const response = await fetch(url, {
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

export const updateSheetFetch = async ( accountId, sheetId, description, cashBalance, currentAccountBalance, order ) => {
    const url = `${ API_URL }/api/Sheet/UpdateSheet`;

    try 
    {
        const response = await fetch(url, {
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

export const updateSheetOrderItemsFetch = async(sheetOrderItems) => {
    const url = `${ API_URL }/api/Sheet/UpdateSheetOrderItems`;

    try 
    {
        const response = await fetch(url , {
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

export const getSheetByIdFetch = async ( sheetId ) => {
    const url = `${ API_URL }/api/Sheet/GetSheetById/${ sheetId }`;

    try 
    {
        const response = await fetch(url, {
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

export const updateCashBalanceFetch = async ( sheetId, cashBalance ) => {
    const url = `${ API_URL }/api/Sheet/UpdateCashBalance/${ sheetId }`;

    try 
    {
        const response = await fetch(url, {
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


export const updateCurrentAccountBalanceFetch = async ( sheetId, currentAccountBalance ) => {
    const url = `${ API_URL }/api/Sheet/UpdateCurrenteAccountBalance/${ sheetId }`;

    try 
    {
        const response = await fetch(url, {
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


