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
        console.log(cart);
        const orderArr = makeOrderArrayFromCart(cart)
        const order = {
            "details": {
                "order": orderArr
            }
        }

        console.log(order);

        // skicka ordern (newCart) till /api/beans/order
        // return: {eta:number, orderNr:string} 
        // spara i sessionStorage eller store
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

    return orderArray
}