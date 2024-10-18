import { Route, Routes } from 'react-router-dom'; 
import { PublicRoute } from './PublicRoute'; 
import { AccessPage } from '../miCuenta/pages/AccessPage'; 
import { PrivateRoute } from './PrivateRoute'; 
import { MiCuentaRouter } from '../miCuenta/router/MiCuentaRouter';

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
                        <MiCuentaRouter />
                    </PrivateRoute>
                    } 
                />
            </Routes>
        </>
    )
}