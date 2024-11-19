export const CardTest = () => {

    return (
        <div className="card-test animate__animated animate__fadeIn animate__faster">
            <div className="card-test-header">
                Descripción: 
            </div>
            <div className="card-test-title">
                <input className="card-input-text display-6" placeholder="ingrese el nombre de la cuenta" type="text" value="Cuentas " />
            </div>
            <div className="card-test-text mt-3">


                <p className="text-right">
                    <small>
                        Representa una cuenta con sus respectivas hojas de cálculos
                    </small>
                </p>
            </div>
            <div className="card-test-footer">
                footer
            </div>
        </div>        
    )
}
