// src/Redux/slices/buyNowSlice.js
import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
  const saved = localStorage.getItem("buyNowItem");
  return saved
    ? { ...JSON.parse(saved), isBuyNowActive: true }
    : { product: null, variant: null, quantity: 1, isBuyNowActive: false };
};

const buyNowSlice = createSlice({
  name: "buyNow",
  initialState: getInitialState(),
  reducers: {
    setBuyNowItem: (state, action) => {
      const { product, variant, quantity } = action.payload;
      const newItem = {
        product,
        variant,
        quantity,
        isBuyNowActive: true,
      };
      localStorage.setItem(
        "buyNowItem",
        JSON.stringify({ product, variant, quantity })
      );
      return newItem; // ✅ Return new state (not mutate) to reset properly
    },

    updateBuyNowQuantity: (state, action) => {
      const q = Number(action.payload) || 1;
      const quantity = q > 0 ? q : 1;
      state.quantity = quantity;
      localStorage.setItem(
        "buyNowItem",
        JSON.stringify({
          product: state.product,
          variant: state.variant,
          quantity,
        })
      );
    },

    clearBuyNowItem: () => {
      localStorage.removeItem("buyNowItem");
      // ✅ Return new clean state
      return {
        product: null,
        variant: null,
        quantity: 1,
        isBuyNowActive: false,
      };
    },
  },
});

export const { setBuyNowItem, updateBuyNowQuantity, clearBuyNowItem } =
  buyNowSlice.actions;

export default buyNowSlice.reducer;
