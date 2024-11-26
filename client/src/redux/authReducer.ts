import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = process.env.BASEURL

export interface User {
    id: string,
    email: string,
    password: string 
};

export interface AuthState {
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean
    error: string | null
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null
}

export const Signup = createAsyncThunk(
    'auth/signup',
    async (formData : { email: string, password: string }, { rejectWithValue}) => {
        try {
            const response = await axios.post(`${baseUrl}/signup`, formData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.message || 'Signup failled');
        }
    } 
);

export const Login = createAsyncThunk(
    'auth/login',
    async (formData : { email: string, password: string}, { rejectWithValue}) => {
        try {
            const response = await axios.post(`${baseUrl}/login`, formData);
            const { user, token} = response.data;

            localStorage.setItem('authToken', token);

            return user;

        } catch (error: any) {
            return rejectWithValue(error.response?.message || 'Login failed');
        } 
    }
);

export const verifyUser = createAsyncThunk(
    'auth/verifyUser',
    async (_, { rejectWithValue }) => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        return rejectWithValue('No token found');
      }
    }
  );
  

const authSlce = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(Signup.pending, (state) => {
            state.isLoading = true,
            state.error = null
        });
        builder.addCase(Signup.fulfilled, (state, action) => {
            state.isLoading = false,
            state.user = action.payload,
            state.error = null,
            state.isAuthenticated = true
        });
        builder.addCase(Signup.rejected, (state, action) => {
            state.isAuthenticated= false,
            state.error = action.error as string,
            state.isLoading = false
        });
        builder.addCase(Login.pending, (state) => {
            state.isLoading = true,
            state.error = null  

        });
        builder.addCase(Login.fulfilled, (state, action) => {
            state.isLoading = false,
            state.user = action.payload,
            state.error = null,
            state.isAuthenticated = true
        });
        builder.addCase(Login.rejected, (state, action) => {
            state.isAuthenticated= false,
            state.error = action.error as string,
            state.isLoading = false
        });
        builder.addCase(verifyUser.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.isLoading = false;
          });
          builder.addCase(verifyUser.rejected, (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            localStorage.removeItem('authToken');
          });
    } 
});

export default authSlce.reducer;