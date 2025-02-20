import { updateVignetteColorThemeFetch } from '../../../assets/api/MyAccountAppAPI/DomainServices';
export const SelectColorForm = ({ isDarkMode, vignetteId, setVignetteColorTheme }) => {

    const changeColor = async (color) => {


        console.log(vignetteId, color)
        const { isError } = await updateVignetteColorThemeFetch(vignetteId, color)

        if(!isError)
            setVignetteColorTheme(color);
        else
            console.log('Ocurrió un error al intentar actualizar el color de la viñeta')
            // showUserMessage('Ocurrió un error al intentar actualizar el color de la viñeta.', 'error');  
    }

    return (
        <>
            <div onClick={ () => { changeColor('WHITE') } } className={ `color-selector-item color-selector-${ (isDarkMode ? 'darkTheme' : 'lightTheme' ) }-WHITE` }></div>

            <table>
                <tbody>
                    <tr>
                        <td><div onClick={ () => { changeColor('SOFT_GREEN') } } className={ `color-selector-item color-selector-${ (isDarkMode ? 'darkTheme' : 'lightTheme' ) }-SOFT_GREEN` }></div></td>
                        <td><div onClick={ () => { changeColor('SOFT_YELLOW') } } className={ `color-selector-item color-selector-${ (isDarkMode ? 'darkTheme' : 'lightTheme' ) }-SOFT_YELLOW` }></div></td>
                        <td><div onClick={ () => { changeColor('SOFT_ORANGE') } } className={ `color-selector-item color-selector-${ (isDarkMode ? 'darkTheme' : 'lightTheme' ) }-SOFT_ORANGE` }></div></td>
                        <td><div onClick={ () => { changeColor('SOFT_RED') } } className={ `color-selector-item color-selector-${ (isDarkMode ? 'darkTheme' : 'lightTheme' ) }-SOFT_RED` }></div></td>
                        <td><div onClick={ () => { changeColor('SOFT_BLUE') } } className={ `color-selector-item color-selector-${ (isDarkMode ? 'darkTheme' : 'lightTheme' ) }-SOFT_BLUE` }></div></td>
                        <td><div onClick={ () => { changeColor('SOFT_GRAY') } } className={ `color-selector-item color-selector-${ (isDarkMode ? 'darkTheme' : 'lightTheme' ) }-SOFT_GRAY` }></div></td>
                        <td><div onClick={ () => { changeColor('SOFT_PURPLE') } } className={ `color-selector-item color-selector-${ (isDarkMode ? 'darkTheme' : 'lightTheme' ) }-SOFT_PURPLE` }></div></td>
                    </tr>
                    <tr>
                        <td><div onClick={ () => { changeColor('GREEN') } } className={ `color-selector-item color-selector-${ (isDarkMode ? 'darkTheme' : 'lightTheme' ) }-GREEN` }></div></td>
                        <td><div onClick={ () => { changeColor('YELLOW') } } className={ `color-selector-item color-selector-${ (isDarkMode ? 'darkTheme' : 'lightTheme' ) }-YELLOW` }></div></td>
                        <td><div onClick={ () => { changeColor('ORANGE') } } className={ `color-selector-item color-selector-${ (isDarkMode ? 'darkTheme' : 'lightTheme' ) }-ORANGE` }></div></td>
                        <td><div onClick={ () => { changeColor('RED') } } className={ `color-selector-item color-selector-${ (isDarkMode ? 'darkTheme' : 'lightTheme' ) }-RED` }></div></td>
                        <td><div onClick={ () => { changeColor('BLUE') } } className={ `color-selector-item color-selector-${ (isDarkMode ? 'darkTheme' : 'lightTheme' ) }-BLUE` }></div></td>
                        <td><div onClick={ () => { changeColor('GRAY') } } className={ `color-selector-item color-selector-${ (isDarkMode ? 'darkTheme' : 'lightTheme' ) }-GRAY` }></div></td>
                        <td><div onClick={ () => { changeColor('PURPLE') } } className={ `color-selector-item color-selector-${ (isDarkMode ? 'darkTheme' : 'lightTheme' ) }-PURPLE` }></div></td>
                    </tr>
                    <tr>
                        <td><div onClick={ () => { changeColor('STRONG_GREEN') } } className={ `color-selector-item color-selector-${ (isDarkMode ? 'darkTheme' : 'lightTheme' ) }-STRONG_GREEN` }></div></td>
                        <td><div onClick={ () => { changeColor('STRONG_YELLOW') } } className={ `color-selector-item color-selector-${ (isDarkMode ? 'darkTheme' : 'lightTheme' ) }-STRONG_YELLOW` }></div></td>
                        <td><div onClick={ () => { changeColor('STRONG_ORANGE') } } className={ `color-selector-item color-selector-${ (isDarkMode ? 'darkTheme' : 'lightTheme' ) }-STRONG_ORANGE` }></div></td>
                        <td><div onClick={ () => { changeColor('STRONG_RED') } } className={ `color-selector-item color-selector-${ (isDarkMode ? 'darkTheme' : 'lightTheme' ) }-STRONG_RED` }></div></td>
                        <td><div onClick={ () => { changeColor('STRONG_BLUE') } } className={ `color-selector-item color-selector-${ (isDarkMode ? 'darkTheme' : 'lightTheme' ) }-STRONG_BLUE` }></div></td>
                        <td><div onClick={ () => { changeColor('STRONG_GRAY') } } className={ `color-selector-item color-selector-${ (isDarkMode ? 'darkTheme' : 'lightTheme' ) }-STRONG_GRAY` }></div></td>
                        <td><div onClick={ () => { changeColor('STRONG_PURPLE') } } className={ `color-selector-item color-selector-${ (isDarkMode ? 'darkTheme' : 'lightTheme' ) }-STRONG_PURPLE` }></div></td>
                    </tr>
                </tbody>
            </table>
        </>
)
}
