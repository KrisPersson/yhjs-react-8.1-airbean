import "./Profile.scss"
import { useState, useEffect } from 'react'

import Login from "../components/Login"
import OrderHistory from "../components/OrderHistory"
import OrderHistoryItem from "../components/OrderHistoryItem"
import ToggleNavButton from "./../components/ToggleNavButton"

export const BASE_URL = 'https://airbean.awesomo.dev'
const STATUS_URL = '/api/user/status'
export const HISTORY_URL = '/api/user/history'


function Profile() {

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    async function isTokenValid(token) {
        const response = await fetch(BASE_URL + STATUS_URL, {
            method: "GET",
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        const data = await response.json()
        
        if (response.status === 200) {
            setIsLoggedIn(true)
        } else {
            sessionStorage.setItem('username', '')
            setIsLoggedIn(false)
        }
    }

    useEffect( () => {
        isTokenValid(sessionStorage.token)
    }) 

    return (
        <section className="profile">
             <header><ToggleNavButton /></header>
        {  isLoggedIn ?  
            <>  
                <section className="profile__user">
                    <article className='profile__user__photo'>
                        <aside className="avatar-head"></aside>
                        <aside className="avatar-body"></aside>
                    </article>
                    <h2 className="profile__user__name">{ sessionStorage.username }</h2>
                </section>
                <OrderHistory userName={ sessionStorage.username } />
            
            </> 
            :
            <Login 
                setIsLoggedIn={ setIsLoggedIn }
            /> 
        }
            
        </section>
    )
}
export default Profile