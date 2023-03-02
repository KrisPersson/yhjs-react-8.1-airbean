import "./Cart.scss"
import {useState} from "react"
import {useSelector} from "react-redux"
import MenuItem from "./menuItem"

export default function Cart() {
    const [showCart, setShowCart] = useState(false);
    const cart = useSelector(state => state.cart)
    const menuItems = cart.map((item, i) => {
        return (
            <section className="order__items" key={i}>
                <MenuItem props={{
                    title: item.title,
                    end: item.count,
                    desc: item.price + " kr",
                    small: true
                }} />
            </section>
        )
    })
    const itemsCount = cart.reduce((acc, item) => acc + item.count, 0)
    const totalSum = cart.reduce((acc, item) => acc + (item.price * item.count), 0)

    function handleToggleClick(e) {
        const parent = e.currentTarget.parentElement
        if(showCart) {
            parent.style.height = "0"
        } else {
            parent.style.height = "100%"
        }
        setShowCart(!showCart)
    }

    function handleBuyClick() {
        if(cart.length === 0) return // man kan ej beställa 0 varor
        if(!sessionStorage.orders) {
            sessionStorage.orders = "[]"
        }
        
        const order = { // objektet som skickas till APIet vid order
            details: {
                order: makeOrderArrayFromCart(cart)
            }
        }
         
        fetch("https://airbean.awesomo.dev/api/beans/order",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                athorization: `Bearer ${sessionStorage.loggedInToken}` ?? null  //if logged in: set athorization: "Bearer {token}" else 'null'
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
            const savedOrders = JSON.parse(sessionStorage.orders)
            savedOrders.push(data)
            console.log(savedOrders)
            sessionStorage.orders = JSON.stringify(savedOrders)
        })
        // ordrarna sparas i arrayen: sessionStorage.orders 
        // sessionStorage behålls vid uppdatering av sidan. Försvinner när fönstret stängs.
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
                    <MenuItem props={{
                        title: "Total",
                        end: totalSum,
                        desc: "inkl moms + drönarleverans",
                        small: false
                    }} />
                </section>
                <button className="pay-button" onClick={handleBuyClick}>
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