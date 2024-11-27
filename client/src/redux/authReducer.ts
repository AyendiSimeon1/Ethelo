import dotenv from 'dotenv';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootStateInterface } from './store';
dotenv.config();

const baseUrl = "http://localhost:3000";
console.log(baseUrl);

export interface User {
    id?: string;
    email: string;
    password?: string;
}

// Authentication state interface
export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

// Initial state
const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null
};


export const SignupUser = createAsyncThunk<
    User,            
    { email: string; password: string }, 
    { 
        state: RootStateInterface, 
        rejectValue: string 
    }
>(
    'auth/signup',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${baseUrl}/auth/signup`, userData);
            return response.data as User;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Signup failed');
        }
    }
);

export const LoginUser = createAsyncThunk< User, 
    { email: string; password: string},
    {
        state: RootStateInterface,
        rejectValue: string
    }
    > (
        'auth/login',
        async (userData, { rejectWithValue}) => {

            try {
                const response = await axios.post(`${baseUrl}/auth/login`, userData);
                return response.data as User
            } catch (error: any) {
                return rejectWithValue(error.response?.data?.message || 'Login failed');
            }
        }
    ) 


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(SignupUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(SignupUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(SignupUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Signup failed';
                state.isAuthenticated = false;
            })
            .addCase(LoginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(LoginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(LoginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string || 'Login failed'; 
            })
    }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;