import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = 'http://localhost:4000';

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


export const fetchApplications = createAsyncThunk(
  'applications/fetchApplications',
  async (projectId: string, thunkAPI) => {
    try {
      const response = await axios.get(`${baseUrl}/project/applications/${projectId}`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to fetch applications'
      );
    }
  }
);


export const createApplication = createAsyncThunk(
  'applications/createApplication',
  async (applicationData: Omit<ApplicationType, 'id' | 'appliedOn' | 'status'>, thunkAPI) => {
    console.log('Thisis is the application data:', applicationData)
    try {
      const response = await axios.post(`${baseUrl}/project/application`, applicationData);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response || 'Failed to create application'
      );
    }
  }
);

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
