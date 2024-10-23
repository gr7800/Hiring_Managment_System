import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllJobs,
  createJob as createJobService,
  updateJob as updateJobService,
  deleteJob as deleteJobService,
  getJobById,
  getMyJob,
} from "../services/jobServices";

export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async ({ searchTerm = "", page = 1, limit = 5 }, { rejectWithValue }) => {
    try {
      return await getAllJobs(searchTerm, page, limit);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSingleJob = createAsyncThunk(
  "jobs/fetchSingleJob",
  async (jobId, { rejectWithValue }) => {
    try {
      return await getJobById(jobId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchMyJob = createAsyncThunk(
  "jobs/fetchmyjob",
  async ({ page, limit, sort, order }, { rejectWithValue }) => {
    try {
      return await getMyJob(page, limit, sort, order);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createJob = createAsyncThunk(
  "jobs/createJob",
  async (jobData, { rejectWithValue }) => {
    try {
      return await createJobService(jobData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateJob = createAsyncThunk(
  "jobs/updateJob",
  async ({ jobId, jobData }, { rejectWithValue }) => {
    try {
      return await updateJobService(jobId, jobData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteJob = createAsyncThunk(
  "jobs/deleteJob",
  async (jobId, { rejectWithValue }) => {
    try {
      return await deleteJobService(jobId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  jobs: [],
  singleJob: null,
  loading: false,
  totalPage: 1,
  currentPage: 1,
  error: null,
  message: null,
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload.jobs;
        state.totalPage = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.error = null;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchSingleJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleJob.fulfilled, (state, action) => {
        state.loading = false;
        state.singleJob = action.payload.job;
        state.error = null;
      })
      .addCase(fetchSingleJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchMyJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload.jobs;
        state.totalPage = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.error = null;
      })
      .addCase(fetchMyJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs.push(action.payload.job);
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(createJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessage } = jobSlice.actions;
export default jobSlice.reducer;
