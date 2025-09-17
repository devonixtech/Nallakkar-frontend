import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

const BASE_URL = "/review";

// ✅ Add a review
export const addReview = createAsyncThunk(
  "reviews/add",
  async (reviewData, { rejectWithValue }) => {
    try {
      const res = await api.post(`${BASE_URL}/addReview`, reviewData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Get all reviews
export const fetchAllReviews = createAsyncThunk(
  "reviews/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(`${BASE_URL}/getAllReviews`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Get reviews by product ID
export const fetchReviewsByProduct = createAsyncThunk(
  "reviews/fetchByProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const res = await api.get(`${BASE_URL}/getProductReviews/${productId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Update a review
export const updateReview = createAsyncThunk(
  "reviews/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.patch(`${BASE_URL}/updateReview/${id}`, data);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Delete a review
export const deleteReview = createAsyncThunk(
  "reviews/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`${BASE_URL}/deleteReview/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 🔽 Slice
const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: [], // all reviews
    productReviews: [], // reviews for a specific product
    loading: false,
    error: null,
  },
  reducers: {
    clearProductReviews: (state) => {
      state.productReviews = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Add
      .addCase(addReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews.push(action.payload);
      })
      .addCase(addReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch All
      .addCase(fetchAllReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchAllReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch By Product
      .addCase(fetchReviewsByProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviewsByProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.productReviews = action.payload;
      })
      .addCase(fetchReviewsByProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = state.reviews.map((r) =>
          r._id === action.payload._id ? action.payload : r
        );
        state.productReviews = state.productReviews.map((r) =>
          r._id === action.payload._id ? action.payload : r
        );
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = state.reviews.filter((r) => r._id !== action.payload);
        state.productReviews = state.productReviews.filter(
          (r) => r._id !== action.payload
        );
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProductReviews } = reviewSlice.actions;
export default reviewSlice.reducer;
