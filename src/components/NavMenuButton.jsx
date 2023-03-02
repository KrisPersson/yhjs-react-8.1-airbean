import { useState } from 'react'

import "./NavMenuButton.scss"

import NavMenu from "./Navmenu"

function NavMenuButton() {

    const [showMenu, setShowMenu] = useState(false);
    
    function handleClick() {
        setShowMenu(!showMenu)
    }

    return (
        <div>
            <div className="navMenuButton" onClick={ handleClick }>
                { /*TODO sätt en ikon eller CSS*/ }
            </div>
            { showMenu === true && <NavMenu showMenu={ showMenu }/> }
        </div>
    )
}

export default NavMenuButton;