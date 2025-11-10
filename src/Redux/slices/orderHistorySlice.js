import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

const BASE_URL = "/orders";

// ✅ Fetch orders for a particular user
export const fetchOrdersByUserId = createAsyncThunk(
  "orderHistory/fetchByUserId",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.get(`${BASE_URL}/getOrdersByUser/${userId}`);
      return res.data.data; // assuming backend returns { data: [...] }
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Fetch single order details by ID (optional)
export const fetchOrderDetails = createAsyncThunk(
  "orderHistory/fetchById",
  async (orderId, { rejectWithValue }) => {
    try {
      const res = await api.get(`${BASE_URL}/${orderId}`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 🔽 Slice
const orderHistorySlice = createSlice({
  name: "orderHistory",
  initialState: {
    userOrders: [],
    selectedOrder: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearOrderHistoryMessages: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch User Orders
      .addCase(fetchOrdersByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.userOrders = action.payload;
      })
      .addCase(fetchOrdersByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Single Order
      .addCase(fetchOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedOrder = action.payload;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrderHistoryMessages } = orderHistorySlice.actions;
export default orderHistorySlice.reducer;
