import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

const BASE_URL = "/product";

// ✅ Get similar products
export const fetchSimilarProducts = createAsyncThunk(
  "products/fetchSimilar",
  async (productId, { rejectWithValue }) => {
    try {
      const res = await api.get(`${BASE_URL}/getSimilarProducts/${productId}`);
      return res.data.data; // assuming API returns { data: [...] }
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Add recently viewed product
export const addRecentlyViewed = createAsyncThunk(
  "products/addRecentlyViewed",
  async (productId, { rejectWithValue }) => {
    try {
      const res = await api.post(`${BASE_URL}/addRecentlyViewed`, { productId });
      return res.data.data; // assuming it returns updated "recentlyViewed" list
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Get recently viewed products
export const fetchRecentlyViewed = createAsyncThunk(
  "products/fetchRecentlyViewed",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(`${BASE_URL}/getRecentlyViewed`);
      return res.data.data; // returns recently viewed products
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 🔽 Slice
const filteredProductSlice = createSlice({
  name: "similarProducts",
  initialState: {
    similarProducts: [],
    recentlyViewed: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Similar
      .addCase(fetchSimilarProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.similarProducts = action.payload;
      })
      .addCase(fetchSimilarProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Recently Viewed
      .addCase(addRecentlyViewed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addRecentlyViewed.fulfilled, (state, action) => {
        state.loading = false;
        state.recentlyViewed = action.payload;
      })
      .addCase(addRecentlyViewed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Recently Viewed
      .addCase(fetchRecentlyViewed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecentlyViewed.fulfilled, (state, action) => {
        state.loading = false;
        state.recentlyViewed = action.payload;
      })
      .addCase(fetchRecentlyViewed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default filteredProductSlice.reducer;
