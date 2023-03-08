import "./Status.scss"
import ToggleNavButton from "../components/ToggleNavButton"
import {useState, useEffect } from "react"
import {useNavigate, useLocation } from "react-router-dom"
import { BASE_URL, HISTORY_URL } from "./Profile"

const ORDER_STATUS_URL = `/api/beans/order/status/`

function Status( {props}) {

    const navigate = useNavigate()
    const orders = JSON.parse(sessionStorage.orders)
    const [eta, setEta] = useState(0)
    const [currentOrderNum, setCurrentOrderNum] = useState('')

    const { state } = useLocation()

    // console.log(state)

    async function getOrderHistory() {

        const response = await fetch(BASE_URL + HISTORY_URL, {
            method: "GET",
            headers: {
                authorization: `Bearer ${sessionStorage.token}`
              }
        })
        const data = await response.json()
        //console.log(data)
    
        if (data.success) {
            //console.log('Order history for this user exists!')
            const orderHistory = [...data.orderHistory].reverse()
            //console.log(orderHistory[0].orderNr)
            setCurrentOrderNum(orderHistory[0].orderNr)
        } else if (!data.success) {
            //console.log(data.message)
        }
    }

    async function getOrderStatus(orderNr) {

        const response = await fetch(BASE_URL + ORDER_STATUS_URL + orderNr, {
            method: "GET",
            headers: {
                authorization: `Bearer ${sessionStorage.token}`
              }
        })
        const data = await response.json()
        // console.log(data.orderNr)
    
        if (data.eta) {
            setEta(data.eta)
        } 
    }

    useEffect( () => {
        getOrderHistory()
    })

    useEffect( () => {
        getOrderStatus(currentOrderNum)
    }, [currentOrderNum])

    


    return (
        <section className="wrapper">
            <ToggleNavButton/>
            <p className="wrapper__order wrapper__bounce">
                Ordernummer 
                <span className="wrapper__orderNumber">
                     #{ currentOrderNum }
                </span>
            </p>
            <figure className="wrapper__drone"></figure>

            <h1 className="wrapper__h1">Din beställning är på väg!</h1>
            <h2 className="wrapper__h2">{ eta } minuter</h2>
            <button className="wrapper__button" onClick={()=> {navigate("/about")}}>ok, cool!</button>
        </section>
    )
}

export default Status