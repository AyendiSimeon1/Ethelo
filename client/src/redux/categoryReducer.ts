import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = "http://localhost:4000";

export interface Data {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  count?: number;
}

export interface CategoryState {
  isLoading: boolean;
  data: Data[];
  error: string | null;
}

const initialState: CategoryState = {
  isLoading: false,
  data: [],
  error: null,
};

export const getCategories = createAsyncThunk(
  'category/getCategories',
  async (_, { rejectWithValue }) => {
    try {
      console.log('🚀 Initiating getCategories thunk');
      
      // Log axios config for debugging network issues
      const axiosConfig = {
        method: 'get',
        url: `${baseUrl}/project/get-category`,
        headers: {
          'Accept': 'application/json',
        },
      };
      console.log('📡 Axios Request Config:', JSON.stringify(axiosConfig, null, 2));

      const response = await axios.get(`${baseUrl}/project/get-category`);
      
      console.log('✅ API Response Received:', JSON.stringify(response.data, null, 2));

      // Validate response structure
      if (!response.data || !response.data.success || !Array.isArray(response.data.data)) {
        console.error('❌ Invalid API Response Structure', response.data);
        return rejectWithValue('Invalid response from server');
      }
      
      // Transform backend data to match the expected interface
      const transformedData = response.data.data.map((item: any, index: number) => {
        // Detailed logging for each item transformation
        console.log(`🔄 Transforming Item ${index}:`, JSON.stringify(item, null, 2));
        
        const transformedItem = {
          id: item._id || `missing-id-${index}`,
          title: item.title || 'Untitled',
          slug: item.slug || 'no-slug',
          description: item.description || 'No description',
          icon: item.icon ? item.icon.replace('zcv', '').toLowerCase() : 'palette',
        };

        console.log(`✨ Transformed Item ${index}:`, JSON.stringify(transformedItem, null, 2));
        
        return transformedItem;
      });

      console.log('🎉 Total Transformed Categories:', transformedData.length);
      
      return transformedData;
    } catch (error: any) {
      // Comprehensive error logging
      console.error('❌ Category Fetch Error:', error);
      
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Server Response Error:', {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers
        });
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No Response Received:', error.request);
      } else {
        // Something happened in setting up the request
        console.error('Error Setting Up Request:', error.message);
      }

      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        'An unexpected error occurred'
      );
    }
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        console.log('⏳ Category Fetch - Pending State');
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        console.log('✅ Category Fetch - Fulfilled', {
          categoryCount: action.payload.length
        });
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        console.error('❌ Category Fetch - Rejected', {
          error: action.payload
        });
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default categorySlice.reducer;