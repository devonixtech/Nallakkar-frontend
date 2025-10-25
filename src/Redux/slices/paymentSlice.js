import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

const BASE_URL = "/payment";

// ✅ 1️⃣ Create Razorpay Order
export const createPaymentOrder = createAsyncThunk(
  "payment/createOrder",
  async (paymentData, { rejectWithValue }) => {
    try {
      const res = await api.post(`${BASE_URL}/create-payment`, paymentData);
      return res.data.data; // Razorpay order object
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ 2️⃣ Verify Payment + Create Shiprocket Order
export const verifyPaymentAndCreateShipment = createAsyncThunk(
  "payment/verifyPayment",
  async (verificationData, { rejectWithValue }) => {
    try {
      const res = await api.post(`${BASE_URL}/verify-payment`, verificationData);
      return res.data.data; // Shiprocket response + tracking URL
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    order: null,          // Razorpay order details
    shipment: null,       // Shiprocket shipment info
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetPaymentState: (state) => {
      state.order = null;
      state.shipment = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🟢 Create Order
      .addCase(createPaymentOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createPaymentOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
        state.success = true;
      })
      .addCase(createPaymentOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // 🟢 Verify Payment
      .addCase(verifyPaymentAndCreateShipment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyPaymentAndCreateShipment.fulfilled, (state, action) => {
        state.loading = false;
        state.shipment = action.payload;
        state.success = true;
      })
      .addCase(verifyPaymentAndCreateShipment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;
