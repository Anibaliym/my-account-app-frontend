import { useReducer, useEffect, useRef } from 'react';
import { AuthContext } from './AuthContext';
import { authReducer } from './authReducer';
import { types } from '../types/types';

const init = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        const currentTime = new Date().getTime();

        if (user.expirationTime && currentTime > user.expirationTime) {
            localStorage.removeItem('user');
            localStorage.removeItem('accounts');
            return { logged: false, user: null };
        }
    }

    return { logged: !!user, user: user };
}

export const AuthProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {}, init);
    const timeoutIdRef = useRef(null);  // Aquí almacenamos el ID del timeout actual
    // const SESSION_DURATION = 10 * 60 * 1000; // 10 minutos en milisegundos
    const SESSION_DURATION = 30 * 60 * 1000; // 30 minutos en milisegundos
    // const SESSION_DURATION = 5 * 1000; // 5 segundos en mil


    const Login = (user, accounts) => {
        const action = { type: types.login, payload: user };

        const expirationTime = new Date().getTime() + SESSION_DURATION;

        const userWithExpiration = { ...user, expirationTime };
        
        localStorage.setItem('user', JSON.stringify(userWithExpiration));
        localStorage.setItem('accounts', JSON.stringify(accounts));
        localStorage.setItem('activeDropdowns', JSON.stringify(accounts));

        dispatch(action);

        scheduleSessionTimeout(expirationTime);
    }

    const Logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('accounts');
        
        if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current); // Eliminar cualquier timeout activo

        const action = { type: types.logout };
        dispatch(action);
    }

    const scheduleSessionTimeout = (expirationTime) => {
        const currentTime = new Date().getTime();
        const remainingTime = expirationTime - currentTime;

        if (remainingTime > 0) {
            if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);  // Limpiar timeout anterior si existe

            timeoutIdRef.current = setTimeout(() => {
                alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
                Logout();
                window.location.href = '/login';
            }, remainingTime);
        }
    }

    const refreshSession = () => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            const newExpirationTime = new Date().getTime() + SESSION_DURATION;
            user.expirationTime = newExpirationTime;

            localStorage.setItem('user', JSON.stringify(user));
            scheduleSessionTimeout(newExpirationTime);
        }
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user && user.expirationTime) {
            scheduleSessionTimeout(user.expirationTime);
        }

        const activityEvents = ['click', 'keydown', 'mousemove', 'scroll'];

        activityEvents.forEach(event => 
            window.addEventListener(event, refreshSession)
        );

        return () => {
            activityEvents.forEach(event => 
                window.removeEventListener(event, refreshSession)
            );

            if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
        }
    }, []);

    return (
        <AuthContext.Provider value={{
            ...authState,
            Login,
            Logout,
        }}>
            {children}
        </AuthContext.Provider>
    );
}