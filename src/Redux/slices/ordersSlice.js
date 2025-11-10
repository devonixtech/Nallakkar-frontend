 // src/Redux/slices/ordersSlice.js
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
      const res = await api.get(`${BASE_URL}/getOrderById/${userId}`);
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

/* 🆕 ✅ Check Shiprocket Pincode Serviceability (GET version) */
export const checkPincodeServiceability = createAsyncThunk(
  "orders/checkPincodeServiceability",
  async (delivery_postcode, { rejectWithValue }) => {
    try {
      // ✅ Changed from POST → GET
      const res = await api.get(`${BASE_URL}/checkPincodeServiceability/${delivery_postcode}`);
      return res.data;
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
    serviceability: null, // 🆕 new state for pincode check
    loading: false,
    error: null,
  },
  reducers: {
    clearOrderData: (state) => {
      state.orderData = null;
    },
    clearServiceability: (state) => {
      state.serviceability = null;
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
      })

      // 🆕 ✅ Check Pincode Serviceability
      .addCase(checkPincodeServiceability.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkPincodeServiceability.fulfilled, (state, action) => {
        state.loading = false;
        state.serviceability = action.payload;
      })
      .addCase(checkPincodeServiceability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrderData, clearServiceability } = ordersSlice.actions;
export default ordersSlice.reducer;
