export const addItem = (item) => {
    return {
        type: "ADD", // action type
        payload: item // menyItem objekt
    }
}

export const removeItem = (id) => {
    return {
        type: "REMOVE", // action type
        payload: id // menyItem objekt
    }
}