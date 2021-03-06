import { createSlice } from '@reduxjs/toolkit';

// iddle, loading, success, error
const initialState = {
  name: 'iddle',
  message: null,
};

export const statusSlice = createSlice({
  name: 'status',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    iddle: (state) => {
      state.name = 'iddle';
    },
    loading: (state) => {
      state.name = 'loading';
    },
    error: (state, action) => {
      state.name = 'error';
      state.message = action.payload.message;
    },
    success: (state, action) => {
      state.name = 'success';
      state.message = action.payload.message;
    },
  },
});

export const { iddle, loading, error, success } = statusSlice.actions;
export default statusSlice.reducer;

export const statusSelector = (state) => state.status;
