import { useState } from 'react';
import { LoginForm } from '../components/access/LoginForm';
import { RegisterForm } from '../components/access/RegisterForm';
import { AccessUserMessage } from '../components/access/AccessUserMessage';

import '/src/assets/css/Access.css'; 

export const AccessPage = () => {
    const [ toggleLoginRegister, setToggleLoginRegister ] = useState(true); 
    const [ showUserMessage, setShowUserMessage ] = useState({ show: false, message: '' });
    
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
                                    ? <LoginForm activeForm={ toggleLoginRegister } toggleForm={ setToggleLoginRegister } setShowUserMessage={ setShowUserMessage }/> 
                                    : <RegisterForm activeForm={ toggleLoginRegister } toggleForm={ setToggleLoginRegister } setShowUserMessage={ setShowUserMessage }/>
                            }
                            <div className="row mt-3">
                                { 
                                    showUserMessage.show 
                                    && <AccessUserMessage show={showUserMessage.show} message={showUserMessage.message} type={ showUserMessage.type } /> 
                                }
                            </div>
                        </div>                    
                    </div>
                </div>
            </div>
        </div>
    ); 
}
