import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

const BASE_URL = "/cart";

// ✅ Add to cart
export const addToCart = createAsyncThunk(
  "cart/add",
  async (cartData, { rejectWithValue }) => {
    try {
      const res = await api.post(BASE_URL, cartData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Get user cart
export const fetchCart = createAsyncThunk(
  "cart/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(`${BASE_URL}/getUserCart`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Update cart item (e.g., quantity)
export const updateCartItem = createAsyncThunk(
  "cart/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.put(`${BASE_URL}/${id}`, data);
      return res.data.data;
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
      await api.delete(`${BASE_URL}/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Clear entire cart
export const clearCart = createAsyncThunk(
  "cart/clear",
  async (_, { rejectWithValue }) => {
    try {
      await api.delete(`${BASE_URL}/clear`);
      return true;
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
      // Add
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

      // Fetch
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Remove
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((item) => item._id !== action.payload);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Clear
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.loading = false;
        state.items = [];
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
