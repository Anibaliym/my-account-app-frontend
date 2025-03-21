import { useState, useEffect } from 'react';
import '/src/assets/css/Access.css';
import '/src/assets/css/Global.css';
import { FormLogin } from '../components/access/FormLogin';
import { UserMessage } from '../components/UserMessage';
import { FormRegister } from '../components/access/FormRegister';
import { Link, Tooltip } from '@nextui-org/react';
export const AccessPage = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [message, setMessage] = useState({ message: '', type: 'info' });
    const [toggleForm, setToggleForm] = useState(true); 
    const [showMessage, setShowMessage] = useState(false);
    const [userName, setUserName] = useState('');
    
    const showUserMessage = (message, type = 'info') => {
        const validTypes = ['success', 'info', 'warning', 'error'];
        setMessage({ message, type: validTypes.includes(type) ? type : 'info' });
        setShowMessage(true);
    };

    const toggleDarkMode = () => {
        const newDarkModeState = !isDarkMode;
        setIsDarkMode(newDarkModeState);
        document.body.classList.toggle('dark', newDarkModeState);
        localStorage.setItem('isDarkMode', JSON.stringify(newDarkModeState));
    };

    useEffect(() => {
        const savedDarkMode = JSON.parse(localStorage.getItem('isDarkMode'));

        if (savedDarkMode !== null) {
            setIsDarkMode(savedDarkMode);
            document.body.classList.toggle('dark', savedDarkMode);
        }
    }, []);

    return (
        <div className="access-container animate__animated animate__fadeIn">
            <div className="access-login-form">
                <div className="toggle-switch mb-5" onClick={ toggleDarkMode }>
                    <span className="switch"></span>
                </div>

                {
                    (toggleForm)
                    ? (<FormLogin userName={ userName } setUserName={ setUserName } toggleForm={ toggleForm } setToggleForm={ setToggleForm } showUserMessage={ showUserMessage }/>)
                    : (<FormRegister setUserName={ setUserName } toggleForm={ toggleForm } setToggleForm={ setToggleForm } showUserMessage={ showUserMessage }/>)
                }
                
                <UserMessage message={message}  show={showMessage}  setShowMessage={setShowMessage}  isDarkMode={isDarkMode} />
            </div>

            <div className="access-presentation d-flex flex-column justify-content-start text-white px-4 pt-2 position-relative">
                <h1 className="display-1 text-end mb-5">MI CUENTA</h1>

                <div className="ml-20">
                    <h2 className="lead fs-2 mb-3">Lleva el control total de tus finanzas</h2>
                    <p className="fs-5 mb-3">
                        Aplicación diseñada para facilitarte ayuda en el control de tus gastos y/o planificaciones.
                    </p>
                    
                    <ul className="list-unstyled fs-5 mb-3">
                        <li className="ml-5"><i className='bx bxs-hand-right'></i> Registra tus ingresos, gastos, movimientos y planifica.</li>
                        <li className="ml-5"><i className='bx bxs-hand-right'></i> Genera reportes personalizados que te muestran claramente en qué se va a mover tu dinero.</li>
                        <li className="ml-5"><i className='bx bxs-hand-right'></i> Establece metas de ahorro y monitorea tu progreso sin complicaciones.</li>
                        <li className="ml-5"><i className='bx bxs-hand-right'></i> Accede desde cualquier dispositivo, con una experiencia rápida y segura.</li>
                    </ul>
                    
                    <p className="lead fs-5 mt-5">
                        No dejes que tus finanzas te controlen.<br />
                        Toma el control y empieza a ahorrar de verdad con MI CUENTA.
                    </p>
                </div>

                <div className="promo-text position-absolute">
                    <Tooltip 
                        content={
                            <div style={{ textAlign:'center', lineHeight: '3px' }}>
                                <p className="text-color-default mt-4">¿Que quien soy yo?</p>
                                <p className="text-color-default">¿Tienes una idea en mente?</p>
                                <p className="text-color-default">¿Te ayudo?</p>
                                <p className="text-color-default fs-3 mt-5 mb-4">🚀</p>
                            </div>
                        } 
                        placement="up"
                        closeDelay={ 400 }
                    >
                        <Link 
                            isBlock 
                            size="sm"
                            showAnchorIcon 
                            color="danger"
                            className="ml-1 mt-2 cursor-pointer link-white" 
                            onClick={() => {}}
                            >
                            ANIBAL YAÑEZ
                        </Link> 
                    </Tooltip> 
                </div>
            </div>
      </div>
    );
};