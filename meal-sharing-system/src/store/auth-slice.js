import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "auth";

const initialState = {
  isLoggedIn: false,
  id: null,
  email: null,
  token: null,
  error: null, 
  role:null,
  registrationStatus: null, 
  companyId:null
};

// Load saved  state 
const savedState = JSON.parse(localStorage.getItem(STORAGE_KEY));
const authSlice = createSlice({
  name: "auth",
  initialState: savedState || initialState,
  reducers: {
    setUser(state, action) {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.role=action.payload.role;

      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    },
    removeUser(state) {
      state.id = null;
      state.email = null;
      state.token = null;
      state.isLoggedIn = false;
      state.role=null;
   
      
      localStorage.removeItem(STORAGE_KEY);
    },
    setError(state, action) {
      state.error = action.payload;
    },
    registerUser(state, action) {
     
      const statusCode = action.payload;
      if (statusCode === 200) {
      
        state.registrationStatus = "success";
      } else {
       
        state.registrationStatus = "failure";
      }

     
    },
    clearError(state) {
      state.error = null;
    },
    clearStatus(state)
    {
      state.registrationStatus = null;
    },
    
    addCompanyId(state, action) {
      state.companyId = action.payload;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    },
  },
});

export const {
  setUser,
  removeUser,
  setError,
  clearError,
  clearStatus,
  registerUser,
  addCompanyId,
} = authSlice.actions;
export default authSlice.reducer;
