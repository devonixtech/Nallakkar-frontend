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
// ... your imports and thunks remain the same ...

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    singleFavourite: null,
    loading: false,
    toggleLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // OPTIMISTIC: Update immediately on pending so UI reacts fast
 .addCase(toggleWishlist.pending, (state, action) => {
  state.toggleLoading = true;
  state.error = null;

  const { productId, isFavourite, product } = action?.meta?.arg || {};
  if (typeof isFavourite === "boolean") {
    if (isFavourite) {
      if (!state.items.find((it) => it.productId === productId)) {
        state.items.push(product || { productId });
      }
    } else {
      state.items = state.items.filter((it) => it.productId !== productId);
    }
  }
})

.addCase(toggleWishlist.fulfilled, (state, action) => {
  state.toggleLoading = false;
  const payload = action.payload || {};
  const arg = action?.meta?.arg || {};
  const { productId } = arg;

  const favourite = payload.favourite ?? payload.isFavourite ?? payload.favourited;
  const returnedProduct = payload.product ?? payload.item ?? payload.data;

  if (typeof favourite === "boolean") {
    if (favourite) {
      if (returnedProduct) {
        const exists = state.items.find((it) => it.productId === productId);
        if (exists) {
          state.items = state.items.map((it) =>
            it.productId === productId ? returnedProduct : it
          );
        } else {
          state.items.push(returnedProduct);
        }
      }
    } else {
      state.items = state.items.filter((it) => it.productId !== productId);
    }
  }
})

.addCase(toggleWishlist.rejected, (state, action) => {
  state.toggleLoading = false;
  state.error = action.payload || action.error?.message || "Toggle wishlist failed";

  const { productId, isFavourite, product } = action?.meta?.arg || {};
  if (typeof isFavourite === "boolean") {
    if (isFavourite) {
      state.items = state.items.filter((it) => it.productId !== productId);
    } else {
      if (!state.items.find((it) => it.productId === productId)) {
        state.items.push(product || { productId });
      }
    }
  }
})


      // existing fetch handlers
      .addCase(fetchWishlistByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlistByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload || [];
      })
      .addCase(fetchWishlistByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // the rest unchanged...
      .addCase(fetchWishlistByUserAndProduct.fulfilled, (state, action) => {
        state.singleFavourite = action.payload;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.productId !== action.payload
        );
      })
      .addCase(clearWishlist.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export default wishlistSlice.reducer;
