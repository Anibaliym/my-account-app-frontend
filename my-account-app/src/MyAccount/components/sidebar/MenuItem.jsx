import { useNavigate } from 'react-router-dom';
import { useWindowSize } from '../../hooks/useWindowSize';

export const MenuItem = ({ navigateTo = '/error', description = 'menú name', icon = '', setToggleSidebar }) => {
    const navigate = useNavigate();
    const { width: screenWith } = useWindowSize();

    const handleClick = () => {
        //si el ancho de la pantalla es menor a 500px (mobile) entonces contrae el sidebar
        if(screenWith <= 500)
            setToggleSidebar(true); 

        navigate(navigateTo); 
    }

    return (
        <div>
            <button 
                className="dropdown-btn"
                onClick={handleClick}
            >
                <i className={ `${ icon } icon-menu ml-1` }></i>
                <span className="animate__animated animate__fadeIn">{description}</span>
            </button>
        </div>
    );
};