// export const LoginForm = () => {
//     return (
//         <h1>login form</h1>
//     )
// }

import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../assets/context/AuthContext';
import { AccessUserMessage } from './AccessUserMessage';

const usuario = {
    id: 1, 
    nombre: 'Anibal', 
    apellido: 'Yañez'
}

const loginInitialState = { userName: 'anibaliym@gmail.com', password: 'admin' }; 
// const loginInitialState = { userName: '', password: '' }; 

export const LoginForm = ({ activeForm, toggleForm }) => {
    const navigate = useNavigate();
    const userRef = useRef(); 
    const passwordRef = useRef(); 
    const [ showUserMessage, setShowUserMessage ] = useState({ show: false, message: '' }); 
    const [ loginState, setLoginState ] = useState(loginInitialState); 
    const { userName, password } = loginState; 
    const { login } = useContext(AuthContext); 

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setLoginState({ ...loginState, [name]: value });
    };

    const onKeyDown = (event) => {
        if (event.key === 'Enter') onLogin();
    };

    const onLogin = async () => {
        if (userName.trim().length === 0) {
            setLoginState(loginInitialState);
            userRef.current.select();
            setShowUserMessage({ show: true, message: 'Debe ingresar el E-mail', type : 'warning' });
            return;
        }

        if (password.trim().length === 0) {
            passwordRef.current.select();
            setShowUserMessage({ show: true, message: 'Debe ingresar la contraseña', type : 'warning' });
            return;
        }

        // const { isError, status, data: usuario } = await loginUsuario(userName.toUpperCase(), password);

        // console.log(isError, status, usuario); 
        // if ( isError ) {
        //     passwordRef.current.select();
        //     setShowUserMessage({ show: true, message: 'Ocurrio un error al intentar contactar con el servidor.', type : 'danger' });
        //     return;
        // }
        // else {
        //     if(status === 400){
        //         setShowUserMessage({ show: true, message: 'Los datos proporcionados no son correctos. Por favor, inténtelo nuevamente.', type : 'warning' });
        //         return; 
        //     }
        // }

        setShowUserMessage({show: true, message: `${usuario.id} - ${ usuario.nombre } - ${ usuario.apellido }`})

        login(usuario.id, `${usuario.nombre} ${usuario.apellido}`);
        navigate('/', { replace: true });
    };

    const onToggleForm = () => {
        toggleForm(!activeForm);
    };

    useEffect(() => {
        userRef.current.select();
    }, []);

    return (
        <div className="animate__animated animate__fadeIn">
            <h1 className="title-color-text animate__animated animate__fadeInLeft animate__fast">LOGIN</h1>
            <hr />
            <div className="row mt-2">
                <small style={{ color: 'var(--primary-color)' }}>
                Aun no tienes una cuenta? Registrate <b onClick={onToggleForm} style={{ cursor: 'pointer' }}>Aqui</b>
                </small>
            </div>

                <div className="row mt-5">
                    <li className="input-box">
                    <i className='bx bx-user login-icon'></i>
                    <input
                        ref={ userRef }
                        type="text"
                        placeholder="E-mail"
                        name="userName"
                        value={ userName }
                        onChange={ onInputChange }
                        onKeyDown={ onKeyDown }
                        autoComplete="off"
                    />
                    </li>
                </div>
                
                <div className="row mt-2">
                    <li className="input-box">
                    <i className='bx bx-lock-alt login-icon'></i>

                    <input
                        ref={ passwordRef }
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={ password }
                        onChange={ onInputChange }
                        onKeyDown={ onKeyDown }
                    />
                    </li>
                </div>

                <div className="row mt-4">
                    <button className="btn btn-outline-primary" onClick={ onLogin }>
                        Entrar
                    </button>
                    <button className="btn btn-outline-primary mt-2" onClick={ onLogin }>
                        <i className='bx bxl-google icon' style={{ lineHeight: '20px' }}></i>
                    </button>
                </div>



            <div className="row mt-3">
                { 
                    showUserMessage.show && <AccessUserMessage show={showUserMessage.show} message={showUserMessage.message} />
                }
            </div>
        </div>
    );
}
