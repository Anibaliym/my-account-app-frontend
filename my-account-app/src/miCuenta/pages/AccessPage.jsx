import { useContext, useState } from 'react';
import { AuthContext } from '../../assets/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/access/LoginForm';
import { RegisterForm } from '../components/access/RegisterForm';
import '/src/assets/css/Access.css'; 

const usuario = {
    id: 1, 
    nombre: 'Anibal', 
    apellido: 'Yañez'
}

const loginInitialState = { userName: '', password: '' }; 

export const AccessPage = () => {
    const navigate = useNavigate();  
    const { login } = useContext(AuthContext); 

    const [ toggleLoginRegister, setToggleLoginRegister ] = useState(false); 

    const onLogin = async () => {
        login(usuario.id, `${usuario.nombre} ${usuario.apellido}`);
        navigate('/', { replace: true });
    };

    return (
        <div className="access-page-container">
            <br />
            <div className="access-container animate__animated animate__fadeIn">
                <div className="container">
                    <div className="row">
                        <div className="loginPresentation col p-5">
                            <h1>mi cuenta</h1>
                            <h5 className="mt-3">
                                { 'Registrate de forma gratuita! :)' }
                            </h5>
                            <br />
                            <p>Todo lo que necesitas para hacer seguimiento de forma ordenada de tus gastos personales. </p>
                            <p>Administrar tus cuentas y calcular tus proyecciones.</p>
                        </div>


                        <div className="col p-5">
                        {
                            (toggleLoginRegister) 
                                ? <LoginForm activeForm={ toggleLoginRegister } toggleForm={ setToggleLoginRegister } /> 
                                : <RegisterForm activeForm={ toggleLoginRegister } toggleForm={ setToggleLoginRegister } />
                        }
                        </div>                    


                    </div>
                </div>
            </div>

        </div>
    )
}
