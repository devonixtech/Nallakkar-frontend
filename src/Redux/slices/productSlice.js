import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

const BASE_URL = "/product";

// ✅ Create product
export const createProduct = createAsyncThunk(
  "products/create",
  async (productData, { rejectWithValue }) => {
    try {
      const res = await api.post(`${BASE_URL}/createProduct`, productData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Get all products
export const fetchAllProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("product/getAllProducts");
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Get product by ID
export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`${BASE_URL}/getProductById/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Get products by subcategory
export const fetchProductsBySubcategory = createAsyncThunk(
  "products/fetchBySubcategory",
  async (subcategoryId, { rejectWithValue }) => {
    try {
      const res = await api.get(
        `product/getProductsBySubCategory/${subcategoryId}`
      );
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


export const fetchSimilarProducts = createAsyncThunk(
  "products/fetchSimilar",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`filteredProduct/getSimilarProducts/${id}`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
// ✅ Update product
export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.patch(`/product/updateProduct/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


// ✅ Delete product
export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`${BASE_URL}/deleteProduct/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Toggle Product Status (Active/Inactive)
export const updateProductStatus = createAsyncThunk(
  "products/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const res = await api.put(`${BASE_URL}/updateProductStatus`, {
        id,
        status
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Toggle Product Featured Status (Yes/No)
export const updateFeaturedStatus = createAsyncThunk(
  "products/updateFeatured",
  async ({ id, featuredStatus }, { rejectWithValue }) => {
    try {
      // Revert to Body, but send EVERYTHING to be safe.
      // Backend error "Both 'id' and 'status' are required" suggests it's checking req.body
      // but maybe our previous keys were slightly off or types were wrong.
      const payload = {
        id: String(id),          // Ensure string
        productId: String(id),   // Just in case it checks productId
        status: String(featuredStatus), // Ensure string "0"/"1"
        featuredStatus: String(featuredStatus) // Redundant backup
      };

      console.log("🚀 Redux sending updateFeaturedStatus:", payload);

      const res = await api.put(`${BASE_URL}/updateFeaturedStatus`, payload);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


// 🔽 Slice
const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    productData: null,
    similarProducts: [],
    recentlyViewed:
      JSON.parse(localStorage.getItem("recentlyViewed")) || [],
    loading: false,
    error: null,
  },
  reducers: {
    // ✅ Add Recently Viewed
    addRecentlyViewed: (state, action) => {
      const product = action.payload;

      // avoid duplicates
      const exists = state.recentlyViewed.find((p) => p._id === product._id);
      if (!exists) {
        state.recentlyViewed = [
          product,
          ...state.recentlyViewed,
        ].slice(0, 10); // keep only 10
        localStorage.setItem(
          "recentlyViewed",
          JSON.stringify(state.recentlyViewed)
        );
      }
    },
    clearRecentlyViewed: (state) => {
      state.recentlyViewed = [];
      localStorage.removeItem("recentlyViewed");
    },
    // ✅ Update product rating after review submission
    updateProductRating: (state, action) => {
      const { productId, avgRating, reviewCount } = action.payload;

      // Update in productData if it matches
      if (state.productData?.data?.id === productId) {
        state.productData.data.avgRating = avgRating;
        state.productData.data.reviewCount = reviewCount;
      }

      // Update in products array
      state.products = state.products.map((p) =>
        p.id === productId
          ? { ...p, avgRating, reviewCount }
          : p
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch All
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch by ID
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.productData = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch by Subcategory
      .addCase(fetchProductsBySubcategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsBySubcategory.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsBySubcategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Similar
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

      // Update
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.products = state.products.map((p) =>
          p.id === action.payload.id ? action.payload : p
        );
      })

      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (p) => p._id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Product Status
      // // Update Status
      .addCase(updateProductStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProductStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.map((p) =>
          (p._id === action.payload.id || p.id === action.payload.id)
            ? { ...p, status: action.payload.status }
            : p
        );
      })
      .addCase(updateProductStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Featured Status
      .addCase(updateFeaturedStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateFeaturedStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.map((p) =>
          (p._id === action.payload.id || p.id === action.payload.id)
            ? { ...p, featuredStatus: action.payload.featuredStatus }
            : p
        );
      })
      .addCase(updateFeaturedStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addRecentlyViewed, clearRecentlyViewed, updateProductRating } =
  productSlice.actions;

export default productSlice.reducer;
