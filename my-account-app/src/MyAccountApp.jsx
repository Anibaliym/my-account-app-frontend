import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'animate.css'; 
import '/src/assets/css/Global.css'; 

import { AuthProvider } from './assets/context/AuthProvider';
import { AppRouter } from './router/AppRouter'; 

export const MyAccountApp = () => {
    return (
        <AuthProvider>
            <AppRouter/>
        </AuthProvider>
    )
}
