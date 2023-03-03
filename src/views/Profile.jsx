import "./Profile.scss"
import { useState } from 'react'

import Login from "../components/Login"

import ToggleNavButton from "./../components/ToggleNavButton"


const BASE_URL = 'https://airbean.awesomo.dev'
const STATUS_URL = '/api/user/status'
const HISTORY_URL = '/api/user/history'

function Profile() {

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    async function isTokenValid(token) {

        const response = await fetch(BASE_URL + '/api/user/status', {
            method: "GET",
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        if (response.status === 401) {
            return false
        }
        if (response.status === 200) {
            return true
        }
    }

    async function getOrderHistory() {

        const response = await fetch(BASE_URL + HISTORY_URL, {
            method: "GET",
            headers: {
                authorization: `Bearer ${sessionStorage.token}`
              }
        })
        const data = await response.json()
        console.log(data)

        if (data.success) {
            console.log('Order history for this user exists!')
        } else if (!data.success) {
            console.log(data.message)
        }
    }

    if (isLoggedIn && isTokenValid(sessionStorage.token)) {
        getOrderHistory()
    } else if (isLoggedIn) {
        setIsLoggedIn(false)
    }

    

    
    

    return (
        <section className="profile">
             
        { isLoggedIn ?  <>  <section className="profile__user">
                <article className='profile__user__photo'>
                    <aside className="avatar-head"></aside>
                    <aside className="avatar-body"></aside>
                </article>
                <h2 className="profile__user__name">Sixten Kaffelövér</h2>
                <p className="profile__user__email">sixten.kaffelover@zocom.se</p>
            </section>
            <ul className="profile__order-history">
                <h3>Orderhistorik</h3>
                <li className="profile__order-history__order-item">
                    <p className="profile__order-history__order-item__id">#AB1123282323Z</p>
                    <p className="profile__order-history__order-item__date">20/03/06</p>
                    <p className="profile__order-history__order-item__total-sum">total ordersumma</p>
                    <p className="profile__order-history__order-item__amount">443 kr</p>
                </li>
                <li className="profile__order-history__order-item">
                    <p className="profile__order-history__order-item__id">#AB1128382323X</p>
                    <p className="profile__order-history__order-item__date">20/03/03</p>
                    <p className="profile__order-history__order-item__total-sum">total ordersumma</p>
                    <p className="profile__order-history__order-item__amount">333 kr</p>
                </li>
                <li className="profile__order-history__order-item">
                    <p className="profile__order-history__order-item__id">#AB1444482323X</p>
                    <p className="profile__order-history__order-item__date">20/02/21</p>
                    <p className="profile__order-history__order-item__total-sum">total ordersumma</p>
                    <p className="profile__order-history__order-item__amount">893 kr</p>
                </li>
                <li className="profile__order-history__order-item profile__order-history__order-item--total-spent">
                    <h4>Totalt spenderat</h4>
                    <p className="profile__order-history__order-item--total-spent__total-amt">1669 kr</p>
                </li>
            </ul> </> :

            <Login setIsLoggedIn={ setIsLoggedIn } /> }
            
        </section>
    )
}

export default Profile