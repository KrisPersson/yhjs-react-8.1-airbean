import "./Cart.scss"
import {useState} from "react"
import {useSelector} from "react-redux"
import MenuItem from "./menuItem"

export default function Cart() {
    const cart = useSelector(state => state.cart)
    const newCart = [] // som cart men utan dubletter, 'count' anger antal
    for(let i = 0; i < cart.length; i++) {
        if(!newCart.some(item => item.id === cart[i].id)) {
            newCart.push({...cart[i], count:1})
        } else {
            newCart.find(item => item.id === cart[i].id).count++
        }
    }

    console.log(newCart);

    const [showCart, setShowCart] = useState(false);

    const menuItems = newCart.map((item, i) => {
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

    const sum = cart.reduce((acc, item) => acc + item.price, 0)

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
        // skicka ordern (newCart) till /api/beans/order
        // men api:et tillåter bara en kaffe
        // return: {eta:number, orderNr:string} 
        // spara i sessionStorage eller store
    }

    return (
        <section className="cart">
            <section className="icon" onClick={(e) => handleToggleClick(e)}>
                <div className="icon__number">{cart.length}</div>
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
                        end: sum,
                        desc: "inkl moms + dr;narleverans",
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
