import { createSlice, createSelector } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
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
  refetch: true,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    changeTodos: (state, action) => {
      state.data = action.payload.todos;
      state.dataFilter = action.payload.dataFilter;
    },
    updateTodo: (state, action) => {
      const newState = [...state.data];
      newState[action.payload.index] = action.payload.todo;
      state.data = newState;
      state.dataFilter = action.payload.dataFilter;
    },
    runRefetch: (state) => {
      state.refetch = true;
    },
    stopRefetch: (state) => {
      state.refetch = false;
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
  updateTodo,
  runRefetch,
  stopRefetch,
  all,
  active,
  notActive,
  completed,
  tooLate,
  whichWillCome,
} = todosSlice.actions;
export default todosSlice.reducer;

export const todosSelector = (state) => state.todos;
export const todosRefetchSelector = (state) => state.todos.refetch;
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

export const preparedUpdateTodo = (data, id) => (dispatch, getState) => {
  const { todos } = getState();
  const indexMatch = todos.data.findIndex((todo) => todo.id === id);
  let finalTodos = [];

  switch (todos.filter) {
    case 'all':
      finalTodos = [...todos.data];
      break;
    case 'active': {
      finalTodos = todos.data.filter(
        (todo) => todo.status === 'active' && todo.id !== id,
      );
      break;
    }
    case 'notActive': {
      finalTodos = todos.data.filter(
        (todo) => todo.status === 'inactive' && todo.id !== id,
      );
      break;
    }
    case 'completed': {
      finalTodos = todos.data.filter(
        (todo) => todo.status === 'completed' && todo.id !== id,
      );
      break;
    }
    case 'tooLate': {
      finalTodos = todos.data.filter((todo) =>
        dayjs(todo.end).isBefore(dayjs()),
      );
      break;
    }
    case 'whichWillCome': {
      finalTodos = todos.data.filter((todo) =>
        dayjs(todo.start).isAfter(dayjs()),
      );
      break;
    }
  }

  dispatch(
    updateTodo({ index: indexMatch, todo: data, dataFilter: finalTodos }),
  );
};

export const preparedChangeTodos = (todos) => (dispatch, getState) => {
  const {
    todos: { filter },
  } = getState();
  let finalTodos = [];

  switch (filter) {
    case 'all':
      finalTodos = [...todos];
      break;
    case 'active': {
      finalTodos = todos.filter((todo) => todo.status === 'active');
      break;
    }
    case 'notActive': {
      finalTodos = todos.filter((todo) => todo.status === 'inactive');
      break;
    }
    case 'completed': {
      finalTodos = todos.filter((todo) => todo.status === 'completed');
      break;
    }
    case 'tooLate': {
      finalTodos = todos.filter((todo) => dayjs(todo.end).isBefore(dayjs()));
      break;
    }
    case 'whichWillCome': {
      finalTodos = todos.filter((todo) => dayjs(todo.start).isAfter(dayjs()));
      break;
    }
  }

  dispatch(changeTodos({ todos, dataFilter: finalTodos }));
};

export const preparedChangeFilter = (filter) => (dispatch, getState) => {
  const {
    todos: { data },
  } = getState();

  switch (filter) {
    case 'all':
      dispatch(all());
      break;
    case 'active': {
      dispatch(
        active({ todos: data.filter((todo) => todo.status === 'active') }),
      );
      break;
    }
    case 'notActive': {
      dispatch(
        notActive({ todos: data.filter((todo) => todo.status === 'inactive') }),
      );
      break;
    }
    case 'completed': {
      dispatch(
        completed({
          todos: data.filter((todo) => todo.status === 'completed'),
        }),
      );
      break;
    }
    case 'tooLate': {
      dispatch(
        tooLate({
          todos: data.filter((todo) => dayjs(todo.end).isBefore(dayjs())),
        }),
      );
      break;
    }
    case 'whichWillCome': {
      dispatch(
        whichWillCome({
          todos: data.filter((todo) => dayjs(todo.start).isAfter(dayjs())),
        }),
      );
      break;
    }
  }
};
