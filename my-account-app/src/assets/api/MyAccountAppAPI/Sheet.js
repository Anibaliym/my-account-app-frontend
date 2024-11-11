const API_URL = import.meta.env.VITE_API_URL;


export const createSheetAPI = async (accountId, description) => {

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

        return {
            isError: false, 
            message: '' 
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

        return {
            isError: !resolution, 
            message, 
            errors
        };
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

        const { resolution } = await response.json();
        
        return {
            isError: !resolution, 
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