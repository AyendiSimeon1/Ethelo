import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export type ApplicationType = {
  id: string;
  userName: string;
  userEmail: string;
  phone: string;
  address: string;
  age: number;
  projectId: string;
  skills: string[];
  motivation?: string;
  experience?: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
  appliedOn: string;
};

type InitialStateType = {
  applications: ApplicationType[];
  loading: boolean;
  error: string | null;
};

const initialState: InitialStateType = {
  applications: [],
  loading: false,
  error: null,
};

// Fetch applications for a specific project
export const fetchApplications = createAsyncThunk(
  'applications/fetchApplications',
  async (projectId: string, thunkAPI) => {
    try {
      const response = await axios.get(`/api/projects/${projectId}/applications`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to fetch applications'
      );
    }
  }
);

// Create a new application
export const createApplication = createAsyncThunk(
  'applications/createApplication',
  async (applicationData: Omit<ApplicationType, 'id' | 'appliedOn' | 'status'>, thunkAPI) => {
    try {
      const response = await axios.post(`/api/applications`, applicationData);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to create application'
      );
    }
  }
);

// Update application status
export const updateApplicationStatus = createAsyncThunk(
  'applications/updateApplicationStatus',
  async (
    { applicationId, status }: { applicationId: string; status: 'Accepted' | 'Rejected' },
    thunkAPI
  ) => {
    try {
      const response = await axios.put(`/api/applications/${applicationId}`, { status });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to update application status'
      );
    }
  }
);

const applicationSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch applications
      .addCase(fetchApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApplications.fulfilled, (state, action: PayloadAction<ApplicationType[]>) => {
        state.loading = false;
        state.applications = action.payload;
      })
      .addCase(fetchApplications.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create application
      .addCase(createApplication.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createApplication.fulfilled, (state, action: PayloadAction<ApplicationType>) => {
        state.loading = false;
        state.applications.push(action.payload);
      })
      .addCase(createApplication.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update application status
      .addCase(updateApplicationStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateApplicationStatus.fulfilled, (state, action: PayloadAction<ApplicationType>) => {
        state.loading = false;
        state.applications = state.applications.map((application) =>
          application.id === action.payload.id ? action.payload : application
        );
      })
      .addCase(updateApplicationStatus.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default applicationSlice.reducer;
