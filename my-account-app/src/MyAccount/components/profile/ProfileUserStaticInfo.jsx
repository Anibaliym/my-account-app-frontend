import { ProfileInfoItem } from "./ProfileInfoItem"

export const ProfileUserStaticInfo = ({ name, userType, userCreationDate, userLastAccess }) => {

    return (
        <div className="sheet-balances-form">
            <div className="pstatic-hero">
                <div className="pstatic-avatar">
                    <span className="pstatic-avatar-icon">👤</span>
                </div>

                <figure>
                    <blockquote className="blockquote">
                        <p className="text-medium font-medium">{ name }</p>
                    </blockquote>
                    <figcaption className="blockquote-footer" style={{fontSize:'10px'}}>
                        Perfil del usuario
                    </figcaption>
                </figure>
            </div>

            <h4 className="pstatic-section-title mt-3 text-color-default">RESUMEN</h4>

            <ProfileInfoItem icon={'bxs-envelope'} firstTitle={'Email'} secondTitle={'Anibaliym@gmail.com'}/>
            <ProfileInfoItem icon={'bxs-star'} firstTitle={'Tipo de usuario'} secondTitle={ userType }/>
            <ProfileInfoItem icon={'bxs-calendar'} firstTitle={'Miembro desde'} secondTitle={ userCreationDate }/>
            <ProfileInfoItem icon={'bxs-time'} firstTitle={'Último acceso'} secondTitle={' -'}/>
        </div>
    )
}
