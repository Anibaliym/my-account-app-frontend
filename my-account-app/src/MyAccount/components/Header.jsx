import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../assets/context/AuthContext';
import { capitalizeWords } from '../../assets/utilities/stringFormar';

export const Header = ({ setToggleSidebar, toggleSidebar, toggleDarkMode, setIsDarkMode, pageName }) => {

    const navigate = useNavigate(); 
    const { logout } = useContext(AuthContext);
    const [user, setUser] = useState(null); 
    const [firstName, setFirstName] = useState(''); 
    const [lastName, setLastName] = useState(''); 

    useEffect(() => {
        const savedDarkMode = JSON.parse(localStorage.getItem('isDarkMode'));
        const connectedUser = JSON.parse(localStorage.getItem('user'));
    
        if (savedDarkMode !== null) {
            setIsDarkMode(savedDarkMode);
            document.body.classList.toggle('dark', savedDarkMode);
        }
    
        if (connectedUser) {
            setUser(connectedUser); 
        }
    }, []);
    
    useEffect(() => {
        if (user) {
            setFirstName(user.firstName ? capitalizeWords(user.firstName) : ''); 
            setLastName(user.lastName ? capitalizeWords(user.lastName) : '');
        }

    }, [user]);
    
    const onLogout = () => {
        logout(); 
        navigate('/access', { replace: true });
    };

    const onToggleSidebar = () => setToggleSidebar(!toggleSidebar); 

    return (
        <header className="header">
            <div className="left-header">
                <button id="toggle-btn" className="toggle-btn" onClick={onToggleSidebar}>
                    <i className="bx bx-menu"></i>
                </button>
                <span className="title-menu lead">{pageName}</span>
            </div>

            <div className="user-info">
                <span className="user-text">{ `${ firstName } ${ lastName }` }</span>

                <div className="toggle-switch" onClick={ toggleDarkMode }>
                    <span className="switch"></span>
                </div>

                <i className='bx bx-exit icon exit-icon' onClick={ onLogout }></i>
            </div>
        </header>
    );
};