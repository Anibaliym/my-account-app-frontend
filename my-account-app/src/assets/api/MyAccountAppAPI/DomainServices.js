const API_URL = import.meta.env.VITE_API_URL;

export const loginUserFetch = async (email, password) => {
    const url = `${ API_URL }/api/DomainServices/Login`;

    try 
    {
        const response = await fetch(url, {
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

export const getSheetsAccountFetch = async (accountId) => {
    const url = `${ API_URL }/api/DomainServices/GetSheetsAccount/${ accountId }`;

    try
    {
        const response = await fetch(url, {
            method: 'get', 
            headers: { 'Accept' : 'text/plain' }, 
        }); 

        const { resolution, data } = await response.json();

        if(resolution){
            return {
                isError: false, 
                data 
            }
        }
        else {
            return {
                isError: true, 
                message: 'Ha ocurrido un error al intentar cargar la información de la cuenta.', 
                data : [], 
            }
        }
    }
    catch(error) {
        return {
            isError: true, 
            message: `Ha ocurrido un error al intentar cargar la información de la cuenta. Mas información: ${error}`, 
            data : [], 
        }
    }
}

export const getSheetCardsWithVignettesFetch = async ( sheetId ) => {
    const url = `${ API_URL }/api/DomainServices/GetSheetCardsWithVignettes/${ sheetId }`;

    try 
    {
        const response = await fetch(url, {
            headers: { 'accept': 'text/plain' }, 
        });    

        const { data } = await response.json();
        return { isError: false, data: data.cards }; 
    } 
    catch (error) 
    {
        return { isError: true }
    }
}

export const deleteCardWithVignettesFetch = async ( cardId ) => {
    const url = `${ API_URL }/api/DomainServices/DeleteCardWithVignettes/${ cardId }`;

    try 
    {
        const response = await fetch(url, {
            method: 'delete', 
            headers: { 'accept' : '*/*' }
        } );   

        const data = await response.json(); 

        return { isError: false, data }
    } 
    catch (error) 
    {
        return { isError: true, data: null }
    }
}

export const updateVignetteAndRecalculateTotalFetch = async ( vignette ) => {
    const url = `${ API_URL }/api/DomainServices/UpdateVignetteAndRecalculateTotal`;

    try 
    {
        const response = await fetch(url,{
            method : 'put', 
            headers: { 
                'Content-Type': 'application/json', 
                'accept' : '*/*',
            },
            body: JSON.stringify(vignette),
        });

        const { data } = await response.json();
        return { isError: !response.ok, data }
    } 
    catch (error) {
        return { isError: true, data: null }
    }
}

export const deleteVignetteAndRecalculateTotalFetch = async ( vignetteId ) => {
    const url = `${ API_URL }/api/DomainServices/DeleteVignetteAndRecalculateTotal?vignetteId=${ vignetteId }`;

    try 
    {
        const response = await fetch(url, {
            method: 'delete', 
            headers: { 'accept' : '*/*' }
        });

        const data = await response.json();

        return { isError: false, data }
    } 
    catch (error) {
        return { isError: true, data: null }
    }
}

export const updateVignetteColorThemeFetch = async ( vignetteId, color ) => {
    const url = `${ API_URL }/api/DomainServices/UpdateVignetteColorTheme?vignetteId=${ vignetteId }&colorTheme=${ color }`; 

    try 
    {
        const response = await fetch(url, {
            method: 'put', 
            headers: { 'accept' : '*/*' }
        }); 

        const { resolution } = await response.json();

        return { isError: !resolution }
    } 
    catch (error) {
        return { isError: true }
    }

} 

export const getUserAccountsWithSheetsFetch = async ( userId ) => {
    const url = `${ API_URL }/api/DomainServices/GetUserAccountsWithSheets/${ userId }`;
    
    try
    {
        const response = await fetch(url, {
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

export const createSheetBackupFetch = async ( sheetId ) => {
    const url = `${ API_URL }/api/DomainServices/CreateSheetBackup?sheetId=${sheetId}`;

    try {
        const response = await fetch(url, {
            method: 'post',
            headers: { 'Accept': "*/*" }
        });

        const data = await response.json();

        return { isError: false }; 
    } catch (error) {
        return { isError: true }; 
    }
}

export const deleteSheetWithContentsFetch = async ( sheetId ) => {
    const url = `${API_URL}/api/DomainServices/DeleteSheetWithContents?sheetId=${sheetId}`;

    try 
    {
        const response = await fetch(url, {
            method: 'delete', 
            headers: { 'Accept': "*/*" }
        });

        const data = await response.json();

        return { isError: false }
    } 
    catch (error) {
        return { isError: true }
    }
}

export const deleteUserAccountFetch = async ( userId, password ) => {
    const url = `${ API_URL }/api/DomainServices/DeleteUserAccount`; 

    try 
    {
        const response = await fetch(url, {
            method: 'delete', 
            headers: { 
                'accept' : '*/*',
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({ userId, password })
        })

        const { resolution, message, errors } = await response.json();

        return { isError: false, resolution, message, errors }
    } 
    catch (error) 
    {
        return { isError: true }
    }
}