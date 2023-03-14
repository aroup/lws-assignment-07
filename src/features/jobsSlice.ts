import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JobPostData, JobPutData, JobsInitialState } from "../types/job";
import { addJob, deleteJob, editJob, getJobs } from "./jobsAPI";
import { Job } from "../types/job";

const initialState: JobsInitialState = {
  jobs: [],
  isLoading: false,
  isError: false,
  error: "",
  editing: -1,
};

// async thunks
export const fetchJobs = createAsyncThunk("job/fetchJobs", async () => {
  const jobs = await getJobs();
  return jobs;
});

export const createJob = createAsyncThunk(
  "job/createJob",
  async (data: JobPostData) => {
    const job = await addJob(data);
    return job;
  }
);

export const changeJob = createAsyncThunk(
  "job/changeJob",
  async ({ id, data }: JobPutData) => {
    const job = await editJob(id, data);
    return job;
  }
);

export const removeJob = createAsyncThunk(
  "job/removeJob",
  async (id: number) => {
    const job = await deleteJob(id);
    return job;
  }
);

// create slice
const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    editActive: (state, action: PayloadAction<number>) => {
      state.editing = action.payload;
    },
    editInActive: (state) => {
      state.editing = -1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchJobs.fulfilled, (state, action: PayloadAction<Job[]>) => {
        state.isError = false;
        state.isLoading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message || "error";
        state.jobs = [];
      })
      .addCase(createJob.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(createJob.fulfilled, (state, action: PayloadAction<Job>) => {
        state.isError = false;
        state.isLoading = false;
        state.jobs.push(action.payload);
      })
      .addCase(createJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message || "error";
      })
      .addCase(changeJob.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(changeJob.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;

        const indexToUpdate = state.jobs.findIndex(
          (t) => t.id === action.payload.id
        );

        state.jobs[indexToUpdate] = action.payload;
      })
      .addCase(changeJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message || "error";
      })
      .addCase(removeJob.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(removeJob.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;

        state.jobs = state.jobs.filter((t) => t.id !== Number(action.meta.arg));
      })
      .addCase(removeJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message || "error";
      });
  },
});

export default jobSlice.reducer;
export const { editActive, editInActive } = jobSlice.actions;
