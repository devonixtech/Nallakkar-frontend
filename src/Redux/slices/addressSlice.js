// src/Redux/slices/addressSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api"; // axios instance with baseURL (e.g. http://localhost:5000/api)

const BASE_URL = "/address";

// ✅ Create Address
export const createAddress = createAsyncThunk(
  "address/create",
  async (addressData, { rejectWithValue }) => {
    try {
      const res = await api.post(`${BASE_URL}/createAddress`, addressData);
      return res.data; // includes { status, message, id }
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Get All Addresses
export const getAllAddresses = createAsyncThunk(
  "address/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(`${BASE_URL}/getAllAddresses`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Get Address by ID
export const getAddressById = createAsyncThunk(
  "address/getById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`${BASE_URL}/getAddressById/${id}`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Get Addresses by User ID
export const getAddressesByUserId = createAsyncThunk(
  "address/getByUserId",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.get(`${BASE_URL}/getAddressesByUserId/${userId}`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Update Address
export const updateAddress = createAsyncThunk(
  "address/update",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const res = await api.patch(`${BASE_URL}/updateAddress/${id}`, updatedData);
      return { id, ...updatedData };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Delete Address
export const deleteAddress = createAsyncThunk(
  "address/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`${BASE_URL}/deleteAddress/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState: {
    addresses: [],
    currentAddress: null,
        selectedAddress: null, // <-- new

    loading: false,
    error: null,
  },
  reducers: {
    clearAddressError: (state) => {
      state.error = null;
    },
   setSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload;
      // Save in localStorage as well
      localStorage.setItem("selectedAddress", JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(createAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAddress.fulfilled, (state, action) => {
        state.loading = false;
        // optional: only push if API returns full address object
        state.addresses.push(action.payload);
      })
      .addCase(createAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET ALL
      .addCase(getAllAddresses.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload;
      })
      .addCase(getAllAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET BY ID
      .addCase(getAddressById.fulfilled, (state, action) => {
        state.currentAddress = action.payload;
      })

      // GET BY USER ID
      .addCase(getAddressesByUserId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAddressesByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload;
      })
      .addCase(getAddressesByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateAddress.fulfilled, (state, action) => {
        const index = state.addresses.findIndex((a) => a.id === action.payload.id);
        if (index !== -1) {
          state.addresses[index] = { ...state.addresses[index], ...action.payload };
        }
      })

      // DELETE
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.addresses = state.addresses.filter((a) => a.id !== action.payload);
      });
  },
});

export const { clearAddressError , setSelectedAddress} = addressSlice.actions;
export default addressSlice.reducer;
