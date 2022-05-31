import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  email: null,
  name: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.name = action.payload.name;
    },
    logout: (state) => {
      state.token = null;
      state.email = null;
      state.name = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

export const userSelector = (state) => state.user;
