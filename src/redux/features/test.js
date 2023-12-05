import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  // get company table data
  data: [],
  isLoading: false,
  isError: false,
  error: "",
  isSuccess: false,

  // get company profile
  companyProfileData: {},
  companyProfileIsLoading: false,
  companyProfileIsError: false,
  companyProfileError: "",
  companyProfileIsSuccess: false,

  // add company table data
  companyAddedData: {},
  companyAddDataLoading: false,
  companyAddedDataIsError: false,
  companyAddedDataError: "",
  companyAddedDataIsSuccess: false,

  // edit company table data
  companyEditedData: {},
  companyEditDataLoading: false,
  companyEditDataIsError: false,
  companyEditDataError: "",
  companyEditDataIsSuccess: false,

  // delete company table data
  companyDeletedData: {},
  companyDeleteDataLoading: false,
  companyDeleteDataIsError: false,
  companyDeleteDataError: "",
  companyDeleteDataIsSuccess: false,
};

export const getCompanyTableData = createAsyncThunk(
  "companyTable/getTable",
  async (payload) => {
    // console.log("Inside entered action");

    const { search, gender, status, sort, page } = payload;
    const response = await axios.get(
      `http://localhost:5000/companiesTable?search=${search}&gender=${gender}&status=${status}&sort=${sort}&page=${page}`
    );

    // console.log("Inside action response", response);

    return response.data;
  }
);

export const getCompanyProfileData = createAsyncThunk(
  "companyTable/getProfile",
  async ({ id }) => {
    // console.log("Inside entered action");

    const response = await axios.get(
      `http://localhost:5000/companiesTable/${id}`
    );

    // console.log("Inside action response", response);

    return response.data;
  }
);

export const addCompanyTableData = createAsyncThunk(
  "companyTable/addCompany",
  async (payload, { dispatch }) => {
    // console.log("Inside entered action");

    const { data, companyData } = payload;

    const response = await axios.post(`http://localhost:5000/addCompany`, data);

    // console.log("Inside action response", response);

    dispatch(getCompanyTableData(companyData));

    return response.data;
  }
);

export const editCompanyTableData = createAsyncThunk(
  "companyTable/editCompany",
  async (payload, { dispatch }) => {
    // console.log("Inside entered action");

    const { tableRowId, data, companyData } = payload;

    const response = await axios.patch(
      `http://localhost:5000/updateCompanyDetails/${tableRowId}`,
      data
    );

    // console.log("Inside action response", response);

    dispatch(getCompanyTableData(companyData));

    return response.data;
  }
);

export const deleteCompanyTableData = createAsyncThunk(
  "companyTable/deleteComapany",
  async (payload, { dispatch }) => {
    // console.log("Inside entered action");

    const { tableRowId, companyData } = payload;

    const response = await axios.delete(
      `http://localhost:5000/deleteCompany/${tableRowId}`
    );

    // console.log("Inside action response", response);

    dispatch(getCompanyTableData(companyData));

    return response.data;
  }
);

