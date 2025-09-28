 import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

const BASE_URL = "/favourite";

// ✅ Add / Update wishlist
export const toggleWishlist = createAsyncThunk(
  "wishlist/toggle",
  async ({ productId, userId, isFavourite }, { rejectWithValue }) => {
    try {
      const res = await api.patch(`${BASE_URL}/updateFavourite/${productId}`, {
        userId,
        isFavourite,
      });
      return res.data; // returns { success, message, productId, userId, favourite }
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Get wishlist by userId
export const fetchWishlistByUserId = createAsyncThunk(
  "wishlist/fetchByUserId",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.get(`${BASE_URL}/getFavouiteByUserId/${userId}`);
      return res.data.data; // array of favourites with product details
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Get single favourite (user + product)
export const fetchWishlistByUserAndProduct = createAsyncThunk(
  "wishlist/fetchByUserAndProduct",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const res = await api.get(
        `${BASE_URL}/getFavouiteByUserIdPrductId/${userId}/${productId}`
      );
      return res.data.data; // single favourite object
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Remove from wishlist
export const removeFromWishlist = createAsyncThunk(
  "wishlist/remove",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      await api.delete(`${BASE_URL}/remove/${userId}/${productId}`);
      return productId;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Clear all wishlist (per user)
export const clearWishlist = createAsyncThunk(
  "wishlist/clear",
  async (userId, { rejectWithValue }) => {
    try {
      await api.delete(`${BASE_URL}/clear/${userId}`);
      return userId;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 🔽 Slice
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [], // products in wishlist
    singleFavourite: null, // result of fetchWishlistByUserAndProduct
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Toggle add/remove
      .addCase(toggleWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleWishlist.fulfilled, (state, action) => {
        state.loading = false;
        const { productId, favourite } = action.payload;
        if (favourite) {
          // ✅ Add if favourite is true
          if (!state.items.find((item) => item.productId === productId)) {
            state.items.push(action.payload);
          }
        } else {
          // ✅ Remove if favourite is false
          state.items = state.items.filter(
            (item) => item.productId !== productId
          );
        }
      })
      .addCase(toggleWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch by userId
      .addCase(fetchWishlistByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlistByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchWishlistByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch by user + product
      .addCase(fetchWishlistByUserAndProduct.fulfilled, (state, action) => {
        state.singleFavourite = action.payload;
      })

      // Remove
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.productId !== action.payload
        );
      })

      // Clear
      .addCase(clearWishlist.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export default wishlistSlice.reducer;
