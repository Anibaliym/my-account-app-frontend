import { useContext } from 'react';
import { ThemeContext } from '../../../assets/context/ThemeProvider';

export const CustomInputText = ({ inputRef, value, onChangeEvent, onKeyDownEvent, placeHolder, textAlign = 'text-center' }) => {
    const { isDarkMode } = useContext(ThemeContext);

    return (
        <div className={`${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            <input
                ref={inputRef}
                type="text"
                className={`custom-input ${textAlign}`}
                placeholder={placeHolder}
                maxLength="30"
                onChange={(e) => (onChangeEvent(e.target.value))}
                onKeyDown={(e) => (onKeyDownEvent(e))}
                value={value}
            />
        </div>
    )
}
