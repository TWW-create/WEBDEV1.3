import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      Cookies.set("jwtbara", action.payload.access_token, { expires: 2 });
    },
    logout: (state) => {
      state.user = null;
      Cookies.remove("jwtbara");
    },
    resetAuth: () => initialState,
  },
});

export const {
  setCredentials,
  logout,
  updateUser,
  setActiveRestaurant,
  updateRes,
  setStateLocation,
  setShifts,
  setDate,
  setBusinessHour,
  setPromoter,
  setRestaurants
} = userSlice.actions;

export default userSlice.reducer;
