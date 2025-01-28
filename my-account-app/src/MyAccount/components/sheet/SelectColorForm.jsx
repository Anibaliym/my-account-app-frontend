export const SelectColorForm = ({ isDarkMode }) => {


    return (
        <table>
            <tbody>
                <tr>
                    <td><div className={ `color-selector-item color-selector-${ (isDarkMode ? 'darkTheme' : 'lightTheme' ) }-WHITE` }></div></td>
                    <td><div className={ `color-selector-item color-selector-${ (isDarkMode ? 'darkTheme' : 'lightTheme' ) }-GREEN` }></div></td>
                    <td><div className={ `color-selector-item color-selector-${ (isDarkMode ? 'darkTheme' : 'lightTheme' ) }-YELLOW` }></div></td>
                    <td><div className={ `color-selector-item color-selector-${ (isDarkMode ? 'darkTheme' : 'lightTheme' ) }-ORANGE` }></div></td>
                </tr>
                <tr>
                    <td><div className={ `color-selector-item color-selector-${ (isDarkMode ? 'darkTheme' : 'lightTheme' ) }-RED` }></div></td>
                    <td><div className={ `color-selector-item color-selector-${ (isDarkMode ? 'darkTheme' : 'lightTheme' ) }-BLUE` }></div></td>
                    <td><div className={ `color-selector-item color-selector-${ (isDarkMode ? 'darkTheme' : 'lightTheme' ) }-GRAY` }></div></td>
                    <td><div className={ `color-selector-item color-selector-${ (isDarkMode ? 'darkTheme' : 'lightTheme' ) }-PURPLE` }></div></td>
                </tr>
                <tr>
                    <td><div className={ `color-selector-item color-selector-${ (isDarkMode ? 'darkTheme' : 'lightTheme' ) }-SOFT_GREEN` }></div></td>
                    <td><div className={ `color-selector-item color-selector-${ (isDarkMode ? 'darkTheme' : 'lightTheme' ) }-SOFT_YELLOW` }></div></td>
                    <td><div className={ `color-selector-item color-selector-${ (isDarkMode ? 'darkTheme' : 'lightTheme' ) }-SOFT_ORANGE` }></div></td>
                    <td><div className={ `color-selector-item color-selector-${ (isDarkMode ? 'darkTheme' : 'lightTheme' ) }-SOFT_RED` }></div></td>
                </tr>
                <tr>
                    <td><div className={ `color-selector-item color-selector-${ (isDarkMode ? 'darkTheme' : 'lightTheme' ) }-SOFT_BLUE` }></div></td>
                    <td><div className={ `color-selector-item color-selector-${ (isDarkMode ? 'darkTheme' : 'lightTheme' ) }-SOFT_GRAY` }></div></td>
                    <td><div className={ `color-selector-item color-selector-${ (isDarkMode ? 'darkTheme' : 'lightTheme' ) }-SOFT_PURPLE` }></div></td>
                    <td><div className={ `color-selector-item color-selector-${ (isDarkMode ? 'darkTheme' : 'lightTheme' ) }-STRONG_GREEN` }></div></td>
                </tr>
                <tr>
                    <td><div className={ `color-selector-item color-selector-${ (isDarkMode ? 'darkTheme' : 'lightTheme' ) }-STRONG_YELLOW` }></div></td>
                    <td><div className={ `color-selector-item color-selector-${ (isDarkMode ? 'darkTheme' : 'lightTheme' ) }-STRONG_ORANGE` }></div></td>
                    <td><div className={ `color-selector-item color-selector-${ (isDarkMode ? 'darkTheme' : 'lightTheme' ) }-STRONG_RED` }></div></td>
                    <td><div className={ `color-selector-item color-selector-${ (isDarkMode ? 'darkTheme' : 'lightTheme' ) }-STRONG_BLUE` }></div></td>
                </tr>
                <tr>
                    <td><div className={ `color-selector-item color-selector-${ (isDarkMode ? 'darkTheme' : 'lightTheme' ) }-STRONG_GRAY` }></div></td>
                    <td><div className={ `color-selector-item color-selector-${ (isDarkMode ? 'darkTheme' : 'lightTheme' ) }-STRONG_PURPLE` }></div></td>
                </tr>
            </tbody>
        </table>
)
}
