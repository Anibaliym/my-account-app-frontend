import { useEffect, useRef, useState } from 'react';
import { RegisterUserApi } from '../../../assets/api/MyAccountAppAPI/User';

const registerInitialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordRepeat: ''
};

export const RegisterForm = ({ activeForm, toggleForm, setShowUserMessage }) => {
    const [ registerFormState, setRegisterFormState ] = useState(registerInitialState);
    const { firstName, lastName, email, password, passwordRepeat } = registerFormState;

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordRepeatRef = useRef();

    const onToggleForm = () => {
        toggleForm(!activeForm);
    };

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setRegisterFormState({ ...registerFormState, [name]: value });
    };

    const onKeyDown = (event) => {
        if (event.key === 'Enter') {
            onRegisterUser();
        }
    };

    const validForm = () => {
        if (firstName.trim().length === 0) {
            setShowUserMessage({ show: true, message: 'Debe ingresar el nombre', type: 'warning', type: 'warning' });
            firstNameRef.current.focus();
            return false;
        }

        if (lastName.trim().length === 0) {
            setShowUserMessage({ show: true, message: 'Debe ingresar el apellido', type: 'warning' });
            lastNameRef.current.focus();
            return false;
        }

        if (email.trim().length === 0) {
            setShowUserMessage({ show: true, message: 'Debe ingresar el correo', type: 'warning' });
            emailRef.current.focus();
            return false;
        }

        if (password.trim().length === 0) {
            setShowUserMessage({ show: true, message: 'Debe ingresar la contraseña', type: 'warning' });
            passwordRef.current.focus();
            return false;
        }

        if (password !== passwordRepeat) {
            setShowUserMessage({ show: true, message: 'Las contraseñas no coinciden', type: 'warning' });
            passwordRepeatRef.current.focus();
            return false;
        }

        return true; 
    }

    const onRegisterUser = async () => {
        if (!validForm()) return;
      
        const { isError, data: responseData } = await RegisterUserApi(registerFormState);
        const { errors } = responseData;
      
        if(isError){
            setShowUserMessage({ 
                show: true, 
                message: 'Ocurrio un error al contactarse con el servidor.', 
                type: 'danger', 
            });
        }
        else {
            if(errors != null && errors.length > 0) {
                setShowUserMessage({ 
                    show: true, 
                    message: errors[0], 
                    type: 'warning', 
                });
            }
            else {

                setShowUserMessage({ 
                    show: true, 
                    message: 'Registrado :)', 
                    type: 'success', 
                });

                onToggleForm(); 
            }
        }
    };

    useEffect(() => {
        firstNameRef.current.select();
    }, []);


    return (
        <div className="animate__animated animate__fadeIn">
            <h1 className="title-color-text animate__animated animate__fadeInLeft animate__fast">
                REGISTRATE
            </h1>
            <hr />

            <div className="row mt-2">
                <small style={{ 'color': 'var(--primary-color)' }}>
                Ya tienes una cuenta? Entra
                <b onClick={onToggleForm} style={{ 'cursor': 'pointer' }}> Aqui</b>
                </small>
            </div>

            <div className="row mt-5">
                <div className="col">
                <li className="input-box">
                    <input
                    ref={firstNameRef}
                    type="text"
                    placeholder="Nombre"
                    name="firstName"
                    value={firstName}
                    onChange={onInputChange}
                    onKeyDown={onKeyDown}
                    autoComplete="off"
                    />
                </li>
                </div>
                <div className="col">
                <li className="input-box">
                    <input
                    ref={lastNameRef}
                    type="text"
                    placeholder="Primer apellido"
                    name="lastName"
                    value={lastName}
                    onChange={onInputChange}
                    onKeyDown={onKeyDown}
                    autoComplete="off"
                    />
                </li>
                </div>
            </div>

            <div className="row mt-2">
                <div className="col">
                <li className="input-box">
                    <input
                    ref={emailRef}
                    type="text"
                    placeholder="Correo"
                    name="email"
                    value={email}
                    onChange={onInputChange}
                    onKeyDown={onKeyDown}
                    autoComplete="off"
                    />
                </li>
                </div>
            </div>
            <hr />
            <div className="row mt-2">
                <div className="col">
                <li className="input-box">
                    <input
                    ref={passwordRef}
                    type="password"
                    placeholder="Contraseña"
                    name="password"
                    value={password}
                    onChange={onInputChange}
                    onKeyDown={onKeyDown}
                    autoComplete="off"
                    />
                </li>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col">
                <li className="input-box">
                    <input
                    ref={passwordRepeatRef}
                    type="password"
                    placeholder="Repetir contraseña"
                    name="passwordRepeat"
                    value={passwordRepeat}
                    onChange={onInputChange}
                    onKeyDown={onKeyDown}
                    autoComplete="off"
                    />
                </li>
                </div>
            </div>

            <div className="row mt-4">
                <button
                    className="button-primary"
                    onClick={onRegisterUser}
                >
                    Registrarse
                </button>
            </div>
        </div>
    );
}
