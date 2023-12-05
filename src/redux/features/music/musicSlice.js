import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../url/url";
import { logOut, setCredentials } from "../auth/authSlice";

const initialState = {
  // getmusic
  getMusicData: {},
  getMusicIsLoading: false,
  getMusicIsError: false,
  getMusicError: "",
  getMusicIsSuccess: false,

  // uploadmusic
  uploadMusicData: {},
  uploadMusicIsLoading: false,
  uploadMusicIsError: false,
  uploadMusicError: "",
  uploadMusicIsSuccess: false,

  // delete music
  deleteMusicData: {},
  deleteMusicIsLoading: false,
  deleteMusicIsError: false,
  deleteMusicError: "",
  deleteMusicIsSuccess: false,
};

// Separate function for token refresh
const refreshAccessToken = async (thunkAPI) => {
  try {
    const refreshResponse = await axios.post(
      `${baseUrl}/auth/refresh`,
      {},
      {
        withCredentials: true,
      }
    );

    if (refreshResponse.data && refreshResponse.data.accessToken) {
      // Refresh successful, update token
      thunkAPI.dispatch(setCredentials(refreshResponse.data));
      return refreshResponse.data.accessToken;
    } else {
      // Refresh token is also expired, log out
      thunkAPI.dispatch(logOut());
      // Throw an error to be caught in the main action
      throw new Error("Your login has expired. Please log in again.");
    }
  } catch (refreshError) {
    // Handle refresh error, log out, etc.
    thunkAPI.dispatch(logOut());
    // Throw an error to be caught in the main action
    throw new Error("Your login has expired. Please log in again.");
  }
};

export const getMusicAction = createAsyncThunk(
  "music/getMusic",
  async (payload, thunkAPI) => {
    const { search, genre, page } = payload;

    try {
      const token = thunkAPI.getState().auth.token;
      const response = await axios.get(
        `${baseUrl}/music/get-music?search=${search}&genre=${genre}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 403) {
        // Token expired, attempt to refresh
        const refreshedToken = await refreshAccessToken(thunkAPI);

        if (refreshedToken) {
          // Retry original request with the new access token
          const retryResponse = await axios.get(
            `${baseUrl}/music/get-music?search=${search}&genre=${genre}&page=${page}`,
            {
              headers: {
                Authorization: `Bearer ${refreshedToken}`,
              },
            }
          );

          return retryResponse.data;
        }
      }

      // Handle other errors here if needed
      throw error;
    }
  }
);

export const uploadMusicAction = createAsyncThunk(
  "music/uploadMusic",
  async (payload, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await axios.post(`${baseUrl}/music/upload`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 403) {
        // Token expired, attempt to refresh
        const refreshedToken = await refreshAccessToken(thunkAPI);

        if (refreshedToken) {
          // Retry original request with the new access token
          const retryResponse = await axios.post(
            `${baseUrl}/music/upload`,
            payload,
            {
              headers: {
                Authorization: `Bearer ${refreshedToken}`,
              },
            }
          );

          return retryResponse.data;
        }
      }

      // Handle other errors here if needed
      throw error;
    }
  }
);

export const deleteMusicAction = createAsyncThunk(
  "music/deleteMusic",
  async (payload, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      console.log("token delete", token);
      const response = await axios.delete(
        `${baseUrl}/music/delete-music/${payload}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 403) {
        // Token expired, attempt to refresh
        const refreshedToken = await refreshAccessToken(thunkAPI);

        if (refreshedToken) {
          // Retry original request with the new access token
          const retryResponse = await axios.delete(
            `${baseUrl}/music/delete-music/${payload}`,
            payload,
            {
              headers: {
                Authorization: `Bearer ${refreshedToken}`,
              },
            }
          );

          return retryResponse.data;
        }
      }

      // Handle other errors here if needed
      throw error;
    }
  }
);

