
import "./NavMenu.scss"

function NavMenu(props) {

    return (
        <div className="navMenu">
            <h2 className="menuButton">Meny</h2>
            <h2 className="menuButton">Vårt kaffe</h2>
            { props.showMenu === true ? <h2 className="menuButton">Min profil</h2> : "" }
            <h2 className="menuButton">Orderstatus</h2>
            { props.showMenu === true ? <h2 className="menuButton">Orderhistorik</h2> : "" }
        </div>
    )
}

export default NavMenu