 import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

const BASE_URL = "/banner";

// --------------------------------------------------
// 📌 Upload Banners (POST /uploadBanners)
// --------------------------------------------------
export const uploadBanners = createAsyncThunk(
  "banners/upload",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post(`${BASE_URL}/uploadBanners`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // API returns: { id, name, images }
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// --------------------------------------------------
// 📌 Get All Banners (GET /getBanners)
// --------------------------------------------------
export const getBanners = createAsyncThunk(
  "banners/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(`${BASE_URL}/getBanners`);
      return res.data.data; // [{ id, name, images, createdAt }]
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// --------------------------------------------------
// 📌 Update Banners (PATCH /updateBanners/:id)
// --------------------------------------------------
export const updateBanners = createAsyncThunk(
  "banners/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await api.patch(`${BASE_URL}/updateBanners/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // return full updated banner
      return {
        id,
        name: res.data.data.name,
        images: res.data.data.images,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// --------------------------------------------------
// 📌 Delete Banner (DELETE /deleteBanners/:id)
// --------------------------------------------------
export const deleteBanners = createAsyncThunk(
  "banners/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`${BASE_URL}/deleteBanners/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// --------------------------------------------------
// 📌 Banner Slice
// --------------------------------------------------
const bannerSlice = createSlice({
  name: "banners",
  initialState: {
    banners: [],           // list of banners
    selectedBanner: null,  // currently selected banner
    loading: false,
    error: null,
  },

  reducers: {
    clearBannerError: (state) => {
      state.error = null;
    },

    setSelectedBanner: (state, action) => {
      state.selectedBanner = action.payload;
      localStorage.setItem("selectedBanner", JSON.stringify(action.payload));
    },
  },

  extraReducers: (builder) => {
    builder

      // --------------------------------------------------
      // GET BANNERS
      // --------------------------------------------------
      .addCase(getBanners.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload;
      })
      .addCase(getBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --------------------------------------------------
      // UPLOAD BANNERS
      // --------------------------------------------------
      .addCase(uploadBanners.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.banners.push(action.payload); // {id, name, images}
      })
      .addCase(uploadBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --------------------------------------------------
      // UPDATE BANNERS
      // --------------------------------------------------
      .addCase(updateBanners.fulfilled, (state, action) => {
        const index = state.banners.findIndex((b) => b.id === action.payload.id);

        if (index !== -1) {
          state.banners[index] = {
            ...state.banners[index],
            name: action.payload.name,
            images: action.payload.images,
          };
        }
      })

      // --------------------------------------------------
      // DELETE BANNERS
      // --------------------------------------------------
      .addCase(deleteBanners.fulfilled, (state, action) => {
        state.banners = state.banners.filter((b) => b.id !== action.payload);
      });
  },
});

export const { clearBannerError, setSelectedBanner } = bannerSlice.actions;
export default bannerSlice.reducer;
