import { useState } from 'react';
import { Sidebar } from '../components/sidebar/Sidebar';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ProfilePage } from '../pages/ProfilePage';
import { HomePage } from '../pages/HomePage';
import { Header } from '../components/Header';
import { AccountPage } from '../pages/AccountPage';
import { CalculatorPage } from '../pages/CalculatorPage';
import { SheetPage } from '../pages/SheetPage';
import '/src/assets/css/Home.css';
import '/src/assets/css/Controls.css';

export const MyAccountRouter = () => {
    const [ toggleSidebar, setToggleSidebar ] = useState(false); 
    const [ isDarkMode, setIsDarkMode ] = useState(false);

    const toggleDarkMode = () => {
        const newDarkModeState = !isDarkMode;
        setIsDarkMode(newDarkModeState);
        document.body.classList.toggle('dark', newDarkModeState);
        localStorage.setItem('isDarkMode', JSON.stringify(newDarkModeState));
    };

    return (
        <div className="principal-container">
            <Sidebar toggleSidebar={ toggleSidebar } />
            
            <div className="main-content">
                <Header 
                    toggleDarkMode={ toggleDarkMode } 
                    setToggleSidebar={ setToggleSidebar } 
                    toggleSidebar={ toggleSidebar }
                    setIsDarkMode={ setIsDarkMode }
                />

                <section className="dashboard-content">
                    <Routes>
                        <Route path="profile" element={<ProfilePage />} />
                        <Route path="home" element={<HomePage />} />
                        <Route path="account/:accountId" element={<AccountPage isDarkMode={ isDarkMode } />} />
                        <Route path="calculator" element={<CalculatorPage />} />
                        <Route path="sheet/:id" element={<SheetPage />} />

                        <Route path="/" element={<Navigate to="/home" />} />
                    </Routes>
                </section>
                
            </div>
        </div>    
    )
}