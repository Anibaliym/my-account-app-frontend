import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../assets/context/AuthContext';
import { loginUserFetch } from '../../../assets/api/MyAccountAppAPI/DomainServices';

export const FormLogin = ({ userName, setUserName, toggleForm, setToggleForm, showUserMessage }) => {
    const navigate = useNavigate(); 
    const userRef = useRef(); 
    const passwordRef = useRef(); 
    
    const [password, setPassword] = useState('');
    const [accessAllowed, setAccessAllowed] = useState(false); 
    const [user, setUser] = useState({}); 
    const [ accounts, setAccounts ] = useState([]); 
    const { Login } = useContext(AuthContext); 

    const login = async () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        if (userName.trim().length === 0) {
            userRef.current.select();
            showUserMessage('Por favor, ingresa tu correo electrónico.', 'warning');
            return;
        }
    
        if (!emailPattern.test(userName)) {
            userRef.current.select();
            showUserMessage('El correo ingresado no es válido. Asegúrate de incluir "@" y un dominio válido (ejemplo: usuario@correo.com).', 'warning');
            return;
        }
    
        if (password.trim().length === 0) {
            passwordRef.current.select();
            showUserMessage('Por favor, ingresa tu contraseña.', 'warning');
            return;
        }

        try 
        {
            const { isError, data } = await loginUserFetch(userName.toUpperCase(), password);
            const { resolution, errors, data: userData } = data;
    
            if (isError) {
                showUserMessage('Hubo un problema al intentar iniciar sesión. Por favor, intenta nuevamente.', 'error');
            } else {
                if (resolution) {
                    const { accounts, user } = data.data;
                    showUserMessage(`¡Bienvenido de nuevo, ${user.firstName}! Redirigiéndote al inicio...`, 'success');

                    setUser(user);
                    setAccounts(accounts);
                    setAccessAllowed(true);
    
                } else {
                    showUserMessage('Las credenciales ingresadas son incorrectas. Verifica tu correo y contraseña.', 'warning');
                }
            }
        } 
        catch (error) {
            showUserMessage('No se pudo conectar con el servidor. Intenta nuevamente más tarde.', 'error');
        }
    };    

    useEffect(() => {
        if (accessAllowed) {
            Login(user, accounts);
            navigate('/', { replace: true });
        }
    }, [ accessAllowed ]);

    useEffect(() => {
        userRef.current.select();
    }, [])
    
    return (
        <div className="animate__animated animate__fadeIn container p-1" /* style={{ backgroundColor: 'lightgray' }} */>
            <h6 className="mt-5 animate__animated animate__fadeInLeft animate__faster display-6 text-color-primary">
                LOGIN
            </h6>

            <form onSubmit={ (e) => ( e.preventDefault() )  }>
                <label className="access-label mt-4" htmlFor="txtEmail">Correo electrónico</label>
                <input
                    ref={ userRef }
                    id="txtEmail"
                    type="text"
                    placeholder="Introduce tu correo electrónico"
                    className="access-input-text"
                    onChange={(e) => setUserName(e.target.value)}
                    value={userName || ''}
                    autoComplete="username"

                />

                <label className="access-label mt-3" htmlFor="txtEmail">Contraseña</label>
                <input 
                    ref={ passwordRef }
                    type="password" 
                    placeholder="Introduce tu contraseña"
                    className="access-input-text"
                    onChange={ (e) => setPassword( e.target.value )}
                    value={ password || '' } 
                    autoComplete="current-password"

                />

                <div className="container">
                    <div className="row mt-3">
                        <button 
                            className="login-button"
                            onClick={ login }
                        >
                            Entrar
                        </button>
                    </div>
                </div>
            </form>

            <p className="register-link text-color-default"> Aún no tienes cuenta?
                <a className="text-color-primary ml-1 cursor-pointer" onClick={ () => setToggleForm(!toggleForm) }>
                    Crea una cuenta aquí
                </a>
            </p>
        </div>        
    )
}
