import { Category } from '@/types/category';
import { createAsyncThunk,  createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = "http://localhost:4000";

export interface Data {
    title: String;
    slug: String ;
    description: String;
    icon: String;
}

export interface CategoryState {
    isLoading: boolean;
    data: Data[] | null;
    error: string |null
}

const initialState : CategoryState = {
    isLoading: false,
    data: null,
    error: null
}

export const getCategories = createAsyncThunk(
    'product/get-all-categories',
    async(_, { rejectWithValue })=>  {

        try {
            const response = await axios.get(`${baseUrl}/project/get-category`);

          return response.data.data;  
        } catch(error:any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);


const projectSlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.isLoading = false,
                state.data = action.payload;
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.isLoading =  false;
                state.error = action.payload as string || 'Unable to get categories';
              
            });
    }
});

export default projectSlice.reducer;