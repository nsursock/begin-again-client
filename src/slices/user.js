import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  signup,
  login,
  signInWithGoogle,
  signInWithGitHub,
  signInWithFacebook,
  signInWithTwitter,
} from "../helpers/auth";

export const signupUser = createAsyncThunk(
  "users/signup",
  async ({ name, email, password }, thunkAPI) => {
    try {
      const result = await signup(email, password);
      if (result.user) {
        return { email: email };
      } else {
        return thunkAPI.rejectWithValue(result.message);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue({ message: e.message });
    }
  }
);

export const loginUser = createAsyncThunk(
  "users/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const result = await login(email, password);
      if (result.user) {
        return { email: email };
      } else {
        return thunkAPI.rejectWithValue(result.message);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue({ message: e.message });
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
    user: null,
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      return state;
    },
    setLoggedInUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: {
    [signupUser.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.email = payload.email;
    },
    [signupUser.pending]: (state) => {
      state.isFetching = true;
    },
    [signupUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.email = payload.email;
      state.isFetching = false;
      state.isSuccess = true;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [loginUser.pending]: (state) => {
      state.isFetching = true;
    },
  },
});

export const { clearState, setLoggedInUser } = userSlice.actions;
export const userSelector = (state) => state.user;
