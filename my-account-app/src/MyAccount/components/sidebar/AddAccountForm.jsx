import { Tooltip } from '@nextui-org/react';

export const AddAccountForm = ({ newAccount, newAccountName, onChangeAccountName, onKeyDownAccountName, setNewAccount, isDarkMode }) => {

    return (
        <>
            <Tooltip
                placement="bottom"
                content="crea una cuenta"
                color="secondary"
                closeDelay={ 50 }
            >
                <button className="dropdown-btn d-flex justify-content-center align-items-center mt-1" onClick={() => ( setNewAccount(!newAccount) )}>
                    <i className='bx bx-plus-medical' ></i>
                </button>
            </Tooltip>
            {
                (newAccount) && (
                    <input 
                        type="text" 
                        className={ `animate__animated animate__fadeIn d-flex justify-content-center align-items-center mt-1 text-center no-focus form-control form-control-sm animate__animated animate__fadeInDown animate__faster ${ (isDarkMode) ? 'bg-dark text-light' : '' }` }
                        placeholder="nombre cuenta"
                        value={ newAccountName }
                        onChange={ onChangeAccountName }
                        onKeyDown={ onKeyDownAccountName }
                        maxLength="30"
                    />
                )
            }        

            <hr />
        </>        
    )
}
