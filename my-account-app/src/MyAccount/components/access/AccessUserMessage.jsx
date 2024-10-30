export const AccessUserMessage = ({ show = false, message = '', type = 'primary' }) => {

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
