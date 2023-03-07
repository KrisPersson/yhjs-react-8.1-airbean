import "./Cart.scss"
import {useState} from "react"
import {useSelector, useDispatch} from "react-redux"
import MenuItem from "./menuItem"
import CartCounter from "./CartCounter"
import {useNavigate} from "react-router-dom"
import {emptyCart} from "../actions/cartActions"

export default function Cart() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showCart, setShowCart] = useState(false);
    const cart = useSelector(state => state.cart)
    const menuItems = cart.map((item, i) => {
        return (
            <section className="order__items" key={i}>
                <MenuItem props={{
                    title: item.title,
                    end: <CartCounter item={item} />,
                    desc: (item.price * item.count) + " kr",
                    small: true
                }} />
            </section>
        )
    })
    const itemsCount = cart.reduce((acc, item) => acc + item.count, 0)
    let totalSum = cart.reduce((acc, item) => acc + (item.price * item.count), 0)

    const bryggKaffeCount = cart.find(item => item.id === "coffee-vxig26my4y")?.count ?? 0
    const gustBakCount = cart.find(item => item.id === "pastry-db3gfsuqpr")?.count ?? 0
    const campaingnCount = Math.min(bryggKaffeCount, gustBakCount)
    totalSum = totalSum - 49 * campaingnCount

    function handleToggleClick(e) {
        const parent = e.currentTarget.parentElement
        if(showCart) {
            parent.style.height = "0"
        } else {
            parent.style.height = "100%"
        }
        setShowCart(!showCart)
    }

    async function handleBuyClick() {
        if(itemsCount === 0) { // man kan ej beställa 0 varor
            console.log("Varukorgen är tom!")
            return
        }
        if(!sessionStorage.orders) {
            sessionStorage.orders = "[]"
        }
        
        const order = { // objektet som skickas till APIet vid order
            details: {
                order: makeOrderArrayFromCart(cart)
            }
        }

        let authorization = ""
        const validToken = await isTokenValid(sessionStorage.token)
        if(validToken) {
            authorization = `Bearer ${sessionStorage.token}`
        }

        fetch("https://airbean.awesomo.dev/api/beans/order",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: authorization
            },
            body: JSON.stringify(order)
        })
        .then(response => {
            if(!response.ok) {
                throw new Error(`Something wrong with the order: ${response.status}`)
            }
            return response.json()
        })
        .then (data => {
            // console.log(data)
            const savedOrders = JSON.parse(sessionStorage.orders)
            savedOrders.push(data)
            // console.log(savedOrders)
            sessionStorage.orders = JSON.stringify(savedOrders)
            navigate("/status")
        })
        dispatch(emptyCart())
    }
    return (
        <section className="cart">
            <section className="icon" onClick={(e) => handleToggleClick(e)}>
                <div className="icon__number">{itemsCount}</div>
                <img src="shoppingbag.svg" alt="shoppingbag" />
            </section>
            {showCart &&
            <section className="order">
                <div className="order__arrow"></div>
                <h2 className="order__h2">Din beställning</h2>
                {menuItems}
                <section className="order__total">
                    {campaingnCount > 0 && 
                    <div className="order__campaign">
                        <MenuItem props={{
                            title: "Bryggkaffe + G.A.bakelse",
                            end: campaingnCount,
                            desc: "-" + campaingnCount * 49 + " kr",
                            small: true
                        }} />
                    </div>
                    }
                    <MenuItem props={{
                        title: "Total",
                        end: totalSum,
                        desc: "inkl moms + drönarleverans",
                        small: false
                    }} />
                </section>
                <button className="pay-button" onClick={handleBuyClick} disabled={itemsCount === 0}>
                    Take my money!
                </button>
            </section>
            }
        </section>
    )
}

function makeOrderArrayFromCart(cart) {
    const orderArray = []
    for(let i = 0; i < cart.length; i++) {
        for(let j = 0; j < cart[i].count; j++) {
            orderArray.push({
                name: cart[i].title,
                price: cart[i].price
            })
        }
    }
    return orderArray
}

async function isTokenValid(token) {
    const response = await fetch('https://airbean.awesomo.dev/api/user/status', {
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