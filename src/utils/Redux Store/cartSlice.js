import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        addItem: (state, action) => {
            // mutating the state over here
            state.items.push(action.payload);
        },
        removeItem: (state, action) => {
            state.items.pop();
        },
        clearCart: (state, action) => {
            state.items.length = 0;
        },
    },
}); 

// Extracting actions 
export const { addItem, removeItem, clearCart} =  cartSlice.actions;
// and reducer from the slice
export default cartSlice.reducer;