export const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    resetUploadMusic(state) {
      state.uploadMusicData = {};
      state.uploadMusicIsLoading = false;
      state.uploadMusicIsError = false;
      state.uploadMusicError = "";
      state.uploadMusicIsSuccess = false;
    },
    resetdeleteMusic(state) {
      state.deleteMusicData = {};
      state.deleteMusicIsLoading = false;
      state.deleteMusicIsError = false;
      state.deleteMusicError = "";
      state.deleteMusicIsSuccess = false;
    },
  },
  extraReducers(builder) {
    builder
      // get music
      .addCase(getMusicAction.pending, (state) => {
        state.getMusicData = {};
        state.getMusicIsLoading = true;
        state.getMusicIsError = false;
        state.getMusicError = "";
        state.getMusicIsSuccess = false;
      })
      .addCase(getMusicAction.fulfilled, (state, action) => {
        // console.log("Inside fulfilled", action)

        state.getMusicData = action.payload;
        state.getMusicIsLoading = false;
        state.getMusicIsError = false;
        state.getMusicError = "";
        state.getMusicIsSuccess = true;
      })
      .addCase(getMusicAction.rejected, (state, action) => {
        // console.log("Inside error", action)

        state.getMusicData = {};
        state.getMusicIsLoading = false;
        state.getMusicIsError = true;
        state.getMusicError = action.error.message;
        state.getMusicIsSuccess = false;
      })

      // upload music
      .addCase(uploadMusicAction.pending, (state) => {
        state.uploadMusicData = {};
        state.uploadMusicIsLoading = true;
        state.uploadMusicIsError = false;
        state.uploadMusicError = "";
        state.uploadMusicIsSuccess = false;
      })
      .addCase(uploadMusicAction.fulfilled, (state, action) => {
        // console.log("Inside fulfilled", action)

        state.uploadMusicData = action.payload;
        state.uploadMusicIsLoading = false;
        state.uploadMusicIsError = false;
        state.uploadMusicError = "";
        state.uploadMusicIsSuccess = true;
      })
      .addCase(uploadMusicAction.rejected, (state, action) => {
        // console.log("Inside error", action)

        state.uploadMusicData = {};
        state.uploadMusicIsLoading = false;
        state.uploadMusicIsError = true;
        state.uploadMusicError = action.error.message;
        state.uploadMusicIsSuccess = false;
      })

      // delete music
      .addCase(deleteMusicAction.pending, (state) => {
        state.deleteMusicData = {};
        state.deleteMusicIsLoading = true;
        state.deleteMusicIsError = false;
        state.deleteMusicError = "";
        state.deleteMusicIsSuccess = false;
      })
      .addCase(deleteMusicAction.fulfilled, (state, action) => {
        // console.log("Inside fulfilled", action)

        state.deleteMusicData = action.payload;
        state.deleteMusicIsLoading = false;
        state.deleteMusicIsError = false;
        state.deleteMusicError = "";
        state.deleteMusicIsSuccess = true;
      })
      .addCase(deleteMusicAction.rejected, (state, action) => {
        // console.log("Inside error", action)

        state.deleteMusicData = {};
        state.deleteMusicIsLoading = false;
        state.deleteMusicIsError = true;
        state.deleteMusicError = action.error.message;
        state.deleteMusicIsSuccess = false;
      });
  },
});

export const { resetUploadMusic, resetdeleteMusic } = musicSlice.actions;

export default musicSlice.reducer;

// get music
export const getMusicData = (state) => state.music.getMusicData;
export const getMusicIsLoading = (state) => state.music.getMusicIsLoading;
export const getMusicIsError = (state) => state.music.getMusicIsError;
export const getMusicError = (state) => state.music.getMusicError;
export const getMusicIsSuccess = (state) => state.music.getMusicIsSuccess;

// upload music
export const uploadMusicData = (state) => state.music.uploadMusicData;
export const uploadMusicIsLoading = (state) => state.music.uploadMusicIsLoading;
export const uploadMusicIsError = (state) => state.music.uploadMusicIsError;
export const uploadMusicError = (state) => state.music.uploadMusicError;
export const uploadMusicIsSuccess = (state) => state.music.uploadMusicIsSuccess;

// delete music

export const deleteMusicData = (state) => state.music.deleteMusicData;
export const deleteMusicIsLoading = (state) => state.music.deleteMusicIsLoading;
export const deleteMusicIsError = (state) => state.music.deleteMusicIsError;
export const deleteMusicError = (state) => state.music.deleteMusicError;
export const deleteMusicIsSuccess = (state) => state.music.deleteMusicIsSuccess;
