import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../features/user/userSlice';
import statusSlice from '../features/status/statusSlice';
import filterSlice from '../features/filter/filterSlice';
import todosSlice from '../features/todos/todosSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    status: statusSlice,
    filter: filterSlice,
    todos: todosSlice,
  },
});
