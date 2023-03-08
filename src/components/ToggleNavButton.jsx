import { useState } from "react"

import "./ToggleNavButton.scss"

import NavMenu from "./Nav"

function ToggleNavButton(props) {

    const [showMenu, setShowMenu] = useState(false);
    function handleClick() {
        setShowMenu(!showMenu)
    }

    return (
        <div>
            <div className={showMenu ? "toggleNavClose" : "toggleNavButton"} onClick={ handleClick }></div>
            { showMenu === true && <NavMenu /> }
        </div>
    )
}

export default ToggleNavButton;