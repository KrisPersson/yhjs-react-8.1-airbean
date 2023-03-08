import "./Home.scss"

import ToggleNavButton from "./../components/ToggleNavButton"
import {useNavigate} from "react-router-dom"


function Home() {
    const navigate = useNavigate()

    return (
        <section className="home">
            <ToggleNavButton />
            <figure className="home__logo home__bounce" onClick={()=>{navigate("/menu")}}></figure>
            <h1 className="home__h1">AIR BEAN</h1>
            <p className="home__p">DRONEDELIVERED COFFEE</p>
            <p className="home__group">Smart Gurdians</p>
        </section>
    )
}

export default Home