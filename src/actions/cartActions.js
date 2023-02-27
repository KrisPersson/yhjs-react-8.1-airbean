export const addItem = (item) => {
    return {
        type: "ADD", // action type
        payload: item // menyItem objekt
    }
}

// TODO add action creator to remove item