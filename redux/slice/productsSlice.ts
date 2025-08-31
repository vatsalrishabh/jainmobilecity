import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from '../../sanity.types';

interface ProductsState {
  items: Product[];
  filteredItems: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  filteredItems: [],
  loading: false,
  error: null,
};

// ✅ Fetch products from API
export const fetchProducts = createAsyncThunk<Product[], void, { rejectValue: string }>(
  'products/fetchProducts',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get<Product[]>('/api/products');
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch products');
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // ✅ Filter by brand
    filterByBrand(state, action: PayloadAction<string>) {
      if (action.payload === 'ALL') {
        state.filteredItems = [...state.items];
      } else {
        state.filteredItems = state.items.filter(
          (p) => p.brand?._ref === action.payload
        );
      }
    },

    // ✅ Filter by Price Range
    filterByPriceRange(state, action: PayloadAction<{ min: number; max: number }>) {
      state.filteredItems = state.filteredItems.filter(
        (p) => p.price && p.price >= action.payload.min && p.price <= action.payload.max
      );
    },

    // ✅ Sort by Price Low → High
    sortByPriceLowHigh(state) {
      state.filteredItems = [...state.filteredItems].sort(
        (a, b) => (a.price || 0) - (b.price || 0)
      );
    },

    // ✅ Sort by Price High → Low
    sortByPriceHighLow(state) {
      state.filteredItems = [...state.filteredItems].sort(
        (a, b) => (b.price || 0) - (a.price || 0)
      );
    },

    // ✅ Sort by Newest First
    sortByNewest(state) {
      state.filteredItems = [...state.filteredItems].sort(
        (a, b) => new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime()
      );
    },

    // ✅ Reset Filters
    resetFilters(state) {
      state.filteredItems = [...state.items];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.items = action.payload;
        state.filteredItems = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export const {
  filterByBrand,
  filterByPriceRange,
  sortByPriceLowHigh,
  sortByPriceHighLow,
  sortByNewest,
  resetFilters,
} = productsSlice.actions;

export default productsSlice.reducer;
