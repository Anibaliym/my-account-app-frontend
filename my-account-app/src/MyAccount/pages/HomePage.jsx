import { useEffect } from 'react';

export const HomePage = ({ setPageName }) => {

    useEffect(() => {
        setPageName('INICIO'); 
    }, [])

    return (
        <>
            home page
        </>
    )
}
