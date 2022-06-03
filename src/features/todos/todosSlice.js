import { createSlice, createSelector } from '@reduxjs/toolkit';

export const CONSTANT_KIND_FILTER = [
  'all',
  'active',
  'notActive',
  'completed',
  'tooLate',
  'whichWillCome',
];

const initialState = {
  data: [],
  dataFilter: [],
  filter: CONSTANT_KIND_FILTER[0],
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    changeTodos: (state, action) => {
      state.data = action.payload.todos;
      state.dataFilter = action.payload.todos;
      state['filter'] = 'all';
    },
    all: (state) => {
      state['filter'] = 'all';
      state['dataFilter'] = state.data;
    },
    active: (state, action) => {
      state['filter'] = 'active';
      state['dataFilter'] = action.payload.todos;
    },
    notActive: (state, action) => {
      state['filter'] = 'notActive';
      state['dataFilter'] = action.payload.todos;
    },
    completed: (state, action) => {
      state['filter'] = 'completed';
      state['dataFilter'] = action.payload.todos;
    },
    tooLate: (state, action) => {
      state['filter'] = 'tooLate';
      state['dataFilter'] = action.payload.todos;
    },
    whichWillCome: (state, action) => {
      state['filter'] = 'whichWillCome';
      state['dataFilter'] = action.payload.todos;
    },
  },
});

export const {
  changeTodos,
  all,
  active,
  notActive,
  completed,
  tooLate,
  whichWillCome,
} = todosSlice.actions;
export default todosSlice.reducer;

export const todosSelector = (state) => state.todos;
export const todosFilterSelector = (state) => state.todos.filter;
export const todosDataSelector = (state) => state.todos.data;
export const todosDataFilterSelector = (state) => state.todos.dataFilter;
export const todosIdFilterSelector = createSelector(
  todosDataFilterSelector,
  (todos) => todos.map((todo) => todo.id),
);
export const todoFilterSelector = (id) =>
  createSelector(todosDataFilterSelector, (todos) =>
    todos.find((todo) => todo.id === id),
  );
