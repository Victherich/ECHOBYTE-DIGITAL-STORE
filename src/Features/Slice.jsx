
import { createSlice } from "@reduxjs/toolkit";

const MySlice = createSlice({
  name: "user",
  initialState: {
    adminInfo: null,
    adminToken: null,

    userInfo:null,
    userToken:null,
  },

    paymentSession: null,

  reducers: {
    adminLogin: (state, { payload }) => {
      state.adminInfo = payload.adminInfo;
      state.adminToken = payload.adminToken;
    },
    adminLogout: (state) => {
      state.adminInfo = null;
      state.adminToken = null;
    },
    updateAdminInfo: (state, { payload }) => {
      if (state.adminInfo) {
        state.adminInfo = { ...state.adminInfo, ...payload };
      }
    },

    userLogin: (state, { payload }) => {
      state.userInfo = payload.userInfo;
      state.userToken = payload.userToken;
    },
    userLogout: (state) => {
      state.userInfo = null;
      state.userToken = null;
    },

        // --- ✅ Payment Session ---
    setPaymentSession: (state, { payload }) => {
      state.paymentSession = payload;
    },
    clearPaymentSession: (state) => {
      state.paymentSession = null;
    },

  },
});

export const { adminLogin, adminLogout, updateAdminInfo , userLogin, userLogout, setPaymentSession, clearPaymentSession} = MySlice.actions;
export default MySlice.reducer;

