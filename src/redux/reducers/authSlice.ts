import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface LoginPayload {
  mobile: string;
  password: string;
  userType: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  logging?: boolean;
  currentUser?: any;
  token?: string;
}

const initialState: AuthState = {
  isLoggedIn: false,
  logging: false,
  currentUser: undefined,
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginPayload>) {
      state.logging = true;
    },
    loginSuccess(state, action: PayloadAction<any>) {
      state.isLoggedIn = true;
      state.logging = false;
      state.token = action.payload?.data?.token;
      state.currentUser = action.payload?.data;
    },
    loginFailed(state, action: PayloadAction<string>) {
      state.logging = false;
    },

    logout(state) {
      state.isLoggedIn = false;
      state.currentUser = undefined;
      state.token = "";
    },
    setSuccess(state) {
      state.isLoggedIn = true;
      state.logging = false;
      state.token =
        "eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJjcmVhdGVkVGltZSI6MTcxNTQ5MzUxOTE5NywiZXhwaXJ5VGltZSI6MTcxNTQ5MzU0OTE5NywidXNlclR5cGUiOiJQSUNLVVBfUE9JTlQiLCJ1c2VySWQiOiI2NjA5NDE3YzI2MjZiMDE1ZDIyZDEyNTcifQ.0rBygIIIGYYVLyDASdZXsZvPXlE0HLGqKQ_LCi1okHg";
      state.currentUser = {
        profileImage:
          "https://i.pinimg.com/564x/e2/4d/f9/e24df95352cbb2e829aefb97ea320af0.jpg",
        subType: "CUSTOMER",
        token:
          "eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJjcmVhdGVkVGltZSI6MTcxNTQ5MzUxOTE5NywiZXhwaXJ5VGltZSI6MTcxNTQ5MzU0OTE5NywidXNlclR5cGUiOiJQSUNLVVBfUE9JTlQiLCJ1c2VySWQiOiI2NjA5NDE3YzI2MjZiMDE1ZDIyZDEyNTcifQ.0rBygIIIGYYVLyDASdZXsZvPXlE0HLGqKQ_LCi1okHg",
        userId: "65315ab4762e39117e8a5f9c",
        userName: "Hemsagar",
        userType: "CUSTOMER",
      };
    },
    setRecycler(state) {
      state.isLoggedIn = true;
      state.logging = false;
      state.token =
        "eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJjcmVhdGVkVGltZSI6MTcxNTQ5MzUxOTE5NywiZXhwaXJ5VGltZSI6MTcxNTQ5MzU0OTE5NywidXNlclR5cGUiOiJQSUNLVVBfUE9JTlQiLCJ1c2VySWQiOiI2NjA5NDE3YzI2MjZiMDE1ZDIyZDEyNTcifQ.0rBygIIIGYYVLyDASdZXsZvPXlE0HLGqKQ_LCi1okHg";
      state.currentUser = {
        profileImage:
          "https://i.pinimg.com/564x/e2/4d/f9/e24df95352cbb2e829aefb97ea320af0.jpg",
        subType: "CUSTOMER",
        token:
          "eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJjcmVhdGVkVGltZSI6MTcxNTQ5MzUxOTE5NywiZXhwaXJ5VGltZSI6MTcxNTQ5MzU0OTE5NywidXNlclR5cGUiOiJQSUNLVVBfUE9JTlQiLCJ1c2VySWQiOiI2NjA5NDE3YzI2MjZiMDE1ZDIyZDEyNTcifQ.0rBygIIIGYYVLyDASdZXsZvPXlE0HLGqKQ_LCi1okHg",
        userId: "65315ab4762e39117e8a5f9c",
        userName: "Hemsagar",
        userType: "RECYCLER",
      };
    },
  },
});

// Reducer
const authReducer = authSlice.reducer;
export default authReducer;
