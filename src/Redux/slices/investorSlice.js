import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

const BASE_URL = "/investor";

/* ✅ Create investor */
export const createInvestor = createAsyncThunk(
  "investors/create",
  async (investorData, { rejectWithValue }) => {
    try {
      const res = await api.post(`${BASE_URL}/createInvestor`, investorData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* ✅ Get all investors */
export const fetchAllInvestors = createAsyncThunk(
  "investors/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(`${BASE_URL}/getAllInvestors`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* ✅ Get investor by ID */
export const fetchInvestorById = createAsyncThunk(
  "investors/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`${BASE_URL}/getInvestorById/${id}`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* ✅ Update investor */
export const updateInvestor = createAsyncThunk(
  "investors/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.put(`${BASE_URL}/updateInvestor/${id}`, data);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* ✅ Delete investor */
export const deleteInvestor = createAsyncThunk(
  "investors/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`${BASE_URL}/deleteInvestor/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* 🔽 Slice */
const investorSlice = createSlice({
  name: "investors",
  initialState: {
    investors: [],
    investorData: null,
    recentlyViewed:
      JSON.parse(localStorage.getItem("recentlyViewedInvestors")) || [],
    loading: false,
    error: null,
  },
  reducers: {
    // ✅ Add Recently Viewed
    addRecentlyViewedInvestor: (state, action) => {
      const investor = action.payload;
      const exists = state.recentlyViewed.find((i) => i._id === investor._id);
      if (!exists) {
        state.recentlyViewed = [investor, ...state.recentlyViewed].slice(0, 10);
        localStorage.setItem(
          "recentlyViewedInvestors",
          JSON.stringify(state.recentlyViewed)
        );
      }
    },
    clearRecentlyViewedInvestors: (state) => {
      state.recentlyViewed = [];
      localStorage.removeItem("recentlyViewedInvestors");
    },
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createInvestor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createInvestor.fulfilled, (state, action) => {
        state.loading = false;
        state.investors.push(action.payload);
      })
      .addCase(createInvestor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch All
      .addCase(fetchAllInvestors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllInvestors.fulfilled, (state, action) => {
        state.loading = false;
        state.investors = action.payload;
      })
      .addCase(fetchAllInvestors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch by ID
      .addCase(fetchInvestorById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInvestorById.fulfilled, (state, action) => {
        state.loading = false;
        state.investorData = action.payload;
      })
      .addCase(fetchInvestorById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateInvestor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateInvestor.fulfilled, (state, action) => {
        state.loading = false;
        state.investors = state.investors.map((i) =>
          i._id === action.payload._id ? action.payload : i
        );
      })
      .addCase(updateInvestor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteInvestor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteInvestor.fulfilled, (state, action) => {
        state.loading = false;
        state.investors = state.investors.filter(
          (i) => i._id !== action.payload
        );
      })
      .addCase(deleteInvestor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  addRecentlyViewedInvestor,
  clearRecentlyViewedInvestors,
} = investorSlice.actions;

export default investorSlice.reducer;
