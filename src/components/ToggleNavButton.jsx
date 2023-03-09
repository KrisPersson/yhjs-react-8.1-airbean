import { useState } from "react"
import Hamburger from 'hamburger-react'

import "./ToggleNavButton.scss"

import NavMenu from "./Nav"

function ToggleNavButton(props) {
    const [isOpen, setOpen] = useState(false)
    const [showMenu, setShowMenu] = useState(false);
    function handleClick() {
        setShowMenu(!showMenu)
    }

    return (
        <div>
            <div className={showMenu ? "toggleNavClose" : "toggleNavButton"} onClick={ handleClick }>
            <Hamburger toggled={isOpen} toggle={setOpen} />
            </div>
            { showMenu === true && <NavMenu /> }
            
        </div>
    )
}

export default ToggleNavButton;