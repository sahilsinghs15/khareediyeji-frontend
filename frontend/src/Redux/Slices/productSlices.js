import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';

// API Base URL
const API_BASE_URL = '/api/v1/products';

// Async thunks to handle API calls

// Fetch all products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(API_BASE_URL);
    return data.products;
  } catch (error) {
    toast.error('Error fetching products');
    return rejectWithValue(error.response.data.message);
  }
});

// Fetch a single product by ID
export const fetchProductById = createAsyncThunk('products/fetchProductById', async (id, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/${id}`);
    return data.product;
  } catch (error) {
    toast.error('Error fetching product');
    return rejectWithValue(error.response.data.message);
  }
});

// Create a product (Admin, Seller)
export const createProduct = createAsyncThunk('products/createProduct', async (productData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(API_BASE_URL, productData);
    toast.success('Product created successfully');
    return data.product;
  } catch (error) {
    toast.error('Error creating product');
    return rejectWithValue(error.response.data.message);
  }
});

// Update a product (Admin, Seller)
export const updateProduct = createAsyncThunk('products/updateProduct', async ({ id, productData }, { rejectWithValue }) => {
  try {
    const { data } = await axios.put(`${API_BASE_URL}/${id}`, productData);
    toast.success('Product updated successfully');
    return data.product;
  } catch (error) {
    toast.error('Error updating product');
    return rejectWithValue(error.response.data.message);
  }
});

// Delete a product (Admin, Seller)
export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
    toast.success('Product deleted successfully');
    return id;
  } catch (error) {
    toast.error('Error deleting product');
    return rejectWithValue(error.response.data.message);
  }
});

// Initial state for the slice
const initialState = {
  products: [],
  product: null,
  loading: false,
  error: null,
};

// Product slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProduct(state) {
      state.product = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create product
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex((product) => product._id === action.payload._id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter((product) => product._id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { clearProduct } = productSlice.actions;
export default productSlice.reducer;
