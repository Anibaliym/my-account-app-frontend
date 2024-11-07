import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

export const SheetPage = ({ setPageName }) => {
    const { id } = useParams();

    useEffect(() => {
        setPageName('HOJA DE CALCULO'); 
    }, [])

    return (
        <>
            <p>{ `sheetId: ${ id }` }</p>
       </>
    )
}
