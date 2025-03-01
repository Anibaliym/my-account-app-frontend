import { Tooltip } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

export const MenuItem = ({ navigateTo = '/error', description = 'menú name', icon = '' }) => {
    const navigate = useNavigate();

    return (
        <Tooltip
            placement="right"
            content={ description }
            color="secondary"
            closeDelay={ 50 }
        >
            <div className="menu-item">
                <button 
                    className="dropdown-btn"
                    onClick={() => navigate(navigateTo)}
                >
                    <i className={ `${ icon } icon` }></i>
                    <span className="animate__animated animate__fadeIn">{description}</span>
                </button>
            </div>
        </Tooltip>
    );
};