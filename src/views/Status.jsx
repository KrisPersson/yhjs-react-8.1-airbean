import "./Status.scss"
import ToggleNavButton from "../components/ToggleNavButton"
import {useState, useEffect } from "react"
import {useNavigate} from "react-router-dom"
import { BASE_URL, HISTORY_URL } from "./Profile"

const ORDER_STATUS_URL = `/api/beans/order/status/`

function Status() {

    const navigate = useNavigate()
    const orders = sessionStorage.orders ? JSON.parse(sessionStorage.orders) : []
    const [eta, setEta] = useState(0)
    const [currentOrderNum, setCurrentOrderNum] = useState('')



    async function getOrderHistory() {

        const response = await fetch(BASE_URL + HISTORY_URL, {
            method: "GET",
            headers: {
                authorization: sessionStorage.token ? `Bearer ${sessionStorage.token}` : ''
              }
        })
        const data = await response.json()
    
        if (data.success) {
            const orderHistory = [...data.orderHistory].reverse()
            setCurrentOrderNum(orderHistory[0].orderNr)
        } else if (!data.success) {
           if (orders.length > 0) {setCurrentOrderNum(orders[orders.length - 1].orderNr)}
        }
    }

    async function getOrderStatus(orderNr) {

        const response = await fetch(BASE_URL + ORDER_STATUS_URL + orderNr, {
            method: "GET",
            headers: {
                authorization: sessionStorage.token ? `Bearer ${sessionStorage.token}` : ''
              }
        })
        const data = await response.json()
    
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

            {
            currentOrderNum ?
                <p className="wrapper__order wrapper__bounce">
                Ordernummer 
                <span className="wrapper__orderNumber">
                     #{ currentOrderNum }
                </span>
                </p>
            :
            ''
            }
            <figure className="wrapper__drone"></figure>

            <h1 className="wrapper__h1">{ currentOrderNum && eta > 0 ? 'Din beställning är på väg!' : "Gå till menyn för att göra en beställning" }</h1>
            <h2 className="wrapper__h2">{ currentOrderNum && eta > 0 ? `${ eta } minuter` : currentOrderNum && eta === 0 ? 'Din beställning har levererats!' : '' }</h2>
            <button className="wrapper__button" onClick={()=> {navigate("/menu")}}>Ok, cool!</button>
        </section>
    )
}

export default Status

