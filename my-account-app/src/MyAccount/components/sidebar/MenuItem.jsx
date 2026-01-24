import { useNavigate, useLocation } from 'react-router-dom';
import { useWindowSize } from '../../hooks/useWindowSize';

export const MenuItem = ({ navigateTo = '/error',description = 'menú name',icon = '',setToggleSidebar }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { width: screenWidth } = useWindowSize();

    const normalizePath = (p) => (p.startsWith('/') ? p : `/${p}`);
    const targetPath = normalizePath(navigateTo);

    const isActive = location.pathname === targetPath || location.pathname.startsWith(`${targetPath}/`);

    const handleClick = () => {
        if (screenWidth <= 500) setToggleSidebar(true);
        navigate(targetPath);
    };

    return (
        <div style={{ borderRadius:'2px' }} className={isActive ? 'dropdown-btn-active' : ''}>
            <button className={`dropdown-btn ${isActive ? 'dropdown-btn-active' : ''}`} onClick={handleClick}>
                <i className={`${icon} icon-menu ml-1`} />
                <span className="animate__animated animate__fadeIn">{description}</span>
            </button>
        </div>
    );
};