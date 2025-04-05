import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { loginUserFetch } from '../../../assets/api/MyAccountAppAPI/DomainServices';
import { AuthContext } from '../../../assets/context/AuthProvider';
import { capitalizeWords } from '../../../assets/utilities/stringFormar';

export const FormLogin = ({ userName, setUserName, toggleForm, setToggleForm, showUserMessage }) => {
    const navigate = useNavigate();
    const userRef = useRef();
    const passwordRef = useRef();

    const [password, setPassword] = useState('');
    const [accessAllowed, setAccessAllowed] = useState(false);
    const [user, setUser] = useState({});
    const [accounts, setAccounts] = useState([]);
    const { Login } = useContext(AuthContext);
    const [rememberMe, setRememberMe] = useState(false);

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

        try {
            const { isError, data } = await loginUserFetch(userName.toUpperCase(), password);
            const { resolution, data: userData } = data;

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
            if (rememberMe)
                localStorage.setItem('my-account-remembered-email', JSON.stringify(user.email));
            else
                localStorage.removeItem('my-account-remembered-email');

            Login(user, accounts);
            navigate('/', { replace: true });
        }
    }, [accessAllowed]);

    useEffect(() => {
        userRef.current.select();

        const rememberedEmail = JSON.parse(localStorage.getItem('my-account-remembered-email'));

        if (rememberedEmail) {
            setUserName(capitalizeWords(rememberedEmail));
            setRememberMe(true);
        }

    }, [])

    return (
        <div className="animate__animated animate__fadeIn container p-1" /* style={{ backgroundColor: 'lightgray' }} */>
            <h6 className="mt-5 animate__animated animate__fadeInLeft animate__faster display-6 text-color-primary">
                LOGIN
            </h6>

            <form onSubmit={(e) => (e.preventDefault())}>
                <label className="access-label mt-4" htmlFor="txtEmail">Correo electrónico</label>
                <input
                    ref={userRef}
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
                    ref={passwordRef}
                    type="password"
                    placeholder="Introduce tu contraseña"
                    className="access-input-text"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password || ''}
                    autoComplete="current-password"

                />


                <div className="container">
                    <div className="row mt-3">
                        <button
                            className="login-button"
                            onClick={login}
                        >
                            Entrar
                        </button>

                        <button
                            className="login-button mt-2"
                            onClick={() => setToggleForm(!toggleForm)}
                        >
                            Registrate
                        </button>


                        <div style={{ margin: '10px -11px' }}>
                            <label className="access-label">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                /> {' '}Recordar mi cuenta</label>
                        </div>
                    </div>
                </div>
            </form>

        </div>
    )
}
