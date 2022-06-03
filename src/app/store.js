import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../features/user/userSlice';
import statusSlice from '../features/status/statusSlice';
import todosSlice from '../features/todos/todosSlice';
import modalSlice from '../features/modal/modalSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    status: statusSlice,
    todos: todosSlice,
    modal: modalSlice,
  },
});