export const companyTableSlice = createSlice({
  name: "companyTable",
  initialState,
  reducers: {
    resetCompanyProfile(state, action) {
      state.companyProfileData = {};
      state.companyProfileIsLoading = false;
      state.companyProfileIsError = false;
      state.companyProfileError = "";
      state.companyProfileIsSuccess = false;
    },
    resetAddCompany(state, action) {
      state.companyAddedData = {};
      state.companyAddDataLoading = false;
      state.companyAddedDataIsError = false;
      state.companyAddedDataError = "";
      state.companyAddedDataIsSuccess = false;
    },
    resetEditCompany(state, action) {
      state.companyEditedData = {};
      state.companyEditDataLoading = false;
      state.companyEditDataIsError = false;
      state.companyEditDataError = "";
      state.companyEditDataIsSuccess = false;
    },
    resetDeleteCompany(state, action) {
      state.companyDeletedData = {};
      state.companyDeleteDataLoading = false;
      state.companyDeleteDataIsError = false;
      state.companyDeleteDataError = "";
      state.companyDeleteDataIsSuccess = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getCompanyTableData.pending, (state, action) => {
        // console.log("Inside pending", action)
        state.data = [];
        state.isLoading = true;
        state.isError = false;
        state.error = "";
        state.isSuccess = false;
      })
      .addCase(getCompanyTableData.fulfilled, (state, action) => {
        // console.log("Inside fulfilled", action)

        state.data = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.error = "";
        state.isSuccess = true;

        // console.log("Inside fulfilled payload", action.meta.arg)
      })
      .addCase(getCompanyTableData.rejected, (state, action) => {
        // console.log("Inside error", action)

        state.data = [];
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
        state.isSuccess = false;

        // console.log("Inside error payload", action.meta.arg)
      })
      .addCase(getCompanyProfileData.pending, (state, action) => {
        // console.log("Inside pending", action)
        state.companyProfileData = {};
        state.companyProfileIsLoading = true;
        state.companyProfileIsError = false;
        state.companyProfileError = "";
        state.companyProfileIsSuccess = false;
      })
      .addCase(getCompanyProfileData.fulfilled, (state, action) => {
        // console.log("Inside fulfilled", action)

        state.companyProfileData = action.payload;
        state.companyProfileIsLoading = false;
        state.companyProfileIsError = false;
        state.companyProfileError = "";
        state.companyProfileIsSuccess = true;

        // console.log("Inside fulfilled payload", action.meta.arg)
      })
      .addCase(getCompanyProfileData.rejected, (state, action) => {
        // console.log("Inside error", action)

        state.companyProfileData = {};
        state.companyProfileIsLoading = false;
        state.companyProfileIsError = true;
        state.companyProfileError = action.error.message;
        state.companyProfileIsSuccess = false;

        // console.log("Inside error payload", action.meta.arg)
      })
      .addCase(addCompanyTableData.pending, (state, action) => {
        // console.log("Inside pending", action)

        state.companyAddedData = {};
        state.companyAddDataLoading = true;
        state.companyAddedDataIsError = false;
        state.companyAddedDataError = "";
        state.companyAddedDataIsSuccess = false;
      })
      .addCase(addCompanyTableData.fulfilled, (state, action) => {
        // console.log("Inside fulfilled", action)

        state.companyAddedData = action.payload;
        state.companyAddDataLoading = false;
        state.companyAddedDataIsError = false;
        state.companyAddedDataError = "";
        state.companyAddedDataIsSuccess = true;

        const {
          setSuccessMessage,
          setFailureMessage,
          handleAddCompanyClose,
          handleNotificationClickOpen,
          setCurrentPage,
        } = action.meta.arg;
        setSuccessMessage("User Added Successully");
        setFailureMessage("");
        handleAddCompanyClose();
        handleNotificationClickOpen();
        sessionStorage.setItem("companiesPage", 1);
        setCurrentPage(1);
        // console.log("Inside fulfilled payload", action.meta.arg)
      })
      .addCase(addCompanyTableData.rejected, (state, action) => {
        // console.log("Inside error", action)

        state.companyAddedData = {};
        state.companyAddDataLoading = false;
        state.companyAddedDataIsError = true;
        state.companyAddedDataError = action.error.message;
        state.companyAddedDataIsSuccess = false;

        const {
          setSuccessMessage,
          setFailureMessage,
          handleNotificationClickOpen,
        } = action.meta.arg;
        setSuccessMessage("");
        setFailureMessage(action.error.message);
        handleNotificationClickOpen();

        // console.log("Inside error payload", action.meta.arg)
      })
      .addCase(editCompanyTableData.pending, (state, action) => {
        // console.log("Inside pending", action)

        state.companyEditedData = {};
        state.companyEditDataLoading = true;
        state.companyEditDataIsError = false;
        state.companyEditDataError = "";
        state.companyEditDataIsSuccess = false;
      })
      .addCase(editCompanyTableData.fulfilled, (state, action) => {
        // console.log("Inside fulfilled", action)

        state.companyEditedData = action.payload;
        state.companyEditDataLoading = false;
        state.companyEditDataIsError = false;
        state.companyEditDataError = "";
        state.companyEditDataIsSuccess = true;

        const {
          setSuccessMessage,
          setFailureMessage,
          handleEditCompanyClose,
          handleNotificationClickOpen,
        } = action.meta.arg;
        setSuccessMessage("User Edited Successully");
        setFailureMessage("");
        handleEditCompanyClose();
        handleNotificationClickOpen();

        // console.log("Inside fulfilled payload", action.meta.arg)
      })
      .addCase(editCompanyTableData.rejected, (state, action) => {
        // console.log("Inside error", action)

        state.companyEditedData = {};
        state.companyEditDataLoading = false;
        state.companyEditDataIsError = true;
        state.companyEditDataError = action.error.message;
        state.companyEditDataIsSuccess = false;

        const {
          setSuccessMessage,
          setFailureMessage,
          handleNotificationClickOpen,
        } = action.meta.arg;
        setSuccessMessage("");
        setFailureMessage(action.error.message);
        handleNotificationClickOpen();

        // console.log("Inside error payload", action.meta.arg)
      })
      .addCase(deleteCompanyTableData.pending, (state, action) => {
        // console.log("Inside pending", action)

        state.companyDeletedData = {};
        state.companyDeleteDataLoading = true;
        state.companyDeleteDataIsError = false;
        state.companyDeleteDataError = "";
        state.companyDeleteDataIsSuccess = false;
      })
      .addCase(deleteCompanyTableData.fulfilled, (state, action) => {
        // console.log("Inside fulfilled", action)

        state.companyDeletedData = action.payload;
        state.companyDeleteDataLoading = false;
        state.companyDeleteDataIsError = false;
        state.companyDeleteDataError = "";
        state.companyDeleteDataIsSuccess = true;

        const {
          setSuccessMessage,
          setFailureMessage,
          handleDeleteCompanyClose,
          handleNotificationClickOpen,
          page,
          setCurrentPage,
        } = action.meta.arg;
        setSuccessMessage("User Deleted Successully");
        setFailureMessage("");
        handleDeleteCompanyClose();
        handleNotificationClickOpen();
        sessionStorage.setItem("companiesPage", page);
        setCurrentPage(page);
        // console.log("Inside fulfilled payload", action.meta.arg)
      })
      .addCase(deleteCompanyTableData.rejected, (state, action) => {
        // console.log("Inside error", action)

        state.companyDeletedData = {};
        state.companyDeleteDataLoading = false;
        state.companyDeleteDataIsError = true;
        state.companyDeleteDataError = action.error.message;
        state.companyDeleteDataIsSuccess = true;

        const {
          setSuccessMessage,
          setFailureMessage,
          handleNotificationClickOpen,
        } = action.meta.arg;
        setSuccessMessage("");
        setFailureMessage(action.error.message);
        handleNotificationClickOpen();

        // console.log("Inside error payload", action.meta.arg)
      });
  },
});

