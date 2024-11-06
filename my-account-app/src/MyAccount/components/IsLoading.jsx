export const IsLoading = ({ isDarkMode }) => {
    return (
        <div className="row mt-3 animate__animated animate__fadeInDown animate__faster">
            <div className="col d-flex justify-content-center">
                <div className={ `spinner-border text-${ (isDarkMode) ? 'light' : 'dark' }` } role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>    

    )
}
