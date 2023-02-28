const initialState = {
    cart: []
} 

export default function cartReducer(state = initialState, action) {
    switch(action.type) {
        case "ADD": {
            return {
                ...state,
                cart: [ ...state.cart, action.payload]
            }
        }
        // TODO add action type 'remove'
        default:
            return state;
    }
}
