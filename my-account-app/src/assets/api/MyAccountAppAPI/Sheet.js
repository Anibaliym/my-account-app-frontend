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

// export const updateSheetOrderItemsAPI = async (sheetsNewOrder) => {
//     try 
//     {
//         const response = await fetch( `${ API_URL }/api/Sheet/UpdateSheetOrderItems`, {
//             method: 'put', 
//             headers: {
//                 'Accept': 'application/json', 
//                 'Content-Type': 'application/json',
//             }, 
//             body: JSON.stringify(sheetsNewOrder)
//         }); 

//         console.log(response)

//         return { isError: false }
        
//     } 
//     catch (error) 
//     {
//         return { isError: true }
//     }    
// }


export const updateSheetOrderItemsAPI  = async(sheetOrderItems) => {
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
