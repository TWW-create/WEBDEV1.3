import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    resetCart: (state) => {
      state.cart = [];
    },
    addToCart: (state, action) => {
      const { id, selectedSize, selectedColor } = action.payload;
      const existingItem = state.cart.find(
        (item) =>
          item.id === id &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
      );      

      if (existingItem) {
        // If the item already exists in the cart with the same size and color, increase the quantity
        existingItem.quantity += action.payload.quantity;
      } else {
        // Otherwise, add a new item to the cart
        state.cart.push({ ...action.payload });
      }
    },
    removeFromCart: (state, action) => {
      const { id, selectedSize, selectedColor } = action.payload;
      state.cart = state.cart.filter(
        (item) =>
          !(
            item.id === id &&
            item.selectedSize.size === selectedSize.size &&
            item.selectedColor === selectedColor
          )
      );
    },
    reduceQuantity: (state, action) => {
      const { id, selectedSize, selectedColor } = action.payload;
      const existingItem = state.cart.find(
        (item) =>
          item.id === id &&
          item.selectedSize.size === selectedSize.size &&
          item.selectedColor === selectedColor
      );      

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else if (existingItem && existingItem.quantity === 1) {
        // Remove the item if its quantity is 1 and reduce is called
        state.cart = state.cart.filter(
          (item) =>
            !(
              item.id === id &&
              item.selectedSize.size === selectedSize.size &&
              item.selectedColor === selectedColor
            )
        );
      }
    },
    increaseQuantity: (state, action) => {
      const { id, selectedSize, selectedColor } = action.payload;
      const existingItem = state.cart.find(
        (item) =>
          item.id === id &&
          item.selectedSize.size === selectedSize.size &&
          item.selectedColor === selectedColor
      );

      if (existingItem) {
        existingItem.quantity += 1;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  reduceQuantity,
  resetCart,
  increaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
