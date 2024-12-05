import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = "http://localhost:4000";

export interface Project {
    _id: any;
    id?: string;
    title?: string;
    description?: string;
    categoryId?: string;
    organizationName?: string;
    location?: string;
    duration?: string;
    requiredSkills?: string[];
    contactEmail?: string;
    volunteerCount?: number;
}

export interface ProjectState {
    projects: Project[] | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: ProjectState = {
    projects: null,
    isLoading: false,
    error: null
};

export const getProject = createAsyncThunk(
    'project/get-project',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${baseUrl}/project/all-projects`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch projects");
        }
    }
);

export const createProject = createAsyncThunk(
    'project/create-project',
    async (formData: Project, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${baseUrl}/project/create-project`, formData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to create project");
        }
    }
);

export const updateProject = createAsyncThunk(
    'project/update-project',
    async (formData: Project, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${baseUrl}/project/update-project`, formData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to update project");
        }
    }
);

export const deleteProject = createAsyncThunk(
    'project/delete-project',
    async (projectId: string, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${baseUrl}/project/delete-project/${projectId}`);
            return { id: projectId };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to delete project");
        }
    }
);



const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProject.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProject.fulfilled, (state, action) => {
                state.isLoading = false;
                state.projects = action.payload;
                state.error = null;
            })
            .addCase(getProject.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(createProject.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createProject.fulfilled, (state, action) => {
                state.isLoading = false;
                state.projects = action.payload.data;
                state.error = null;
            })
            .addCase(createProject.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(updateProject.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProject.fulfilled, (state, action) => {
                state.isLoading = false;
                if (state.projects) {
                    const index = state.projects.findIndex(project => project.id === action.payload.id);
                    if (index !== -1) {
                        state.projects[index] = action.payload.data; // Update the project in place
                    }
                }
                state.error = null;
            })
            .addCase(updateProject.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteProject.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProject.fulfilled, (state, action) => {
                state.isLoading = false;
                if (state.projects) {
                    state.projects = state.projects.filter(project => project.id !== action.payload.id);
                }
                state.error = null;
            })
            .addCase(deleteProject.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    }
});

export default projectSlice.reducer;
