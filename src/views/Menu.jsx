import "./Menu.scss"
import { useState, useEffect} from "react"
import { useDispatch } from "react-redux";
import { addItem } from "../actions/cartActions";
import Cart from "../components/Cart.jsx"
import MenuItem from "../components/MenuItem.jsx"

import NavMenuButton from "./../components/NavMenuButton"

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
                            <MenuItem props={{
                                title: menuItem.title,
                                end: menuItem.price,
                                desc: menuItem.desc,
                                small: false
                            }} />
                        </div>
                    </article>
                )
            })

            }
        </section>
    )
}

export default Menu