const initialState = {
    cart: []
} 

export default function cartReducer(state = initialState, action) {
    switch(action.type) {
        case "ADD": { // lägg till egenskapen 'count' för antal items
            const cartCopy = [...state.cart]
            if(!cartCopy.some(item => item.id === action.payload.id)) {
                cartCopy.push({...action.payload, count:1}) // om item inte finns: count:1
            } else {                                        // annars count++
                cartCopy.find(item => item.id === action.payload.id).count++
            }
            return {...state, cart: cartCopy}
        }
        // TODO add action type 'remove'
        default:
            return state;
    }
}
