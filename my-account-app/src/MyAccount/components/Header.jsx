import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { capitalizeWords } from '../../assets/utilities/stringFormar';
import { AuthContext } from '../../assets/context/AuthProvider';
import { ThemeContext } from '../../assets/context/ThemeProvider';
import { ToggleTheme } from './ui/ToggleTheme';

export const Header = ({ setToggleSidebar, toggleSidebar, pageName }) => {
    const { toggleTheme } = useContext(ThemeContext);

    const navigate = useNavigate();
    const { Logout } = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    // Guarda el estado de toggleSidebar en localStorage cuando cambia
    useEffect(() => {
        localStorage.setItem('my-account-isSidebarToggleCollapsed', JSON.stringify(toggleSidebar));
    }, [toggleSidebar]);


    useEffect(() => {
        const savedDarkMode = JSON.parse(localStorage.getItem('my-account-isDarkMode'));
        const connectedUser = JSON.parse(localStorage.getItem('my-account-user'));

        if (savedDarkMode !== null) {
            toggleTheme();
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

    const onToggleSidebar = () => setToggleSidebar(!toggleSidebar);

    const onLogout = () => {
        Logout();
        navigate('/access', { replace: true });
    };

    return (
        <header className="header">
            <div className="left-header">
                <button id="toggle-btn" className="toggle-btn" onClick={onToggleSidebar}>
                    <i className={`bx ${(toggleSidebar) ? 'bx-menu' : 'bx-x'} header-toggle-menu animate__animated animate__fadeIn`}></i>
                </button>

                {/* <span className="header-title-menu lead animate__animated animate__fadeIn">{pageName}</span> */}
            </div>

            <div className="user-info">
                <span className="user-text">{`${firstName} ${lastName}`}</span>

                <ToggleTheme />
                <i className='bx bx-exit icon exit-icon' onClick={onLogout}></i>
            </div>
        </header>
    );
};