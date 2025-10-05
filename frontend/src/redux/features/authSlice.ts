import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authInitialState, User } from "../reduxTypes/authType";
import { axiosInstance } from "@/utils/axiosInstance";

export const fetchUser = createAsyncThunk<User, void, { rejectValue: string }>(
  "auth/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/auth/me");
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch user");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    authPending(state) {
      state.isLoading = true;
      state.authError = null;
    },
    authRejected(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.authError = action.payload;
    },
    authFullFilled(state) {
      state.isLoading = false;
      state.authError = null;
    },
    checkEmailPending(state) {
      state.isLoading=true
    },
    checkEmailFullFilled(state) {
      state.isLoading=false
    },
    checkEmailRejected(state, action:PayloadAction<string>) {
      state.isLoading = false;
      state.authError = action.payload
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.authError = null;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.authError = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.authError = action.payload || "Failed to fetch user";
      });
  },
});

export const { authFullFilled,authPending,authRejected,checkEmailFullFilled,checkEmailPending,checkEmailRejected } = authSlice.actions;
export default authSlice.reducer;
