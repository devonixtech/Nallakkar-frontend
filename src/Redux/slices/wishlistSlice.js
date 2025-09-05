    import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

const BASE_URL = "/wishlist";

// ✅ Add to wishlist
export const addToWishlist = createAsyncThunk(
  "wishlist/add",
  async (wishlistData, { rejectWithValue }) => {
    try {
      const res = await api.post(BASE_URL, wishlistData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Get user wishlist
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(`${BASE_URL}/getUserWishlist`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Remove from wishlist
export const removeFromWishlist = createAsyncThunk(
  "wishlist/remove",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`${BASE_URL}/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Clear wishlist
export const clearWishlist = createAsyncThunk(
  "wishlist/clear",
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
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add
      .addCase(addToWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Remove
      .addCase(removeFromWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((item) => item._id !== action.payload);
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Clear
      .addCase(clearWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearWishlist.fulfilled, (state) => {
        state.loading = false;
        state.items = [];
      })
      .addCase(clearWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default wishlistSlice.reducer;
