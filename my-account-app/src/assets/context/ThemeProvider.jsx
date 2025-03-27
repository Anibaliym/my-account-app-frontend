import { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setTheme] = useState(null);
    
    useEffect(() => {
        const savedTheme = JSON.parse(localStorage.getItem('isDarkMode'));
        if (savedTheme !== null) {  
            setTheme(savedTheme);
            document.body.classList.toggle('dark', savedTheme);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = !isDarkMode;
        setTheme(newTheme);
        localStorage.setItem('isDarkMode', JSON.stringify(newTheme));
        document.body.classList.toggle('dark', newTheme);
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

