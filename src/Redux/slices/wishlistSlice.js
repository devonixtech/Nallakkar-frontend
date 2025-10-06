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
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // OPTIMISTIC: Update immediately on pending so UI reacts fast
      .addCase(toggleWishlist.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        const { productId, isFavourite, product } = action?.meta?.arg || {};

        if (typeof isFavourite === "boolean") {
          if (isFavourite) {
            // add (optimistic)
            if (!state.items.find((it) => it.productId === productId)) {
              state.items.push(product || { productId });
            }
          } else {
            // remove (optimistic)
            state.items = state.items.filter((it) => it.productId !== productId);
          }
        }
      })

      // on success: try to sync with server response (if server provided data)
      .addCase(toggleWishlist.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload || {};
        const arg = action?.meta?.arg || {};
        const { productId } = arg;

        // If backend returned a full product or confirmed favourite flag, sync properly.
        // Try to detect common fields in payload.
        const favourite = payload.favourite ?? payload.isFavourite ?? payload.favourited;
        const returnedProduct = payload.product ?? payload.item ?? payload.data;

        if (typeof favourite === "boolean") {
          if (favourite) {
            if (returnedProduct) {
              // replace or add full product returned by server
              const exists = state.items.find((it) => it.productId === productId);
              if (exists) {
                state.items = state.items.map((it) => (it.productId === productId ? returnedProduct : it));
              } else {
                state.items.push(returnedProduct);
              }
            }
            // else keep optimistic add
          } else {
            // server says removed — ensure it's removed
            state.items = state.items.filter((it) => it.productId !== productId);
          }
        } else {
          // if payload doesn't include a favourite flag, leave optimistic change as-is
        }
      })

      .addCase(toggleWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message || "Toggle wishlist failed";

        // Revert optimistic change
        const { productId, isFavourite, product } = action?.meta?.arg || {};
        if (typeof isFavourite === "boolean") {
          if (isFavourite) {
            // attempted to add but failed -> remove
            state.items = state.items.filter((it) => it.productId !== productId);
          } else {
            // attempted to remove but failed -> re-add
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
        state.items = state.items.filter((item) => item.productId !== action.payload);
      })
      .addCase(clearWishlist.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export default wishlistSlice.reducer;


