import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../url/url";

const initialState = {
  token: null,

  // login
  loginData: {},
  loginIsLoading: false,
  loginIsError: false,
  loginError: "",
  loginIsSuccess: false,

  // logout
  logoutData: {},
  logoutIsLoading: false,
  logoutIsError: false,
  logoutError: "",
  logoutIsSuccess: false,
};

export const loginAction = createAsyncThunk(
  "auth/loginAction",
  async (payload) => {
    const response = await axios.post(`${baseUrl}/auth/login`, payload);
    return response.data;
  }
);

export const logoutAction = createAsyncThunk("auth/logoutAction", async () => {
  const response = await axios.post(`${baseUrl}/auth/logout`);
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload;
      state.token = accessToken;
    },
    logOut: (state) => {
      state.token = null;
    },
    resetLoginAction(state) {
      state.loginData = {};
      state.loginIsLoading = false;
      state.loginIsError = false;
      state.loginError = "";
      state.loginIsSuccess = false;
    },
    resetLogoutAction(state) {
      state.logoutData = {};
      state.logoutIsLoading = false;
      state.logoutIsError = false;
      state.logoutError = "";
      state.logoutIsSuccess = false;
    },
  },
  extraReducers(builder) {
    builder
      // login
      .addCase(loginAction.pending, (state) => {
        state.loginData = {};
        state.loginIsLoading = true;
        state.loginIsError = false;
        state.loginError = "";
        state.loginIsSuccess = false;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        // console.log("Inside fulfilled", action)

        state.loginData = action.payload;
        state.loginIsLoading = false;
        state.loginIsError = false;
        state.loginError = "";
        state.loginIsSuccess = true;
      })
      .addCase(loginAction.rejected, (state, action) => {
        // console.log("Inside error", action)

        state.loginData = {};
        state.loginIsLoading = false;
        state.loginIsError = true;
        state.loginError = action.error.message;
        state.loginIsSuccess = false;
      })

      // logout
      .addCase(logoutAction.pending, (state) => {
        state.logoutData = {};
        state.logoutIsLoading = true;
        state.logoutIsError = false;
        state.logoutError = "";
        state.logoutIsSuccess = false;
      })
      .addCase(logoutAction.fulfilled, (state, action) => {
        // console.log("Inside fulfilled", action)

        state.logoutData = action.payload;
        state.logoutIsLoading = false;
        state.logoutIsError = false;
        state.logoutError = "";
        state.logoutIsSuccess = true;
      })
      .addCase(logoutAction.rejected, (state, action) => {
        // console.log("Inside error", action)

        state.logoutData = {};
        state.logoutIsLoading = false;
        state.logoutIsError = true;
        state.logoutError = action.error.message;
        state.logoutIsSuccess = false;
      });
  },
});

export const { setCredentials, logOut, resetLoginAction, resetLogoutAction } =
  authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;

// login
export const loginData = (state) => state.auth.loginData;
export const loginIsLoading = (state) => state.auth.loginIsLoading;
export const loginIsError = (state) => state.auth.loginIsError;
export const loginError = (state) => state.auth.loginError;
export const loginIsSuccess = (state) => state.auth.loginIsSuccess;

// logout
export const logoutData = (state) => state.auth.logoutData;
export const logoutIsLoading = (state) => state.auth.logoutIsLoading;
export const logoutIsError = (state) => state.auth.logoutIsError;
export const logoutError = (state) => state.auth.logoutError;
export const logoutIsSuccess = (state) => state.auth.logoutIsSuccess;
