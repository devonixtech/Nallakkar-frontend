// src/Redux/slices/buyNowSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: null,    // full product object
  variant: null,    // selected variant object/string
  quantity: 1,      // selected quantity
};

const buyNowSlice = createSlice({
  name: "buyNow",
  initialState,
  reducers: {
    setBuyNowItem: (state, action) => {
      const { product, variant = null, quantity = 1 } = action.payload || {};
      state.product = product || null;
      state.variant = variant;
      state.quantity = quantity;
    },
    updateBuyNowQuantity: (state, action) => {
      const q = Number(action.payload) || 1;
      state.quantity = q > 0 ? q : 1;
    },
    clearBuyNowItem: (state) => {
      state.product = null;
      state.variant = null;
      state.quantity = 1;
    },
  },
});

export const { setBuyNowItem, updateBuyNowQuantity, clearBuyNowItem } =
  buyNowSlice.actions;

export default buyNowSlice.reducer;
