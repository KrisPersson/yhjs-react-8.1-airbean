const initialState = {
    cart: []
} 

export default function cartReducer(state = initialState, action) {
    switch(action.type) {
        case "ADD": {
            const cartCopy = [...state.cart]
            if(!cartCopy.some(item => item.id === action.payload.id)) { // tillåt ej dubbletter, 'count' visar antal
                cartCopy.push({...action.payload, count:1}) // om payload inte finns: count:1
            } else {                                        // annars count++
                cartCopy.find(item => item.id === action.payload.id).count++
            }
            return {...state, cart: cartCopy}
        }
        case "REMOVE": {
            const cartCopy = [...state.cart]
            const itemToDecreace = cartCopy.find(item => item.id === action.payload)
            if(itemToDecreace.count > 0) {
                itemToDecreace.count--
            }
            return {...state, cart: cartCopy}
        }
        default:
            return state;
    }
}
