import { useParams } from 'react-router-dom';
import { PageTitle } from '../components/PageTitle'; 

export const SheetPage = () => {
    const { id } = useParams();

    return (
        <>
            <PageTitle titleDescription="Hoja de calculo" />
            <p>{ `sheetId: ${ id }` }</p>
       </>
    )
}
