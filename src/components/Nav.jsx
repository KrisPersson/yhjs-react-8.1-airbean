
import "./Nav.scss"

import { Link } from 'react-router-dom'

function NavMenu(props) {

    const isLoggedIn = props.isLoggedIn;

    return (
        <div className="nav">
            <Link to="/Menu" className="navLink">Meny</Link>
            <Link to="/About" className="navLink" >Vårt kaffe</Link>
            <Link to="/Profile" className="navLink" >Min profil</Link>
            <Link to="/Status" className="navLink" >Orderstatus</Link>
        </div>
    )
}

export default NavMenu