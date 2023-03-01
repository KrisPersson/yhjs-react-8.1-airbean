import "./MenuItem.scss"

export default function MenuItem(props) {
    const {title, end, desc, small} = props.props
    return (<>
        <div className="row">
            <span className={`row__title ${small?"small":""}`}>
                {title}
            </span>
            <span className="row__dots"></span>
            <span className={`row__end ${small?"smallend":""}`}>
                {end}{small?"":" kr"}
            </span>
        </div>
        <p className="row__desc">
            {desc}
        </p>
    </>)
}