import { useContext } from 'react';
import { ThemeContext } from '../../../assets/context/ThemeProvider';

export const ToggleTheme = () => {
    const { toggleTheme } = useContext(ThemeContext); 

    return (
        <div className="toggle-switch" onClick={ toggleTheme }>
            <span className="switch"></span>
        </div>
    )
}

