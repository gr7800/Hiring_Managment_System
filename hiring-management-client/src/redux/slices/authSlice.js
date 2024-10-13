import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  registerUserService,
  loginUserService,
  fetchUserProfileService,
  updateUserProfileService,
} from "../services/authServices";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const data = await registerUserService(userData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const data = await loginUserService(userData);
      localStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      const data = await fetchUserProfileService(token);
      return data;
    } catch (error) {
      if (error.message === "No token found" || error.message.includes("401")) {
        dispatch(logout());
      }
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      const data = await updateUserProfileService(userData, token);
      return data;
    } catch (error) {
      if (error.message === "No token found" || error.message.includes("401")) {
        dispatch(logout());
      }
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    auth: false,
    loading: false,
    error: "",
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.auth = false;
      state.user = null;
      state.token = null;
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.auth = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = "";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.auth = false;
        state.error = action.payload;
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.auth = true;
        state.token = action.payload.token;
        state.error = "";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.auth = false;
        state.error = action.payload;
      })

      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.auth = true;
        state.user = action.payload;
        state.error = "";
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.auth = false;
        state.error = action.payload;
      })

      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = "";
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
