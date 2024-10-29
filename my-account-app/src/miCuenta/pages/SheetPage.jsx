import { useParams } from 'react-router-dom';
import { PageTitle } from '../components/PageTitle'; 

export const SheetPage = () => {
    const { id } = useParams();

    console.log(id); 
    return (
        <>
            <PageTitle titleDescription="Hoja de calculo" />
       </>
    )
}
