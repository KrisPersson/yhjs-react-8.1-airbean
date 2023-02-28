import "./Cart.scss"
import {useState} from "react"
import {useSelector} from "react-redux"

function Cart() {
    const cart = useSelector(state => state.cart)
    console.log(cart);
    const [showCart, setShowCart] = useState(false);

    function handleClick(e) {
        const parent = e.currentTarget.parentElement
        if(showCart) {
            parent.style.backgroundColor = "transparent"
            parent.style.height = "0"
        } else {
            parent.style.backgroundColor = "rgb(0 0 0 / .7)"
            parent.style.height = "100%"
        }
        setShowCart(!showCart)
    }
    return (
        <section className="cart">
            <section className="icon" onClick={(e) => handleClick(e)}>
                <div className="icon__number">{cart.length}</div>
                <img src="shoppingbag.svg" alt="shoppingbag" />
            </section>
            {showCart &&
            <section className="order">
                <h2 className="order__h2">Din beställning</h2>
                <section className="order__items">order</section>
                <section className="order__total">
                    <h3 className="order__h3">Total</h3>
                </section>
                <button>Take my money!</button>
            </section>
            }
        </section>
    )
}

export default Cart