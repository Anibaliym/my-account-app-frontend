import { useEffect } from 'react';

export const CalculatorPage = ({ setPageName }) => {

    useEffect(() => {
        setPageName('CALCULADORA'); 
    }, [])

    return (
        <>
            <p>Calculadora</p>
        </>
    )
}
