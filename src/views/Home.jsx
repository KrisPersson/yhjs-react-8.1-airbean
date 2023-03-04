import "./Home.scss"

import ToggleNavButton from "./../components/ToggleNavButton"
import { Link } from 'react-router-dom'



function Home() {

    return (
        <section className="home">
            <ToggleNavButton />
            <Link to="/Menu" className="home__logo home__bounce"></Link>
            <h1 className="home__h1">AIR BEAN</h1>
            <p className="home__p">DRONEDELIVERED COFFEE</p>
            <p className="home__group ">Smart Gurdians</p>
        </section>
    )
}

export default Home