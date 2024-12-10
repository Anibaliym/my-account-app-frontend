import { useState } from 'react';
import { Sidebar } from '../components/sidebar/Sidebar';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ProfilePage } from '../pages/ProfilePage';
import { HomePage } from '../pages/HomePage';
import { Header } from '../components/Header';
import { AccountPage } from '../pages/AccountPage';
import { CalculatorPage } from '../pages/CalculatorPage';
import { SheetPage } from '../pages/SheetPage';
import { UserMessage } from '../components/UserMessage';
import { ModalInfo } from '../components/modal/ModalInfo';
import '/src/assets/css/Home.css';
import '/src/assets/css/Controls.css';
import '/src/assets/css/Cards.css';
import '/src/assets/css/sheet.css';

export const MyAccountRouter = () => {
    const [ toggleSidebar, setToggleSidebar ] = useState(false); 
    const [ isDarkMode, setIsDarkMode ] = useState(false);
    const [ accountListener, setAccountListener ] = useState(0); 
    const [ pageName, setPageName ] = useState('Nombre página'); 
    const [ message, setMessage ] = useState(''); 
    const [ showMessage, setShowMessage] = useState(false); 
    
    const [ modalMessage, setModalMessage ] = useState('');

    const toggleDarkMode = () => {
        const newDarkModeState = !isDarkMode;
        setIsDarkMode( newDarkModeState );
        document.body.classList.toggle('dark', newDarkModeState);
        localStorage.setItem('isDarkMode', JSON.stringify(newDarkModeState));
    };

    const showUserMessage = (message) => {
        setMessage( message );
        setShowMessage(true);            
    }

    return (
        <div className="principal-container">
            <Sidebar 
                toggleSidebar={ toggleSidebar } 
                accountListener={ accountListener }
                isDarkMode={ isDarkMode }
            />
            
            <div className="main-content">
                <Header 
                    toggleDarkMode={ toggleDarkMode } 
                    setToggleSidebar={ setToggleSidebar } 
                    toggleSidebar={ toggleSidebar }
                    setIsDarkMode={ setIsDarkMode }
                    pageName={ pageName }
                />

                <section className="dashboard-content">
                    <div className="row" style={ { height: "30px" } }>
                        <UserMessage message={ message } show={ showMessage } setShowMessage={ setShowMessage }/>
                    </div>

                    <ModalInfo message={ modalMessage }/>

                    <Routes>
                        <Route path="profile" element={<ProfilePage setPageName={ setPageName }/>} />
                        <Route path="home" element={<HomePage setPageName={ setPageName }/>} />

                        <Route path="account/:accountId" element={
                            <AccountPage 
                                setAccountListener={ setAccountListener } 
                                accountListener={ accountListener } 
                                isDarkMode={ isDarkMode } 
                                setPageName={ setPageName } 
                                showUserMessage={ showUserMessage }
                                setModalMessage={ setModalMessage }
                            />
                            } 
                        />

                        <Route path="calculator" element={<CalculatorPage setPageName={ setPageName }/>} />
                        <Route path="sheet/:sheetId" element={<SheetPage showUserMessage={ showUserMessage }/>} />
                        
                        <Route path="/" element={<Navigate to="/home" />} />
                    </Routes>
                </section>
            </div>
        </div>    
    )
}