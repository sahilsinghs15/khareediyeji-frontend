import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';
import axiosInstance from '../../Helpers/axiosInstance';


// Initial state for the slice
const initialState = {
  products: [],
  loading: false,
  error: null,
};


// Fetch all products
export const fetchProducts = createAsyncThunk('/products/fetchProducts', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get('/product');
    console.log("Data:",data);
    return data?.products;
  } catch (error) {
    toast.error('Error fetching products');
    return rejectWithValue(error.response.data.message);
  }
});

// Fetch a single product by ID
export const fetchProductById = createAsyncThunk('/products/fetchProductById', async (id, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get(`/product/${id}`);
    return data?.product;
  } catch (error) {
    toast.error('Error fetching product');
    return rejectWithValue(error.response.data.message);
  }
});

//Fetch Products by query

export const fetchProductsByQuery = createAsyncThunk(
  '/products/fetchProductsByQuery',
  async (query, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/product/search`, {
        params: { query: query }, // Use 'params' to add the query string
      });
      return data?.products; 
    } catch (error) {
      toast.error('Error in searching Products');
      return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
  }
);



// Create a product (Admin, Seller)
export const createProduct = createAsyncThunk('/products/createProduct', async (productData, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.post('/product', productData);
    toast.success('Product created successfully');
    return data?.product;
  } catch (error) {
    toast.error('Error creating product');
    return rejectWithValue(error.response.data.message);
  }
});

// Update a product (Admin, Seller)
export const updateProduct = createAsyncThunk('/products/updateProduct', async ({ id, productData }, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.put(`product/${id}`, productData);
    toast.success('Product updated successfully');
    return data?.product;
  } catch (error) {
    toast.error('Error updating product');
    return rejectWithValue(error.response.data.message);
  }
});

// Delete a product (Admin, Seller)
export const deleteProduct = createAsyncThunk('/products/deleteProduct', async (id, { rejectWithValue }) => {
  try {
    await axiosInstance.delete(`product/${id}`);
    toast.success('Product deleted successfully');
    return id;
  } catch (error) {
    toast.error('Error deleting product');
    return rejectWithValue(error.response.data.message);
  }
});


// Product slice
const productSlice = createSlice({
  name: 'productsList',
  initialState,
  reducers: {
    clearProducts : (state)=>{
      state.products = [];
    }
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
        state.products.push(action.payload);
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //Fetch Product by query
      .addCase(fetchProductsByQuery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByQuery.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsByQuery.rejected, (state, action) => {
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
export const { clearProducts } = productSlice.actions;
export default productSlice.reducer;
