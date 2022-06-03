import { createSlice } from '@reduxjs/toolkit';

// iddle, loading, success, error
const initialState = {
  type: null,
  id: null,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    close: (state) => {
      state.type = null;
    },
    addModal: (state) => {
      state.type = 'add';
    },
    updateModal: (state, action) => {
      state.type = 'update';
      state.id = action.payload.id;
    },
    deleteModal: (state, action) => {
      state.type = 'delete';
      state.id = action.payload.id;
    },
  },
});

export const { close, addModal, updateModal, deleteModal } = modalSlice.actions;
export default modalSlice.reducer;

export const modalSelector = (state) => state.modal;
