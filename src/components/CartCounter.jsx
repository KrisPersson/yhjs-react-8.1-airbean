import "./CartCounter.scss"
import { addItem, removeItem} from "../actions/cartActions";
import { useDispatch } from "react-redux";

export default function CartCounter(props) {
    const item = props.item
    const dispatch = useDispatch()
    return (
        <article className="cart-counter">
            <div className="change-amount" onClick={() => dispatch(removeItem(item.id))}>&#8722;</div>
            <div>{item.count}</div>
            <div className="change-amount" onClick={() => dispatch(addItem(item))}>+</div>
        </article>
    )
}