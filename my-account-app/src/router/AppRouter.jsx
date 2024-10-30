import { Route, Routes } from 'react-router-dom'; 
import { PublicRoute } from './PublicRoute'; 
import { AccessPage } from '../MyAccount/pages/AccessPage'; 
import { PrivateRoute } from './PrivateRoute'; 
import { MyAccountRouter } from '../MyAccount/router/MyAccountRouter';

export const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route path="access/*" element={
                    <PublicRoute>
                        <Routes>
                            <Route path="/*" element={<AccessPage />} />
                        </Routes>
                    </PublicRoute>
                    }
                />
                
                <Route path="/*" element={
                    <PrivateRoute>
                        <MyAccountRouter />
                    </PrivateRoute>
                    } 
                />
            </Routes>
        </>
    )
}