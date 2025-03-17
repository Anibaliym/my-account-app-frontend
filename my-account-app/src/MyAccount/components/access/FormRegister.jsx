import { useRef, useState, useEffect } from 'react';
import { RegisterUserApi } from '../../../assets/api/MyAccountAppAPI/User';

export const FormRegister = ({ setUserName, toggleForm, setToggleForm, showUserMessage }) => {

    const nameRef = useRef(null);
    const lastNameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const passwordConfirmRef = useRef(null);

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState(''); 
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [passwordConfirm, setpasswordConfirm] = useState(''); 

    const register = async () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        if(name.trim().length === 0) {
            showUserMessage('Por favor, ingresa tu nombre.', 'warning');
            nameRef.current.select(); 
            return; 
        }
    
        if(lastName.trim().length === 0) {
            showUserMessage('Por favor, ingresa tu apellido.', 'warning');
            lastNameRef.current.select(); 
            return; 
        }
    
        if(email.trim().length === 0) {
            showUserMessage('Por favor, ingresa tu correo electrónico.', 'warning');
            emailRef.current.select(); 
            return; 
        }
    
        if (!emailPattern.test(email)) {
            showUserMessage('El correo electrónico no tiene un formato válido. Asegúrate de incluir "@" y un dominio (ejemplo: usuario@correo.com).', 'warning');
            emailRef.current.select();
            return;
        }
    
        if(password.trim().length === 0) {
            showUserMessage('Por favor, ingresa una contraseña.', 'warning');
            passwordRef.current.select(); 
            return; 
        }
    
        if(password.length < 6) {
            showUserMessage('La contraseña debe tener al menos 6 caracteres.', 'info');
            passwordRef.current.select(); 
            return;
        }
    
        if(passwordConfirm.trim().length === 0) {
            showUserMessage('Por favor, confirma tu contraseña.', 'warning');
            passwordConfirmRef.current.select(); 
            return; 
        }
    
        if (password !== passwordConfirm) {
            showUserMessage('Las contraseñas no coinciden. Asegúrate de que ambas sean idénticas.', 'info');
            passwordRef.current.focus();
            setpasswordConfirm('');
            return false;
        }

        const { isError, data } = await RegisterUserApi({ firstName: name, lastName, email, password });

        if(isError) {
            showUserMessage('Ocurrió un error al intentar crear el registro.', 'error');
            return; 
        }

        if(!data.resolution) {
            showUserMessage(data.errors[0], 'warning');
            return; 
        }

        setUserName(email);
        showUserMessage('Ya puedes iniciar sesión.', 'success');
        setToggleForm(!toggleForm); 
    }

    useEffect(() => {
        nameRef.current.focus(); 
    }, [])
    
    return (
        <div className="container animate__animated animate__fadeIn p-1" /* style={{ backgroundColor: 'lightgray' }} */>
            <h6 className="mt-5 animate__animated animate__fadeInLeft animate__faster display-6 text-color-primary">REGÍSTRATE</h6>

            <form onSubmit={ (e) => ( e.preventDefault() )  }>

                <div className="row">
                    <div className="col">
                        <label className="access-label mt-4" htmlFor="txtFirstName">Nombre</label>
                        <input
                            ref={ nameRef }
                            id="txtFirstName"
                            type="text"
                            placeholder="Escribe tu nombre"
                            className="access-input-text"
                            onChange={(e) => setName(e.target.value)}
                            value={name || ''}
                        />

                    </div>
                    <div className="col">
                        <label className="access-label mt-4" htmlFor="txtLastName">Apellido</label>
                        <input
                            ref={ lastNameRef }
                            id="txtLastName"
                            type="text"
                            placeholder="Escribe tu apellido"
                            className="access-input-text"
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName || ''}
                        />
                    </div>
                </div>

                <label className="access-label mt-3" htmlFor="txtEmail">Correo electrónico</label>
                <input
                    ref={ emailRef }
                    id="txtEmail"
                    type="text"
                    placeholder="Introduce tu correo electrónico"
                    className="access-input-text"
                    // autoComplete="username"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email || ''}
                />

                <label className="access-label mt-5" htmlFor="txtPassword">Contraseña</label>
                <input 
                    id="txtPassword"
                    ref={ passwordRef }
                    type="password" 
                    placeholder="Crea una contraseña segura"
                    className="access-input-text"
                    onChange={ (e) => setPassword( e.target.value )}
                    value={ password || '' } 
                    autoComplete="current-password"
                />

                <label className="access-label mt-2" htmlFor="txtPasswordConfirm">Confirma tu contraseña</label>
                <input 
                    id="txtPasswordConfirm"
                    ref={ passwordConfirmRef }
                    type="password" 
                    placeholder="Confirma a tu contraseña"
                    className="access-input-text"
                    onChange={ (e) => setpasswordConfirm( e.target.value )}
                    value={ passwordConfirm || '' } 
                    autoComplete="current-password"
                />

                <div className="container">
                <div className="row mt-3">
                        <button 
                            className="login-button"
                            onClick={ register }
                        >
                            Registrate
                        </button>
                    </div>
                </div>
            </form>

            <p className="register-link text-color-default"> Ya tienes cuenta?
                <a className="text-color-primary ml-1 cursor-pointer" onClick={ () => setToggleForm(!toggleForm) }>
                    Inicia sesión aquí
                </a>
            </p>
        </div>
    )
}