import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

const BASE_URL = "/contact";

// ✅ Create contact (submit contact form)
export const createContact = createAsyncThunk(
  "contacts/create",
  async (contactData, { rejectWithValue }) => {
    try {
      const res = await api.post(`${BASE_URL}/createContact`, contactData);
      return res.data; // assuming { success: true, data: {...} }
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Get all contacts (admin side)
export const fetchAllContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(`${BASE_URL}/getAllContacts`);
      return res.data.data; // assuming { data: [...] }
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Get contact by ID
export const fetchContactById = createAsyncThunk(
  "contacts/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`${BASE_URL}/${id}`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Delete contact (admin side)
export const deleteContact = createAsyncThunk(
  "contacts/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`${BASE_URL}/deleteContact/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 🔽 Slice
const contactSlice = createSlice({
  name: "contacts",
  initialState: {
    contacts: [],
    contactData: null,
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Contact
      .addCase(createContact.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts.push(action.payload);
        state.successMessage = "Message sent successfully!";
      })
      .addCase(createContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch All Contacts
      .addCase(fetchAllContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchAllContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Contact By ID
      .addCase(fetchContactById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContactById.fulfilled, (state, action) => {
        state.loading = false;
        state.contactData = action.payload;
      })
      .addCase(fetchContactById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Contact
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = state.contacts.filter((c) => c._id !== action.payload);
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessages } = contactSlice.actions;
export default contactSlice.reducer;
