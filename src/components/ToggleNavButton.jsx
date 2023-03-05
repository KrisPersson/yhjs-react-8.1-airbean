import { useState } from 'react'

import "./ToggleNavButton.scss"

import NavMenu from "./Nav"

function ToggleNavButton(props) {

    const [showMenu, setShowMenu] = useState(false);
    
    function handleClick() {
        setShowMenu(!showMenu)
    }

    return (
        <div>
            <div className="toggleNavButton" onClick={ handleClick }>
                { /*TODO sätt en ikon eller CSS*/ }
            </div>
            { showMenu === true && <NavMenu showMenu={ showMenu } isLoggedIn={ true /*TODO lägg in en inloggningstoken*/ }/> }
        </div>
    )
}

export default ToggleNavButton;