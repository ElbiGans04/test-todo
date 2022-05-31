import { createSlice } from '@reduxjs/toolkit';

// iddle, loading, success, error
const initialState = 'iddle';

export const statusSlice = createSlice({
  name: 'status',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    iddle: (state) => {
      state = 'iddle';
    },
    loading: (state) => {
      state = 'loading';
    },
    error: (state) => {
      state = 'error';
    },
    success: (state) => {
      state = 'success';
    },
  },
});

export const { iddle, loading, error, success } = statusSlice.actions;
export default statusSlice.reducer;

export const statusSelector = (state) => state.status;