import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

const BASE_URL = "/category";

// Helper to parse category data
const parseCategory = (category) => {
  if (!category) return category;

  let parsedImage = category.image;

  // Parse image if it's a JSON string
  if (typeof category.image === 'string') {
    try {
      parsedImage = JSON.parse(category.image);
    } catch (e) {
      parsedImage = category.image; // Keep as string if parsing fails
    }
  }

  // ✅ Return NEW object with parsed image (immutable)
  // ✅ Normalize data types: convert id and status to numbers
  return {
    ...category,
    id: typeof category.id === 'string' ? parseInt(category.id, 10) : category.id,
    status: typeof category.status === 'string' ? parseInt(category.status, 10) : category.status,
    image: parsedImage
  };
};

// ✅ Create category
export const createCategory = createAsyncThunk(
  "categories/create",
  async (categoryData, { rejectWithValue }) => {
    try {
      const res = await api.post(`${BASE_URL}/createCategory`, categoryData);
      return parseCategory(res.data.data);
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Get all categories
export const fetchAllCategories = createAsyncThunk(
  "categories/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(`${BASE_URL}/getAllCategories`);
      const categories = res.data.data || [];
      return categories.map(parseCategory);
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Get category by ID
export const fetchCategoryById = createAsyncThunk(
  "categories/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`${BASE_URL}/getSubCategoryByCategoryId/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Update category
export const updateCategory = createAsyncThunk(
  "categories/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.patch(`${BASE_URL}/updateCategory/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("✅ Backend response for updateCategory:", res.data);
      const parsedData = parseCategory(res.data.data);
      console.log("✅ Parsed category data:", parsedData);
      return parsedData;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


// ✅ Delete category
export const deleteCategory = createAsyncThunk(
  "categories/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`${BASE_URL}/deleteCategory/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 🔽 Slice
const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    categoryData: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch All
      .addCase(fetchAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch by ID
      .addCase(fetchCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryData = action.payload;
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.map((c) =>
          c.id === action.payload.id
            ? { ...c, ...action.payload, subcategories: c.subcategories || [] }
            : c
        );
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter(
          (c) => c.id !== action.payload
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
