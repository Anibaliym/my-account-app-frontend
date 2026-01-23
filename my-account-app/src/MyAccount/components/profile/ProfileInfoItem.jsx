export const ProfileInfoItem = ({icon, firstTitle, secondTitle }) => {
    return (
        <div className="info-item mb-2">
            <div className="info-item-left">
                <div className="info-item-icon">
                    <i className={ `bx ${ icon } text-color-default card-icon ml-1` }></i>
                </div>
                <div className="info-item-text">
                    <span className="info-item-title">{ firstTitle }</span>
                    <span className="info-item-subtitle">{ secondTitle }</span>
                </div>
            </div>
        </div>
    )
}
