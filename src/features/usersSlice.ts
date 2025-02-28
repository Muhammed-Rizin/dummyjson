import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { UserFetch, UsersState } from "../types";

const initialState: UsersState = {
  data: [],
  loading: false,
  error: null,
  page: 1,
  pageSize: 5,
  total: 0,
};

export const fetchUsers = createAsyncThunk(
  "users/fetch",
  async ({ page, pageSize, search, searchBy }: UserFetch) => {
    let query = `?limit=${pageSize}&skip=${(page - 1) * pageSize}`;
    if (searchBy && search) {
      query = `/filter?limit=${pageSize}&skip=${(page - 1) * pageSize}&key=${
        searchBy || ""
      }&value=${search || ""}`;
    }

    const response = await axios.get(`https://dummyjson.com/users${query}`);
    return response.data;
  }
);

const usersSlice = createSlice({
  name: "users",
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
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.data = action.payload.users;
        state.total = action.payload.total;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch users";
        state.loading = false;
      });
  },
});

export const { setPageSize, setPage } = usersSlice.actions;
export default usersSlice.reducer;
