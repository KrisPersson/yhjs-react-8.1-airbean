const initialState = [] 

export default function cartReducer(state = initialState, action) {
    switch(action.type) {
        case "ADD": {
            return [ ...state, action.payload]
        }
        // TODO add action type 'remove'
        default:
            return state;
    }
}
