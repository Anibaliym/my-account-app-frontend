import { useState, useEffect } from 'react';
import '/src/assets/css/Access.css';
import '/src/assets/css/Global.css';
import { FormLogin } from '../components/access/FormLogin';
import { UserMessage } from '../components/UserMessage';
import { FormRegister } from '../components/access/FormRegister';

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

            <div className="access-presentation">
                <h1 className="display-1">MI CUENTA</h1>
            </div> 
        </div>
    );
};