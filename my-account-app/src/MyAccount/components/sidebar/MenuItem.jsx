import { Tooltip } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

export const MenuItem = ({ navigateTo = '/error', description = 'menú name', icon = '' }) => {
    const navigate = useNavigate();

    return (
        <div>
            <button 
                className="dropdown-btn"
                onClick={() => navigate(navigateTo)}
            >
                <i className={ `${ icon } icon-menu ml-1` }></i>
                <span className="animate__animated animate__fadeIn">{description}</span>
            </button>
        </div>
    );
};