 import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

const BASE_URL = "/cart";

// ✅ Add to cart
export const addToCart = createAsyncThunk(
  "cart/add",
  async (cartData, { rejectWithValue }) => {
    try {
      const res = await api.post(`${BASE_URL}/addToCart`, cartData);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Fetch cart by userId
export const fetchCartByUserId = createAsyncThunk(
  "cart/fetchByUserId",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.get(`${BASE_URL}/getUserCart/${userId}`);
      return res.data.items; // make sure it returns the items array
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Update cart item quantity
 export const updateCartItem = createAsyncThunk(
  "cart/update",
  async ({ cartId, action }, { rejectWithValue }) => {
    try {
      const res = await api.patch(`${BASE_URL}/updateCart`, { cartId, action });
      return {
        cartId: res.data.cartId,
        newQuantity: res.data.newQuantity,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


// ✅ Remove from cart
export const removeFromCart = createAsyncThunk(
  "cart/remove",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`${BASE_URL}/deleteCartItem/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 🔽 Slice
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add to cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch cart
      .addCase(fetchCartByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCartByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update cart item
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.map((item) =>
          item.cartId === action.payload.cartId
            ? { ...item, quantity: action.payload.newQuantity }
            : item
        );
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Remove cart item
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((item) => item.cartId !== action.payload);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
