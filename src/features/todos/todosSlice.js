import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  dataFilter: [],
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    changeTodos: (state, action) => {
      state.data = action.payload.todos;
    },
    changeTodosFilter: (state, action) => {
      state.dataFilter = action.payload.todos;
    },
  },
});

export const { changeTodos, changeTodosFilter } = todosSlice.actions;
export default todosSlice.reducer;

export const todosSelector = (state) => state.filter;
