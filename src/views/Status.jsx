import "./Status.scss"

function Status() {

    return (
        <section className="wrapper">
            <p className="wrapper__order">
                Ordernummer 
                <span className="wrapper__orderNumber">
                     #{}
                </span>
            </p>
            <figure className="wrapper__drone"></figure>

            <h1 className="wrapper__h1">Din beställning är på väg!</h1>
            <h2 className="wrapper__h2">{} minuter</h2>
            <button className="wrapper__button">ok, cool!</button>
        </section>
    )
}

export default Status