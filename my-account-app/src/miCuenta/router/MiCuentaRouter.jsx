import { useState } from 'react';
import { Sidebar } from '../components/sidebar/Sidebar';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ProfilePage } from '../pages/ProfilePage';
import { HomePage } from '../pages/HomePage';
import { Header } from '../components/Header';
import '/src/assets/css/Home.css'; 
import { AccountPage } from '../pages/AccountPage';
import { CalculatorPage } from '../pages/CalculatorPage';
import { SheetPage } from '../pages/SheetPage';

export const MiCuentaRouter = () => {
    const [ toggleSidebar, setToggleSidebar ] = useState(false); 

    return (
        <div className="principal-container">
            <Sidebar toggleSidebar={ toggleSidebar } />
            
            <div className="main-content">
                <Header setToggleSidebar={ setToggleSidebar } toggleSidebar={ toggleSidebar }/>

                <section className="dashboard-content">
                    <Routes>
                        <Route path="profile" element={<ProfilePage />} />
                        <Route path="home" element={<HomePage />} />
                        <Route path="account" element={<AccountPage />} />
                        <Route path="calculator" element={<CalculatorPage />} />
                        <Route path="sheet" element={<SheetPage />} />

                        <Route path="/" element={<Navigate to="/home" />} />
                    </Routes>
                </section>
                
            </div>
        </div>    
    )
}