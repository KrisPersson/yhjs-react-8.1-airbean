import "./Login.scss"

import { useState } from 'react'

const BASE_URL = 'https://airbean.awesomo.dev'
const SIGNUP_URL = '/api/user/signup'
const LOGIN_URL = '/api/user/login'

function Login( { setIsLoggedIn } ) {

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

    async function handleLogin() {

        const userInput = {
            username: nameInput,
            password: passwordInput
        }
        
        try {
            const response = await fetch(BASE_URL + LOGIN_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userInput)
            })
            const data = await response.json()

            if (!response.ok) {
                throw new Error(`Could not login at this time: ${response.status}`)
            } else if (!data.success) {
                console.log(data.message)
            } else if (data.success) {
                console.log(`Successfully logged in! Token: ${data.token} `)
                sessionStorage.setItem('token', data.token)
                sessionStorage.setItem('username', userInput.username)

                setIsLoggedIn(true)
            }

        } catch (error) {
            console.log(error)
        }
    }

    async function handleCreateAccount() {
        
        const userInput = {
            username: nameInput,
            password: passwordInput
        }

        try {
            const response = await fetch(BASE_URL + SIGNUP_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userInput)
            })
            if (!response.ok) {
                throw new Error(`Could not signup at this time: ${response.status}`)
            } else if (response.status === 200) {
                console.log("Successfully signed up!")
                setIsCreateAccountMode(false)
            }

            const data = await response.json()
            
        } catch (error) {
            console.log(error)
        }
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