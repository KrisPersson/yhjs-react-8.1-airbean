export const addItem = (item) => {
    return {
        type: "ADD", // action type
        payload: item // menyItem objekt
    }
}

export const removeItem = (id) => {
    return {
        type: "REMOVE", 
        payload: id 
    }
}

export const emptyCart = () => {
    return {
        type: "EMPTY"
    }
}