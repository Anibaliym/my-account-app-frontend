export const CustomInputText = ({ isDarkMode, inputRef, value, onChangeEvent, onKeyDownEvent, placeHolder }) => {
    
    return (
        <div className={ `${ isDarkMode ? 'dark-mode' : 'light-mode' }` }>
            <input 
                ref={ inputRef }
                type="text" 
                className="custom-input text-center" 
                placeholder={ placeHolder }
                maxLength="30"
                onChange={ (e) => ( onChangeEvent(e.target.value) ) }
                onKeyDown={ (e) => ( onKeyDownEvent(e) ) }
                value={ value }                    
            />
        </div>
    )
}
