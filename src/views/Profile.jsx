import "./Profile.scss"
import { useState, useEffect } from 'react'

import Login from "../components/Login"
import OrderHistory from "../components/OrderHistory"
import OrderHistoryItem from "../components/OrderHistoryItem"

import ToggleNavButton from "./../components/ToggleNavButton"

export const BASE_URL = 'https://airbean.awesomo.dev'
const STATUS_URL = '/api/user/status'
export const HISTORY_URL = '/api/user/history'


export async function isTokenValid(token) {
    // console.log('Ran isTokenValid')
    const response = await fetch(BASE_URL + STATUS_URL, {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    const data = await response.json()
    console.log(response)
    if (response.status === 401) {
        return false
    }
    if (response.status === 200) {
        return true
    }
}

function Profile() {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userName, setUserName] = useState('')

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
                <h2 className="profile__user__name">{ userName }</h2>
                {/* <p className="profile__user__email">sixten.kaffelover@zocom.se</p> */}
            </section>
            <OrderHistory userName={ userName } />
            
            </> :

            <Login 
                setUserName={ setUserName }
                setIsLoggedIn={ setIsLoggedIn }
                /> }
            
        </section>
    )
}
export default Profile