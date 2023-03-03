import "./Home.scss"

import ToggleNavButton from "./../components/ToggleNavButton"


function Home() {

    return (
        <section className="home">
            <ToggleNavButton />
            <figure className="home__logo"></figure>
            <h1 className="home__h1">AIR BEAN</h1>
            <p className="home__p">DRONEDELIVERED COFFEE</p>
            <p className="home__group home__bounce">Smart Gurdians</p>
        </section>
    )
}

export default Home