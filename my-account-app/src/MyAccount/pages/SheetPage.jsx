import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { GetSheetByIdAsync } from '../../assets/api/MyAccountAppAPI/Sheet';
import { CardCashBalance } from '../components/sheet/CardCashBalance';
import { CardCurrentAccountBalance } from '../components/sheet/CardCurrentAccountBalance';


export const SheetPage = ({ setPageName }) => {
    const { sheetId } = useParams(); // Obtener el ID de los parámetros
    const [ sheet, setSheet ] = useState(null); // Estado para almacenar el objeto sheet
    const [ isLoading, setIsLoading ] = useState(true); // Estado para manejar la carga

    const fetchSheet = async () => {
        try 
        {
            // const data = await GetSheetByIdAsync(sheetId); // Llamada a la API
            const { isError, data } = await GetSheetByIdAsync(sheetId); // Llamada a la API

            const { description } = await data; 
            setPageName(description)

            if(isError){
                console.log('Ocurrió un error al intentar cargar la hoja de cálculo.')
                return; 
            }

            setSheet(data); // Actualizar el estado con el objeto sheet
        } 
        catch (error) 
        {
            console.error("Error fetching sheet:", error);
        } 
        finally 
        {
            setIsLoading(false); // Finalizar la carga
        }
    };

    useEffect(() => {
        fetchSheet();
    }, [ sheetId ]); 

    return (
        <>
            {
                isLoading 
                    ? ( <p>Loading...</p>) 
                    : 
                    ( 
                        <div>
                            <CardCashBalance sheet={ sheet } /> 
                            <CardCurrentAccountBalance sheet={ sheet } /> 

                        </div>
                        
                    )
            }
        </>
    );
};