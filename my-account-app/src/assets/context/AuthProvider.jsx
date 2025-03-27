import { useReducer, useEffect, useRef, useState } from 'react';
import { authReducer } from './authReducer';
import { types } from '../types/types';
import { ModalSessionExpired } from '../../MyAccount/components/ModalSessionExpired';
import { createContext } from 'react';

export const AuthContext = createContext();

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
    const [showModal, setShowModal] = useState(false);
    const timeoutIdRef = useRef(null);

    // const SESSION_DURATION = 30 * 60 * 1000; // 30 minutos en milisegundos
    // const SESSION_DURATION = 2 * 1000; // 2 segundos en mil
    const SESSION_DURATION = 10 * 60 * 1000; // 10 minutos en milisegundos

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
        
        if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);

        const action = { type: types.logout };
        dispatch(action);
    }

    const scheduleSessionTimeout = (expirationTime) => {
        const currentTime = new Date().getTime();
        const remainingTime = expirationTime - currentTime;
    
        if (remainingTime > 0) {
            if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
    
            timeoutIdRef.current = setTimeout(() => {
                setShowModal(true); // 🔥 Muestra el modal
            }, remainingTime);
        }
    }

    const refreshSession = () => {
        // 🔒 Evitar que la sesión se renueve si el modal está abierto (es decir, si ya expiró)
        if (showModal) return;

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
    
        const handleActivity = () => {
            if (!showModal) refreshSession(); // 🔒 No refrescar la sesión si el modal está activo
        };
    
        activityEvents.forEach(event => 
            window.addEventListener(event, handleActivity)
        );
    
        return () => {
            activityEvents.forEach(event => 
                window.removeEventListener(event, handleActivity)
            );
    
            if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
        }
    }, [showModal]); // 🔒 Asegurarse que depende del estado de showModal

    return (
        <AuthContext.Provider value={{
            ...authState,
            Login,
            Logout,
        }}>
            {children}
            <ModalSessionExpired show={showModal} onClose={() => setShowModal(false)} />
        </AuthContext.Provider>
    );
}