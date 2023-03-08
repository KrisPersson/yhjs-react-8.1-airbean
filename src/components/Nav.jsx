
import "./Nav.scss"

import { Link } from 'react-router-dom'

function Nav() {

    const loginStatus = sessionStorage.token;

    return (
        <div className="nav">
            <Link to="/Menu" className="navLink"><h2>Meny</h2></Link>
            <Link to="/About" className="navLink" ><h2>Vårt kaffe</h2></Link>
            { loginStatus === true ?
                <Link to="/Profile" className="navLink" ><h2>Min profil</h2></Link> :
                <Link to="/Profile" className="navLink" ><h2>Registrera konto</h2></Link> }
            <Link to="/Status" className="navLink" ><h2>Orderstatus</h2></Link>
        </div>
    )
}

export default Nav;