import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'animate.css'; 
import '/src/assets/css/Global.css'; 

import { AuthProvider } from './assets/context/AuthProvider';
import { AppRouter } from './router/AppRouter'; 
import { ThemeProvider } from './assets/context/ThemeProvider';
import { UserProvider } from './assets/context/UserProvider';

export const MyAccountApp = () => {
    return (
        <AuthProvider>
            <ThemeProvider>
                    <AppRouter/>
            </ThemeProvider>
        </AuthProvider>
    )
}
