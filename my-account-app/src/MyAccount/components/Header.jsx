import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../assets/context/AuthContext';

export const Header = ({ setToggleSidebar, toggleSidebar, toggleDarkMode, setIsDarkMode, pageName }) => {
    const navigate = useNavigate(); 
    const { userAuth, logout } = useContext(AuthContext);
    const [ user, setUser ] = useState({}); 

    useEffect(() => {
        const savedDarkMode = JSON.parse(localStorage.getItem('isDarkMode'));
        const connectedUser = JSON.parse(localStorage.getItem('user'));

        if (savedDarkMode !== null) {
            setIsDarkMode(savedDarkMode);
            document.body.classList.toggle('dark', savedDarkMode);
        }

        setUser(connectedUser); 
        
    }, []);

    const onLogout = () => {
        logout(); 
        navigate('/access', {
            replace: true,
        });
    };

    const onToggleSidebar = () => setToggleSidebar(!toggleSidebar); 

    const { firstName, lastName } = user; 

    return (
        <header className="header">
            <button id="toggle-btn" className="toggle-btn" onClick={ onToggleSidebar }>
                ☰
                <span className="title-menu animate__animated animate__fadeIn animate__faster">{ pageName }</span>
            </button>

            <div className="user-info">
                <span className="user-text">{ `${ firstName } ${ lastName }` }</span>

                <div className="sidebar-footer">
                    <div className="toggle-switch" onClick={ toggleDarkMode }>
                        <span className="switch"></span>
                    </div>
                </div>

                <i className='bx bx-exit icon exit-icon' onClick={ onLogout }></i>
            </div>
        </header>
    );
};
