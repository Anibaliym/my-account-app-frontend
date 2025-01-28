import { useEffect, useState } from 'react';

export const UserMessage = ({ message, show, setShowMessage, isDarkMode }) => {
    const [ isVisible, setIsVisible ] = useState(show);

    const getMessageTime = (length) => {
        if (length >= 100) return 10000;
        if (length >= 50) return 6000;
        return 4000;
    };

    const messageTime = getMessageTime(message.message.length);
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
    }, [ show, messageTime, setShowMessage, isVisible ]);

    let colorType = ''; 
    let icon = '';

    switch (message.type) {
        case 'success':
            colorType = 'success';
            icon = 'bx-check-circle';
            break;
        case 'warning':
            colorType = 'warning';
            icon = 'bx-error';
            break;
        case 'error':
            colorType = 'danger';
            icon = 'bx-error-circle';
            break;
        default:
            colorType = 'info';
            icon = 'bx-message-rounded-error';
            break;
    }
    
    if (!isVisible) return null;

    const alertClass = `alert-box-message message-${ colorType }${ (isDarkMode) ? '-dark' : '' } animate__animated ${effect} animate__faster`;

    return (
        <div className={ `${ alertClass }` }>
            <i className={ `bx ${ icon }` } ></i>
            <span className="ml-1">{ message.message }</span>
        </div>
    );
};
