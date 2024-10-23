// import { useState } from 'react';

export const AccessUserMessage = ({ show = false, message = '', type = 'primary' }) => {

    // const [ isMessageShowed, setIsMessageShowed] = useState(show); 

    // setTimeout(() => {
    //     setIsMessageShowed(false); 
    //     console.log('asa')
    // }, 2000);

    return (
        <p
            className={ 
                `text-${ type } 
                animate__animated 
                ${ (show) ? 'animate__fadeInDown' : 'animate__fadeOutDown' } 
                animate__faster` }
        >
            { message }
        </p>        
        
    )
}
