import { useEffect, useRef, useState } from "react";
import { AccessUserMessage } from "./AccessUserMessage";


const registerInitialState = {
    nombre: '',
    apellido: '',
    correo: '',
    contrasena: '',
    contrasenaRepeat: ''
};

export const RegisterForm = ({ activeForm, toggleForm }) => {
    const [ registerFormState, setRegisterFormState ] = useState(registerInitialState);
    const [ showUserMessage, setShowUserMessage ] = useState({ show: false, message: '' });

    const { nombre, apellido, correo, contrasena, contrasenaRepeat } = registerFormState;

    const nombreRef = useRef();
    const apellidoRef = useRef();
    const correoRef = useRef();
    const contrasenaRef = useRef();
    const contrasenaRepeatRef = useRef();

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

    const onRegisterUser = async () => {
        if (nombre.trim().length === 0) {
            setShowUserMessage({ show: true, message: 'Debe ingresar el nombre' });
            nombreRef.current.focus();
            return;
        }

        if (apellido.trim().length === 0) {
            setShowUserMessage({ show: true, message: 'Debe ingresar el apellido' });
            apellidoRef.current.focus();
            return;
        }

        if (correo.trim().length === 0) {
            setShowUserMessage({ show: true, message: 'Debe ingresar el correo' });
            correoRef.current.focus();
            return;
        }

        if (contrasena.trim().length === 0) {
            setShowUserMessage({ show: true, message: 'Debe ingresar la contraseña' });
            contrasenaRef.current.focus();
            return;
        }

        if (contrasena !== contrasenaRepeat) {
            setShowUserMessage({ show: true, message: 'Las contraseñas no coinciden' });
            contrasenaRepeatRef.current.focus();
            return;
        }

        const usuario = {
            datosUsuario: {
                nombre,
                apellido,
                tipoUsuario: 'ESTANDAR'
            },
            
            datosUsuarioSeguridad: {
                correo,
                contrasena
            }
        };

        try 
        {
            const response = await registrarUsuario(usuario.datosUsuario, usuario.datosUsuarioSeguridad);

            if(response){
                setShowUserMessage({ show: true, message: 'Usuario registrado con éxito' });
                setRegisterFormState(registerInitialState);
            }
            else
                setShowUserMessage({ show: true, message: `No se pudo registrar el usuario, debido a que el correo "${ correo }" ya se encuentra en uso` });



        } 
            catch (error) {
            console.error('Error al registrar usuario:', error);
            setShowUserMessage({ show: true, message: 'Ocurrió un error al registrar el usuario' });
        }
    };

    useEffect(() => {
        nombreRef.current.select();
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
                    ref={nombreRef}
                    type="text"
                    placeholder="Nombre"
                    name="nombre"
                    value={nombre}
                    onChange={onInputChange}
                    onKeyDown={onKeyDown}
                    autoComplete="off"
                    />
                </li>
                </div>
                <div className="col">
                <li className="input-box">
                    <input
                    ref={apellidoRef}
                    type="text"
                    placeholder="Primer apellido"
                    name="apellido"
                    value={apellido}
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
                    ref={correoRef}
                    type="text"
                    placeholder="Correo"
                    name="correo"
                    value={correo}
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
                    ref={contrasenaRef}
                    type="password"
                    placeholder="Contraseña"
                    name="contrasena"
                    value={contrasena}
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
                    ref={contrasenaRepeatRef}
                    type="password"
                    placeholder="Repetir contraseña"
                    name="contrasenaRepeat"
                    value={contrasenaRepeat}
                    onChange={onInputChange}
                    onKeyDown={onKeyDown}
                    autoComplete="off"
                    />
                </li>
                </div>
            </div>

            <div className="row mt-4">
                <button
                    className="btn btn-outline-primary"
                    onClick={onRegisterUser}
                >
                    Registrarse
                </button>

                <button className="btn btn-outline-primary mt-2">
                        <i className='bx bxl-google icon' style={{ lineHeight: '20px' }}></i>
                    </button>

            </div>

            <div className="row mt-3">
                { showUserMessage.show && <AccessUserMessage show={showUserMessage.show} message={showUserMessage.message} /> }
            </div>
        </div>
    );
}
