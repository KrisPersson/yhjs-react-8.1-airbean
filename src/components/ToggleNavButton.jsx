import { useState } from 'react'

import "./ToggleNavButton.scss"

import NavMenu from "./Nav"

function ToggleNavButton(props) {

    const [showMenu, setShowMenu] = useState(false);
    
    function handleClick() {
        setShowMenu(!showMenu);
    }

    return (
        <div>
            <div className="toggleNavButton" onClick={ handleClick } style={ showMenu === true ? { backgroundColor: "white" } : { backgroundColor: "black" } }>
                { /*TODO sätt en ikon eller CSS*/ }
            </div>
            { showMenu === true && <NavMenu isLoggedIn={ false /*TODO lägg in en inloggningstoken*/ }/> }
        </div>
    )
}

export default ToggleNavButton;