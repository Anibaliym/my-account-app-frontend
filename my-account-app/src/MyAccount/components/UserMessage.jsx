import { useEffect, useState } from 'react';

export const UserMessage = ({ message, show, type, setShowMessage, isDarkMode }) => {
    const [ isVisible, setIsVisible ] = useState(show);

    const getMessageTime = (length) => {
        if (length >= 100) return 10000;
        if (length >= 50) return 6000;
        return 4000;
    };

    const messageTime = getMessageTime(message.length);
    const effect = show ? 'animate__flipInX' : 'animate__flipOutX';

    useEffect(() => {
        if (show) {
            setIsVisible(true); // Asegura que el componente esté visible en el DOM
            const timer = setTimeout(() => {
                setShowMessage(false); // Cambia `show` a `false` para activar la animación de salida
            }, messageTime);

            return () => clearTimeout(timer);
        } else if (isVisible) {
            // Espera el tiempo de la animación de salida antes de ocultar el componente completamente
            const hideTimer = setTimeout(() => {
                setIsVisible(false);
            }, 500); // Ajusta el tiempo de espera según la duración de `animate__fadeOutUp`

            return () => clearTimeout(hideTimer);
        }
    }, [show, messageTime, setShowMessage, isVisible]);

    let colorType = ''; 

    switch (type) {
        case 'success':
            colorType = 'success';
            break;
        case 'warning':
            colorType = 'warning';
            break;
        case 'danger':
            colorType = 'danger';
            break;
        default:
            colorType = 'info';
            colorType = 'success';
            break;
    }
    if (!isVisible) return null;

    

    const alertClass = `alert-box-message message-${ colorType }${ (isDarkMode) ? '-dark' : '' } animate__animated ${effect} animate__faster`;

    return (

        <div className={alertClass}>

            {/* info */}
            <i className="bx bx-message-rounded-error" ></i>

            {/* success */}
            <i className="bx bx-check-circle" ></i>

            {/* warning */}
            <i className="bx bx-error"></i>

            {/* danger */}
            <i className="bx bx-error-circle"></i>

            <span className="ml-1">{message}</span>
            
        </div>
    );
};
