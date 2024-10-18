import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../assets/context/AuthContext';

export const Header = ({ setToggleSidebar, toggleSidebar }) => {
    const navigate = useNavigate(); 
    const [isDarkMode, setIsDarkMode] = useState(false);
    const { user, logout } = useContext(AuthContext);

    useEffect(() => {
        const savedDarkMode = JSON.parse(localStorage.getItem('isDarkMode'));
        if (savedDarkMode !== null) {
            setIsDarkMode(savedDarkMode);
            document.body.classList.toggle('dark', savedDarkMode);
        }
    }, []);

    const toggleDarkMode = () => {
        const newDarkModeState = !isDarkMode;
        setIsDarkMode(newDarkModeState);
        document.body.classList.toggle('dark', newDarkModeState);
        localStorage.setItem('isDarkMode', JSON.stringify(newDarkModeState));
    };

    const onLogout = () => {
        logout(); 
        navigate('/access', {
            replace: true,
        });
    };

    const onToggleSidebar = () => {
        setToggleSidebar(!toggleSidebar); 
        console.log('debería collapsar los sub menús')
    };

    return (
        <header className="header">
            <button id="toggle-btn" className="toggle-btn" onClick={ onToggleSidebar }>☰</button>
            
            <div className="user-info">
                <span className="user-text">Anibal Yañez</span>

                <div className="sidebar-footer">
                    <div className="toggle-switch" onClick={toggleDarkMode}>
                        <span className="switch"></span>
                    </div>
                </div>

                <i className='bx bx-exit icon exit-icon' onClick={onLogout}></i>
            </div>
        </header>
    );
};
