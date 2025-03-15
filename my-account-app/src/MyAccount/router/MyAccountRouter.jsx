import { useState, useEffect } from 'react';
import { Sidebar } from '../components/sidebar/Sidebar';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ProfilePage } from '../pages/ProfilePage';
import { HomePage } from '../pages/HomePage';
import { AdminPage } from '../pages/AdminPage';
import { Header } from '../components/Header';
import { SheetPage } from '../pages/SheetPage';
import { UserMessage } from '../components/UserMessage';
import { ModalInfo } from '../components/modal/ModalInfo';
import { AccountsPage } from '../pages/AccountsPage';
import '/src/assets/css/Home.css';
import '/src/assets/css/Controls.css';
import '/src/assets/css/Cards.css';
import '/src/assets/css/sheet.css';
import '/src/assets/css/Accounts.css';

export const MyAccountRouter = () => {

    // Estado inicial de toggleSidebar obteniendo el valor de localStorage
    const [ toggleSidebar, setToggleSidebar ] = useState(() => {
        const storedValue = localStorage.getItem('isSidebarToggleCollapsed');
        return storedValue !== null ? JSON.parse(storedValue) : false;
    });

    const [ isDarkMode, setIsDarkMode ] = useState(false);
    const [ accountListener, setAccountListener ] = useState(0);
    const [ pageName, setPageName ] = useState('Nombre página');
    const [ message, setMessage ] = useState({ message: '', type: 'info' });
    const [ showMessage, setShowMessage ] = useState(false);
    const [ modalMessage, setModalMessage ] = useState('');

    // Guarda el estado de toggleSidebar en localStorage cuando cambia
    useEffect(() => {
        localStorage.setItem('isSidebarToggleCollapsed', JSON.stringify(toggleSidebar));
    }, [toggleSidebar]);

    // Inicializa el modo oscuro desde localStorage
    useEffect(() => {
        const savedDarkMode = localStorage.getItem('isDarkMode');
        if (savedDarkMode !== null) {
            setIsDarkMode(JSON.parse(savedDarkMode));
            document.body.classList.toggle('dark', JSON.parse(savedDarkMode));
        }
    }, []);

    // Alternar el modo oscuro y guardarlo en localStorage
    const toggleDarkMode = () => {
        const newDarkModeState = !isDarkMode;
        setIsDarkMode(newDarkModeState);
        document.body.classList.toggle('dark', newDarkModeState);
        localStorage.setItem('isDarkMode', JSON.stringify(newDarkModeState));
    };

    const showUserMessage = (message, type = 'info') => {
        const validTypes = ['success', 'info', 'warning', 'error'];
        setMessage({ message, type: validTypes.includes(type) ? type : 'info' });
        setShowMessage(true);
    };

    return (
        <div className="principal-container">
            <Sidebar 
                toggleSidebar={toggleSidebar} 
                accountListener={accountListener}
                isDarkMode={isDarkMode}
            />
            
            <div className="main-content">
                <Header 
                    toggleDarkMode={toggleDarkMode} 
                    setToggleSidebar={setToggleSidebar} 
                    toggleSidebar={toggleSidebar}
                    setIsDarkMode={setIsDarkMode}
                    pageName={pageName}
                />

                <section className="dashboard-content">
                    <ModalInfo message={modalMessage} />

                    <Routes>
                        <Route path="profile" element={<ProfilePage setPageName={setPageName} />} />
                        <Route path="home" element={<HomePage setPageName={setPageName} />} />
                        <Route path="accounts" element={<AccountsPage setPageName={setPageName} isDarkMode={isDarkMode} showUserMessage={ showUserMessage } setAccountListener={setAccountListener} accountListener={accountListener} />} />
                        <Route path="admin" element={<AdminPage setPageName={setPageName} isDarkMode={isDarkMode} showUserMessage={ showUserMessage } setAccountListener={setAccountListener} accountListener={accountListener} />} />
                        <Route path="sheet/:sheetId" element={ <SheetPage setPageName={ setPageName } showUserMessage={ showUserMessage } isDarkMode = { isDarkMode } accountListener = { accountListener } setAccountListener = { setAccountListener }/> } />
                        <Route path="/" element={<Navigate to="/home" />} />
                    </Routes>

                    <div className="row" style={{ height: "30px", width: '100%' }}>
                        <UserMessage message={message} show={showMessage} setShowMessage={setShowMessage} isDarkMode={isDarkMode} />
                    </div>
                </section>
            </div>
        </div>    
    );
};