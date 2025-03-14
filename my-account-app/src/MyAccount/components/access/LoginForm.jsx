import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../assets/context/AuthContext';
import { LoginUserApi } from '../../../assets/api/MyAccountAppAPI/DomainServices';

const userInitialState = {
    id: '', 
    firstName: '', 
    lastName: '', 
    profilePicture: '', 
    email: '', 
    userType: ''
}

const loginInitialState = { userName: 'anibaliym@gmail.com', password: '111111' }; 

export const LoginForm = ({ activeForm, toggleForm, setShowUserMessage }) => {
    const navigate = useNavigate();

    const userRef = useRef(); 
    const passwordRef = useRef(); 

    const [ loginState, setLoginState ] = useState(loginInitialState); 
    const { userName, password } = loginState; 
    const [ accessAllowed, setAccessAllowed] = useState(false); 
    const [ user, setUser ] = useState({}); 
    const [ accounts, setAccounts ] = useState([]); 
    const { Login } = useContext(AuthContext); 

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

        const { isError, data } = await LoginUserApi(userName.toUpperCase(), password);
        const { accounts, user } = data.data; 
        
        setShowUserMessage({ show: isError, message: 'Ha ocurrido un error en la conexión con el servidor', type : 'danger' });
        
        if( isError ) return; 

        const { resolution, errors, data: userData } = data; 
        
        setAccessAllowed(resolution); //Permite el acceso a al aplicación. 
        
        setShowUserMessage({ 
            show: !resolution, 
            message: (errors != undefined) ? errors[0] : '', 
            type : 'danger' 
        });

        setUser(user); 
        setAccounts(accounts); 
    };

    const onToggleForm = () => {
        toggleForm(!activeForm);
    };

    useEffect(() => {
        if (accessAllowed) {
            Login(user, accounts);
            navigate('/', { replace: true });
        }
    }, [ accessAllowed ]);

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
                <button className="button-primary mt-1" onClick={ onLogin }>
                    Entrar
                </button>
            </div>
        </div>
    );
}
