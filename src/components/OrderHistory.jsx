import "./OrderHistory.scss"
import { useState, useEffect } from "react"
import { BASE_URL, HISTORY_URL } from "../views/Profile"

import OrderHistoryItem from "./OrderHistoryItem"


function compileOrderHistory(arr) {
    return arr.map(order => {
        return <OrderHistoryItem key={order.orderNr} id={order.orderNr} orderDate={order.orderDate} total={order.total}  />
    })
}

function computeTotalSpent(arr) {
    return arr.reduce((acc, currentOrder) => {
        return acc + currentOrder.total
    }, 0)
}


function OrderHistory({ userName }) {

    const [orderHistory, setOrderHistory] = useState([])


    useEffect( () => {
        getOrderHistory()
    }, [])

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
            setOrderHistory([...data.orderHistory].reverse())
        } else if (!data.success) {
            console.log(data.message)
        }
    }

    return (
        <ul className="profile__order-history">
            <h3>Orderhistorik</h3>
            { 
                orderHistory.length === 0 ? 

                <p className="profile__order-history__no-history">Det finns ingen orderhistorik för { userName }</p> 
                :
                <>
                    { compileOrderHistory(orderHistory) }
                    <li className="profile__order-history__order-item profile__order-history__order-item--total-spent">
                        <h4>Totalt spenderat</h4>
                        <p className="profile__order-history__order-item--total-spent__total-amt">{ computeTotalSpent(orderHistory) } kr</p>
                    </li>
                </>
            }
            
        </ul> 
    )
}

export default OrderHistory