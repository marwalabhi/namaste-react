import { createSlice, current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      // mutating the state over here
      const itemId = action.payload?.card?.info?.id;

      const existingItem = state.items.find(
        (item) => item.item?.card?.info?.id === itemId
      );

      if (existingItem) {
        existingItem.quantity += 1; // Increment quan if item exists
      } else {
        state.items.push({ item: action.payload, quantity: 1 }); // Add new item with quantity 1
      }
    },
    removeItem: (state, action) => {
      const itemId = action.payload?.card?.info?.id;
      const existingItem = state.items.find(
        (item) => item.item?.card?.info?.id === itemId
      );

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1; // Decrement quan if more than 1
        } else {
          state.items = state.items.filter(
            (item) => item.item?.card?.info?.id !== itemId
          );
          // remove item if quantity is 1
        }
      }
    },
    clearCart: (state, action) => {
      state.items.length = 0;
    },
  },
});

// Extracting actions
export const { addItem, removeItem, clearCart } = cartSlice.actions;
// and reducer from the slice
export default cartSlice.reducer;