// get companies table
export const getCompaniesTable = (state) => state.companies.data;
export const companiesTableDataLoading = (state) => state.companies.isLoading;
export const companiesTableErrorStatus = (state) => state.companies.isError;
export const companiesTableError = (state) => state.companies.error;
export const companiesTableSuccess = (state) => state.companies.isSuccess;

// get company profile
export const getCompanyProfile = (state) => state.companies.companyProfileData;
export const companyProfileLoading = (state) =>
  state.companies.companyProfileIsLoadin;
export const companyProfileErrorStatus = (state) =>
  state.companies.companyProfileIsError;
export const companyProfileError = (state) =>
  state.companies.companyProfileError;
export const companyProfileSuccess = (state) =>
  state.companies.companyProfileIsSuccess;

// add company
export const addCompanyData = (state) => state.companies.companyAddedData;
export const addCompanyLoading = (state) =>
  state.companies.companyAddDataLoading;
export const addCompanyErrorStatus = (state) =>
  state.companies.companyAddedDataIsError;
export const addCompanyError = (state) => state.companies.companyAddedDataError;
export const addCompanySuccess = (state) =>
  state.companies.companyAddedDataIsSuccess;

// edit employee
export const editCompanyData = (state) => state.companies.companyEditedData;
export const editCompanyLoading = (state) =>
  state.companies.companyEditDataLoading;
export const editCompanyErrorStatus = (state) =>
  state.companies.companyEditDataIsError;
export const editCompanyError = (state) => state.companies.companyEditDataError;
export const editCompanySuccess = (state) =>
  state.companies.companyEditDataIsSuccess;

// delete employee
export const deletedCompanyData = (state) => state.companies.companyDeletedData;
export const deleteCompanyLoading = (state) =>
  state.companies.companyDeleteDataLoading;
export const deleteCompanyErrorStatus = (state) =>
  state.companies.companyDeleteDataIsError;
export const deleteCompanyError = (state) =>
  state.companies.companyDeleteDataError;
export const deleteCompanySuccess = (state) =>
  state.companies.companyDeleteDataIsSuccess;

export const {
  resetCompanyProfile,
  resetAddCompany,
  resetEditCompany,
  resetDeleteCompany,
} = companyTableSlice.actions;

export default companyTableSlice.reducer;
