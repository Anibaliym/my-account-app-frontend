import { useEffect } from 'react';

export const HomePage = ({ setPageName }) => {
    const user = JSON.parse( localStorage.getItem('user') );
    
    useEffect(() => {
        setPageName('INICIO'); 
    }, []);

    return (
        <div className="page-principal-container">
            <div className="container-fluid">
                <h1 className="animate__animated animate__fadeInDown animate__faster display-1 text-color-primary">MI CUENTA</h1>
                <div className="card-body animate__animated animate__fadeIn">
                    <blockquote className="blockquote mb-0">
                    <p>Gestión de cuentas y planificación personal.</p>
                    <footer className="blockquote-footer">{ `${ user.firstName } ${ user.lastName }` }</footer>
                    </blockquote>
                </div>
            </div>
        </div>
        // <>
        //     <div className="container ">
        //         <div className="row">
        //             <div className="col-12 text-center mb-2">
        //                 <h1 className="display-4 title-color-text">Bienvenido a <strong>"Mi Cuenta"</strong></h1>
        //                 <p className="lead">Tu solución integral para la gestión y planificación de tus finanzas personales.</p>
        //             </div>
        //         </div>

        //         <div className="row mt-3">
        //             <div className="col-12">
        //                 <h2>¿Qué puedes hacer con "Mi Cuenta"?</h2>
        //                 <ul className="p-4 list-group-flush">
        //                     <li className="list-group-item p-2">
        //                         <span className="title-color-text">Gestión de cuentas y presupuestos mensuales:</span> Organiza tus finanzas en cuentas personalizadas, categoriza tus ingresos y gastos, y lleva un seguimiento detallado de tus presupuestos mensuales.
        //                     </li>
        //                     <li className="list-group-item p-2">
        //                         <span className="title-color-text">Proyección anual de finanzas:</span> Genera proyecciones anuales basadas en tus hábitos financieros y ajusta tus metas a largo plazo.
        //                     </li>
        //                     <li className="list-group-item p-2">
        //                         <span className="title-color-text">Seguimiento de movimientos detallados:</span> Cada cuenta incluye un desglose claro y ordenado de tus transacciones mediante "viñetas" (vignettes) para visualizar ingresos y gastos de forma organizada.
        //                     </li>
        //                     <li className="list-group-item p-2">
        //                         <span className="title-color-text">Cálculo automático de totales:</span> Visualiza en tiempo real tu total disponible y los montos restantes con cálculos automáticos.
        //                     </li>
        //                     <li className="list-group-item p-2">
        //                         <span className="title-color-text">Gestión de tarjetas y registros:</span> Crea "cartas" personalizadas (cards) con categorías específicas y añade viñetas para un desglose más detallado.
        //                     </li>
        //                     <li className="list-group-item p-2">
        //                         <span className="title-color-text">Visualización intuitiva y amigable:</span> Disfruta de un diseño claro y adaptable con opciones de tema claro y oscuro.
        //                     </li>
        //                     <li className="list-group-item p-2">
        //                         <span className="title-color-text">Sincronización con otros servicios:</span> (Próximamente) Conecta la aplicación con servicios externos como Google para autenticación segura.
        //                     </li>
        //                     <li className="list-group-item p-2">
        //                         <span className="title-color-text">Facilidad de uso en cualquier dispositivo:</span> Totalmente responsiva, adaptable a computadoras, tablets y smartphones.
        //                     </li>
        //                     <li className="list-group-item p-2">
        //                         <span className="title-color-text">Seguridad y privacidad:</span> Tus datos están protegidos con autenticación segura y almacenamiento cifrado.
        //                     </li>
        //                 </ul>
        //             </div>
        //         </div>

        //         <div className="row mt-4">
        //             <div className="col-12 text-center">
        //                 <h3 className="text-secondary">¡Transforma tu forma de administrar el dinero!</h3>
        //                 <p>Con "Mi Cuenta", ahorrarás tiempo y tomarás decisiones financieras más informadas.</p>
        //                 {/* <a href="https://tuportafolio.com" target="_blank" className="btn btn-primary btn-lg mt-3">
        //                     Visita mi portafolio
        //                 </a> */}
        //             </div>
        //         </div>
        //     </div>            
        // </>
    );
}