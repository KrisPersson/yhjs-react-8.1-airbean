import './OrderHistoryItem.scss'

function OrderHistoryItem({ id, orderDate, total }) {

    return (
        <li className="profile__order-history__order-item">
            <p className="profile__order-history__order-item__id">{ id }</p>
            <p className="profile__order-history__order-item__date">{ orderDate }</p>
            <p className="profile__order-history__order-item__total-sum">total ordersumma</p>
            <p className="profile__order-history__order-item__amount">{ total } kr</p>
        </li>
    )
}


export default OrderHistoryItem