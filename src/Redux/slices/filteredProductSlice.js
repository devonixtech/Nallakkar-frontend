 import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

const BASE_URL = "/filteredProduct";

// ✅ Get similar products
export const fetchSimilarProducts = createAsyncThunk(
  "products/fetchSimilar",
  async (productId, { rejectWithValue }) => {
    try {
      const res = await api.get(`${BASE_URL}/getSimilarProducts/${productId}`);
      return res.data?.data || []; // fallback to []
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Add recently viewed product (needs userId + productId)
export const addRecentlyViewed = createAsyncThunk(
  "products/addRecentlyViewed",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const res = await api.post(`${BASE_URL}/addRecentlyViewed`, {
        userId,
        productId,
      });
      return res.data?.data || []; // fallback to []
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Get recently viewed products (by userId)
export const fetchRecentlyViewed = createAsyncThunk(
  "products/fetchRecentlyViewed",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.get(`${BASE_URL}/getRecentlyViewed/${userId}`);
      return res.data?.data || []; // fallback to []
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 🔽 Slice
const filteredProductSlice = createSlice({
  name: "filteredProducts",
  initialState: {
    similarProducts: [],
    recentlyViewed: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Get Similar
      .addCase(fetchSimilarProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.similarProducts = action.payload || [];
      })
      .addCase(fetchSimilarProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.similarProducts = []; // reset to []
      })

      // ✅ Add Recently Viewed
      .addCase(addRecentlyViewed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addRecentlyViewed.fulfilled, (state, action) => {
        state.loading = false;
        // if API doesn’t return full list, keep old list
        state.recentlyViewed = action.payload?.length
          ? action.payload
          : state.recentlyViewed;
      })
      .addCase(addRecentlyViewed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Get Recently Viewed
      .addCase(fetchRecentlyViewed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecentlyViewed.fulfilled, (state, action) => {
        state.loading = false;
        state.recentlyViewed = action.payload || [];
      })
      .addCase(fetchRecentlyViewed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.recentlyViewed = []; // reset to []
      });
  },
});

export default filteredProductSlice.reducer;
