import { createSlice } from '@reduxjs/toolkit';

export const CONSTANT_KIND_FILTER = [
  'all',
  'active',
  'notActive',
  'completed',
  'tooLate',
  'whichWillCome',
];
const initialState = CONSTANT_KIND_FILTER[0];

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    all: () => {
      return 'all';
    },
    active: () => {
      return 'active';
    },
    notActive: () => {
      return 'notActive';
    },
    completed: () => {
      return 'completed';
    },
    tooLate: () => {
      return 'tooLate';
    },
    whichWillCome: () => {
      return 'whichWillCome';
    },
  },
});

export const { all, active, notActive, completed, tooLate, whichWillCome } =
  filterSlice.actions;
export default filterSlice.reducer;

export const filterSelector = (state) => state.filter;
