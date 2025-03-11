const API_URL = import.meta.env.VITE_API_URL;

export const LoginUserApi = async (email, password) => {

    try 
    {
        const response = await fetch(`${ API_URL }/api/DomainServices/Login`, {
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

export const getSheetsAccountAPI = async (accountId) => {
    try
    {
        const response = await fetch(`${ API_URL }/api/DomainServices/GetSheetsAccount/${ accountId }`, {
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

    try 
    {
        const response = await fetch(`${ API_URL }/api/DomainServices/GetSheetCardsWithVignettes/${ sheetId }`, {
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
    try 
    {
        const response = await fetch( `${ API_URL }/api/DomainServices/DeleteCardWithVignettes/${ cardId }`, {
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
    try 
    {
        const response = await fetch(`${ API_URL }/api/DomainServices/UpdateVignetteAndRecalculateTotal`,{
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

    try 
    {
        const response = await fetch(`${ API_URL }/api/DomainServices/DeleteVignetteAndRecalculateTotal?vignetteId=${ vignetteId }`, {
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
    try 
    {
        const response = await fetch(`${ API_URL }/api/DomainServices/UpdateVignetteColorTheme?vignetteId=${ vignetteId }&colorTheme=${ color }`, {
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

export const GetUserAccountsWithSheetsFetch = async ( userId ) => {
    try
    {
        const response = await fetch(`${ API_URL }/api/DomainServices/GetUserAccountsWithSheets/${ userId }`, {
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


export const CreateSheetBackupFetch = async ( sheetId ) => {
    console.log(sheetId)
    const url = `${ API_URL }/api/DomainServices/CreateSheetBackup?sheetId=${sheetId}`;

    try {
        const response = await fetch(url, {
            method: 'post',
            headers: { 'Accept': "*/*" }
        });

        const data = await response.json();
        console.log(data)
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