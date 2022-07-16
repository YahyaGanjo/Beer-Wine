import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,

  reducers: {
    // =========== add item ============
    addItem(state, action) {
      let productPrice;
      const newItem = action.payload;
      !newItem.price1 ? (productPrice = 0) : (productPrice = newItem.price1);
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );
      state.totalQuantity++;

      if (!existingItem) {
        // ===== note: if you use just redux you should not mute state array instead of clone the state array, but if you use redux toolkit that will not a problem because redux toolkit clone the array behind the scene

        state.cartItems.push({
          id: newItem.id,
          title: newItem.title,
          image01: newItem.image01,
          price: Number(newItem.price),
          price1: Number(productPrice),
          quantity: 1,
          totalPrice: (
            Math.round((newItem.price + newItem.price1) * 100) / 100
          ).toFixed(2),
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) +
          Number(newItem.price + newItem.price1);
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) =>
          total + Number(item.price + item.price1) * Number(item.quantity),

        0
      );
    },

    // ========= remove item ========

    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      state.totalQuantity--;

      if (existingItem.quantity === 1) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) -
          Number(existingItem.price + existingItem.price1);
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) =>
          total + Number(item.price + item.price1) * Number(item.quantity),
        0
      );
    },

    //============ delete item ===========

    deleteItem(state, action) {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
        state.totalQuantity = state.totalQuantity - existingItem.quantity;
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) =>
          total + Number(item.price + item.price1) * Number(item.quantity),
        0
      );
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
