import { useState } from 'react';
import { Sidebar } from '../components/sidebar/Sidebar';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ProfilePage } from '../pages/ProfilePage';
import { HomePage } from '../pages/HomePage';
import { AdminPage } from '../pages/AdminPage';
import { Header } from '../components/Header';
import { SheetPage } from '../pages/SheetPage';
import { UserMessage } from '../components/UserMessage';
import { AccountsPage } from '../pages/AccountsPage';

import '/src/assets/css/Home.css';
import '/src/assets/css/Controls.css';
import '/src/assets/css/Cards.css';
import '/src/assets/css/sheet.css';
import '/src/assets/css/Accounts.css';
import '/src/assets/css/Responsive.css';
import '/src/assets/css/grid.css';
import '/src/assets/css/Profile.css';

export const MyAccountRouter = () => {

    // Estado inicial de toggleSidebar obteniendo el valor de localStorage
    const [toggleSidebar, setToggleSidebar] = useState(() => {
        const storedValue = localStorage.getItem('my-account-isSidebarToggleCollapsed');
        return storedValue !== null ? JSON.parse(storedValue) : false;
    });

    const [accountListener, setAccountListener] = useState(0);
    const [pageName, setPageName] = useState('Nombre página');
    const [message, setMessage] = useState({ message: '', type: 'info' });
    const [showMessage, setShowMessage] = useState(false);

    const showUserMessage = (message, type = 'info') => {
        const validTypes = ['success', 'info', 'warning', 'error'];
        setMessage({ message, type: validTypes.includes(type) ? type : 'info' });
        setShowMessage(true);
    };

    return (
        <div className="principal-container">
            <Sidebar 
                toggleSidebar={toggleSidebar} 
                setToggleSidebar={setToggleSidebar}
                accountListener={accountListener} 
            />
            
            <div className="main-content" >
                <Header 
                    setToggleSidebar={setToggleSidebar} 
                    toggleSidebar={toggleSidebar} 
                    pageName={pageName} 
                />
                
                <div className="dashboard-content">
                    <Routes>
                        <Route path="home" element={<HomePage setPageName={setPageName} />} />
                        <Route path="profile" element={<ProfilePage setPageName={setPageName} showUserMessage={showUserMessage} />} />
                        <Route path="accounts" element={<AccountsPage setPageName={setPageName} showUserMessage={showUserMessage} setAccountListener={setAccountListener} accountListener={accountListener} />} />
                        <Route path="admin" element={<AdminPage setPageName={setPageName} showUserMessage={showUserMessage} setAccountListener={setAccountListener} accountListener={accountListener} />} />
                        <Route path="sheet/:sheetId" element={<SheetPage setPageName={setPageName} showUserMessage={showUserMessage} accountListener={accountListener} setAccountListener={setAccountListener} />} />
                        <Route path="/" element={<Navigate to="/home" />} />
                    </Routes>

                    <div className="row" style={{ height: "30px", width: '30%' }}>
                        <UserMessage message={message} show={showMessage} setShowMessage={setShowMessage} toggleSidebar={ toggleSidebar }/>
                    </div>
                </div>
            </div> 
        </div>
    );
};