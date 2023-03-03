import "./Login.scss"

import { useState } from 'react'

function Login( { fakeLogin } ) {


    const [isCreateAccountMode, setIsCreateAccountMode] = useState(false)
    const [nameInput, setNameInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')

    function handleNameInput(event) {
        const value = event.target.value
        setNameInput(value)
    }

    function handlePasswordInput(event) {
        const value = event.target.value
        setPasswordInput(value)
    }


    function handleLogin() {

        const nameField = nameInput
        const passwordField = passwordInput
        fakeLogin()
        
    }

    function handleCreateAccount() {
        const nameField = nameInput
        const passwordField = passwordInput

    }

    


    return (
        <article className="login">
            <img className="login__logo" src="/login-logo.svg" alt="Airbean logo" />
            <h1>Välkommen till AirBean-familjen!</h1>
            <h4>{ isCreateAccountMode ? 
                "Genom att skapa ett konto nedan kan du spara och se din orderhistorik." :
                "Logga in nedan för att se din orderhistorik."}
            </h4>
            <label>
                Namn
                <input onChange={ handleNameInput } type="text" />
            </label>
            <label>
                Lösenord
                <input onChange={ handlePasswordInput } className="password" type="password" />
            </label>
            <p>{ isCreateAccountMode ? 
                "Redan medlem? Logga in " : 
                "Inget konto? Skapa ett "} 
                <a onClick={ () => setIsCreateAccountMode(!isCreateAccountMode) }>här</a>
            </p>
            {
                isCreateAccountMode ? 
                <button onClick={ handleCreateAccount }>Skapa konto</button> :
                <button onClick={ handleLogin }>Logga in</button>
            }
        </article>
    )
}

export default Login