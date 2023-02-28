import "./Menu.scss"
import { useState, useEffect} from "react"
import { useDispatch } from "react-redux";
import { addItem } from "../actions/cartActions";
import Cart from "../components/Cart.jsx"

function Menu() {
    const dispatch = useDispatch()

    const [menuItems, setMenuItems] = useState([])

    useEffect(() => {
        fetch("https://airbean.awesomo.dev/api/beans")
            .then(response => {
                if(!response.ok) {
                    throw new Error(`Something wrong with the server: ${response.status}`)
                }
                return response.json()
            })
            .then(data => setMenuItems(data.menu))
    }, [])

    return (
        <section className="menu">
            <Cart />
            <h1 className="menu__h1">Meny</h1>
            
            {menuItems.map((menuItem, index) => {
                return (
                    <article key={menuItem.id} className="menu__article">
                        <div className="menu__add"onClick={() => dispatch(addItem(menuItems[index]))}>
                            +
                        </div>
                        <div className="menu__item">
                            <div className="menu__row">
                                <span className="menu__title">{menuItem.title}</span>
                                <span className="menu__dots"></span>
                                <span className="menu__price">{menuItem.price}&nbsp;kr</span>
                            </div>
                            <p className="menu__desc">{menuItem.desc}</p>
                        </div>
                    </article>
                )
            })

            }
        </section>
    )
}

export default Menu