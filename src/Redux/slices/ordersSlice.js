// src/slices/ordersSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

const BASE_URL = "/shiprocket";

/* ✅ Get all orders */
export const fetchAllOrders = createAsyncThunk(
  "orders/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(`${BASE_URL}/getAllOrders`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* ✅ Get orders by User ID */
export const fetchOrdersByUserId = createAsyncThunk(
  "orders/fetchByUserId",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.get(`${BASE_URL}/getOrdersByUser/${userId}`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* ✅ Get order by Order ID */
export const fetchOrderByOrderId = createAsyncThunk(
  "orders/fetchByOrderId",
  async (orderId, { rejectWithValue }) => {
    try {
      const res = await api.get(`${BASE_URL}/getOrderById/${orderId}`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* 🔽 Slice */
const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    orderData: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearOrderData: (state) => {
      state.orderData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Fetch All Orders
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Fetch Orders by User ID
      .addCase(fetchOrdersByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrdersByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Fetch Order by Order ID
      .addCase(fetchOrderByOrderId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderByOrderId.fulfilled, (state, action) => {
        state.loading = false;
        state.orderData = action.payload;
      })
      .addCase(fetchOrderByOrderId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrderData } = ordersSlice.actions;
export default ordersSlice.reducer;
