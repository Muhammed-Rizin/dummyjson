import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ProductFetch, ProductsState } from "../types";

const initialState: ProductsState = {
  data: [],
  loading: false,
  error: null,
  page: 1,
  pageSize: 5,
  total: 0,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ page, pageSize, category }: ProductFetch) => {
    let query = `?limit=${pageSize}&skip=${(page - 1) * pageSize}`;
    if (category) query = `/category/${category}?limit=${pageSize}&skip=${(page - 1) * pageSize}`;

    const response = await axios.get(`https://dummyjson.com/products${query}`);
    return response.data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setPageSize(state, action) {
      state.pageSize = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.data = action.payload.products;
        state.total = action.payload.total;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch products";
        state.loading = false;
      });
  },
});

export const { setPageSize, setPage } = productsSlice.actions;
export default productsSlice.reducer;
