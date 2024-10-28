import { useReducer } from 'react';
import { AuthContext } from './AuthContext';
import { authReducer } from './authReducer';
import { types } from '../types/types';

const init = () => {
    const user = JSON.parse( localStorage.getItem('user') );

    return {
        logged: !!user,
        user: user,
    }
}

export const AuthProvider = ({ children }) => {
    const [ authState, dispatch ] = useReducer( authReducer, {}, init );

    const Login = (user, accounts) => {
        const action = { type: types.login, payload: user }

        localStorage.setItem('user', JSON.stringify( user ) );
        localStorage.setItem('accounts', JSON.stringify( accounts ) );

        dispatch(action);
    }

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('accounts');

        const action = { type: types.logout };

        dispatch(action);
    }


    return (
        <AuthContext.Provider value={{
            ...authState,

            // Methods
            Login,
            logout,
        }}>
            { children }
        </AuthContext.Provider>
    );
}