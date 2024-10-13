import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  applyToJob as apiApplyToJob,
  getApplicationsForJob as apiGetApplicationsForJob,
  updateApplicationStatus as apiUpdateApplicationStatus,
  getApplicationDetails as apiGetApplicationDetails,
} from "../services/applicationService";

export const applyToJob = createAsyncThunk(
  "applications/applyToJob",
  async ({ jobId, resumeUrl }, { rejectWithValue }) => {
    try {
      const response = await apiApplyToJob(jobId, resumeUrl);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getApplicationsForJob = createAsyncThunk(
  "applications/getApplicationsForJob",
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await apiGetApplicationsForJob(jobId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateApplicationStatus = createAsyncThunk(
  "applications/updateApplicationStatus",
  async ({ applicationId, status }, { rejectWithValue }) => {
    try {
      const response = await apiUpdateApplicationStatus(applicationId, status);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getApplicationDetails = createAsyncThunk(
  "applications/getApplicationDetails",
  async (applicationId, { rejectWithValue }) => {
    try {
      const response = await apiGetApplicationDetails(applicationId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const applicationsSlice = createSlice({
  name: "applications",
  initialState: {
    applications: [],
    applicationDetails: null,
    loading: false,
    error: "",
  },
  reducers: {
    resetApplicationDetails: (state) => {
      state.applicationDetails = null;
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(applyToJob.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(applyToJob.fulfilled, (state, action) => {
        state.loading = false;
        state.applications.push(action.payload.application);
        state.error = "";
      })
      .addCase(applyToJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getApplicationsForJob.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getApplicationsForJob.fulfilled, (state, action) => {
        state.loading = false;
        state.applications = action.payload;
        state.error = "";
      })
      .addCase(getApplicationsForJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateApplicationStatus.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(updateApplicationStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.applications.findIndex(
          (app) => app._id === action.payload.application._id
        );
        if (index !== -1) {
          state.applications[index] = action.payload.application;
        }
        state.error = "";
      })
      .addCase(updateApplicationStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getApplicationDetails.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getApplicationDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.applicationDetails = action.payload;
        state.error = "";
      })
      .addCase(getApplicationDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetApplicationDetails } = applicationsSlice.actions;

export default applicationsSlice.reducer;
