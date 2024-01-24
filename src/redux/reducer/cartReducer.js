// src/reducers/sampleReducer.js
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  cartList: [],
};

const cartSlice = createSlice({
  name: 'sample',
  initialState,
  reducers: {
    addToCart: (state, payload) => {
      state.cartList = [...state.cartList, payload];
    },
    removeFromCart: (state, payload) => {
      state.cartList = [...state.cartList.filter(item => item !== payload)];
    },
  },
});

export const {addItem, removeFromCart} = cartSlice.actions;

export default cartSlice.reducer;
