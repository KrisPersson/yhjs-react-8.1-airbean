import "./Profile.scss"
import { useState } from 'react'

import Login from "../components/Login"

import ToggleNavButton from "./../components/ToggleNavButton"

function Profile() {

    const [isLoggedIn, setIsloggedIn] = useState(false)

    function fakeLogin() {
        setIsloggedIn(true)
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
            <Login fakeLogin={ fakeLogin } /> }
            
        </section>
    )
}

export default Profile