 import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

const BASE_URL = "/subCategory";

// ✅ Create subcategory
export const createSubcategory = createAsyncThunk(
  "subcategories/create",
  async (subcategoryData, { rejectWithValue }) => {
    try {
      const res = await api.post(`${BASE_URL}/createSubCategory`, subcategoryData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Get all subcategories
export const fetchAllSubcategories = createAsyncThunk(
  "subcategories/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("subcategory/getAllSubcategories");
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Get subcategory by Category ID
export const fetchSubcategoryById = createAsyncThunk(
  "subcategories/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`${BASE_URL}/getSubCategoryByCategoryId/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue({
        status: err.response?.status,
        message: err.response?.data || err.message,
      });
    }
  }
);

// ✅ Update subcategory
export const updateSubcategory = createAsyncThunk(
  "subcategories/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.patch(`${BASE_URL}/updateSubCategory/${id}`, data);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Delete subcategory
export const deleteSubcategory = createAsyncThunk(
  "subcategories/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`${BASE_URL}/deleteSubCategory/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 🔽 Slice
const subcategorySlice = createSlice({
  name: "subcategories",
  initialState: {
    subcategories: [],
    subcategoryData: { data: [] }, // ✅ ensure it's always an object with array
    loading: false,
    error: null,
  },
  reducers: {
    clearSubcategories: (state) => {
      state.subcategoryData = { data: [] };
    },
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createSubcategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSubcategory.fulfilled, (state, action) => {
        state.loading = false;
        state.subcategories.push(action.payload);
      })
      .addCase(createSubcategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch All
      .addCase(fetchAllSubcategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSubcategories.fulfilled, (state, action) => {
        state.loading = false;
        state.subcategories = action.payload;
      })
      .addCase(fetchAllSubcategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch by ID
      .addCase(fetchSubcategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubcategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.subcategoryData = action.payload;
      })
      .addCase(fetchSubcategoryById.rejected, (state, action) => {
        state.loading = false;
        // ✅ if 404 → clear instead of keeping old data
        if (action.payload?.status === 404) {
          state.subcategoryData = { data: [] };
        } else {
          state.error = action.payload;
        }
      })

      // Update
      .addCase(updateSubcategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSubcategory.fulfilled, (state, action) => {
        state.loading = false;
        state.subcategories = state.subcategories.map((s) =>
          s._id === action.payload._id ? action.payload : s
        );
      })
      .addCase(updateSubcategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteSubcategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSubcategory.fulfilled, (state, action) => {
        state.loading = false;
        state.subcategories = state.subcategories.filter(
          (s) => s._id !== action.payload
        );

        // ✅ also clear subcategoryData if nothing left
        if (state.subcategories.length === 0) {
          state.subcategoryData = { data: [] };
        }
      })
      .addCase(deleteSubcategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSubcategories } = subcategorySlice.actions;
export default subcategorySlice.reducer;
