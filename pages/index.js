import Head from 'next/head';
import { RiPencilLine } from 'react-icons/ri';
import { AiFillEye, AiFillDelete, AiOutlineLoading } from 'react-icons/ai';
import useAuth from '../src/hooks/useAuth';
import {
  CONSTANT_KIND_FILTER,
  all,
  active,
  notActive,
  completed,
  tooLate,
  whichWillCome,
  todosFilterSelector,
  todosDataFilterSelector,
  todosDataSelector,
  changeTodos,
} from '../src/features/todos/todosSlice';
import {
  statusSelector,
  loading,
  success,
  iddle,
  error,
} from '../src/features/status/statusSlice';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
export default function Home() {
  const auth = useAuth(false, '/login');
  const [refetch, setRefetch] = useState(true);

  return (
    <div className="grid w-full h-full gap-5 grid-columns-10">
      <Head>
        <title>Todolist</title>
      </Head>

      {/* Modal */}
      {/* <div className="fixed top-0 bottom-0 left-0 right-0 z-50 p-5 overflow-x-hidden overflow-y-auto bg-black/70 ">
        <div className="grid w-10/12 grid-cols-1 mx-auto overflow-hidden bg-gray-900 rounded-md lg:w-2/4 ">
          <div className="flex items-center row-span-1 p-3 border-b-2 md:p-5 border-slate-800">
            <h1 className="text-xl font-semibold md:text-3xl text-sky-500">
              Add Todo
            </h1>
          </div>
          <div className="grid grid-rows-2 row-span-3 gap-5 p-5 ">
            <div className="flex flex-col">
              <label
                className="font-bold text-md md:text-xl text-cyan-500"
                htmlFor="email"
              >
                Email {' : '}
              </label>
              <input
                className="mt-1 border-0 rounded shadow-xl md:mt-3 bg-slate-800 focus:ring-1 focus:ring-slate-900"
                type="email"
                id="email"
              />
            </div>

            <div className="flex flex-col ">
              <label
                className="font-bold text-md md:text-xl text-cyan-500"
                htmlFor="password"
              >
                Password {' : '}
              </label>
              <input
                className="mt-1 border-0 rounded shadow-xl md:mt-3 bg-slate-800 focus:ring-1 focus:ring-slate-900"
                type="password"
                id="password"
              />
            </div>

            <div className="flex flex-col ">
              <label
                className="font-bold text-md md:text-xl text-cyan-500"
                htmlFor="start_date"
              >
                Start Date {' : '}
              </label>
              <input
                className="mt-1 border-0 rounded shadow-xl md:mt-3 bg-slate-800 focus:ring-1 focus:ring-slate-900"
                type="date"
                id="start_date"
              />
            </div>

            <div className="flex flex-col ">
              <label
                className="font-bold text-md md:text-xl text-cyan-500"
                htmlFor="end_date"
              >
                End Date {' : '}
              </label>
              <input
                className="mt-1 border-0 rounded shadow-xl md:mt-3 bg-slate-800 focus:ring-1 focus:ring-slate-900"
                type="date"
                id="end_date"
              />
            </div>
          </div>
          <div className="flex justify-end row-span-1 p-3 border-t-2 border-slate-800">
            <button className="px-3 py-1 font-bold bg-red-700 rounded-md shadow-md md:px-5 md:py-2 hover:bg-red-600">
              Close
            </button>
            <button className="px-3 py-1 ml-2 font-bold rounded-md shadow-md md:ml-5 md:px-5 md:py-2 hover:bg-sky-600 bg-sky-700">
              Add
            </button> 
          </div>
        </div>
      </div> */}

      <Header refetch={refetch} setRefetch={setRefetch} />
      <Todos refetch={refetch} setRefetch={setRefetch} auth={auth} />
    </div>
  );
}

function Header({ setRefetch, refetch }) {
  const filter = useSelector(todosFilterSelector);
  const status = useSelector(statusSelector);
  const todos = useSelector(todosDataSelector);
  const dispatch = useDispatch();
  /* 
    Event Handler
  */
  const handler = (event) => {
    const optionValue = event.currentTarget.value;
    if (!CONSTANT_KIND_FILTER.includes(optionValue)) return false;

    // By Condition
    switch (optionValue) {
      case 'all':
        dispatch(all());
        break;
      case 'active': {
        const finalTodos = todos.filter((todo) => todo.status === 'active');
        dispatch(active({ todos: finalTodos }));
        break;
      }
      case 'notActive': {
        const finalTodos = todos.filter((todo) => todo.status === 'inactive');
        dispatch(notActive({ todos: finalTodos }));
        break;
      }
      case 'completed': {
        const finalTodos = todos.filter((todo) => todo.status === 'completed');
        dispatch(completed({ todos: finalTodos }));
        break;
      }
      case 'tooLate': {
        const finalTodos = todos.filter((todo) =>
          dayjs(todo.end).isBefore(dayjs()),
        );
        dispatch(tooLate({ todos: finalTodos }));
        break;
      }
      case 'whichWillCome': {
        const finalTodos = todos.filter((todo) =>
          dayjs(todo.start).isAfter(dayjs()),
        );
        dispatch(whichWillCome({ todos: finalTodos }));
        break;
      }
    }
  };

  return (
    <div className="flex justify-between w-full p-5 rounded bg-slate-800">
      <button className="px-1 py-1 font-bold rounded-md shadow-md md:px-5 md:py-2 hover:bg-slate-700 bg-slate-900">
        Add Todo
      </button>

      <div className="flex items-center">
        <button
          onClick={() => setRefetch(true)}
          className="flex items-center justify-between px-3 py-1 font-bold rounded-md shadow-md bg-slate-900 md:px-5 md:py-2 hover:bg-slate-700"
        >
          <span
            className={
              status.name === 'loading' && refetch
                ? 'mr-3 animate-spin'
                : 'mr-3'
            }
          >
            <AiOutlineLoading />
          </span>
          Reload Todos
        </button>
        <select
          value={filter}
          onChange={handler}
          className="ml-5 border-0 rounded hover:bg-slate-700 bg-slate-900 focus:outline-0"
        >
          {CONSTANT_KIND_FILTER.map((val) => {
            return (
              <option value={val} key={val}>
                {val}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}

function Todos({ setRefetch, refetch, auth }) {
  const dispatch = useDispatch();
  const todosId = createSelector(todosDataFilterSelector, (todos) =>
    todos.map((todo) => todo.id),
  );
  const todosIdVal = useSelector(todosId);
  const status = useSelector(statusSelector);

  useEffect(() => {
    async function fetchData() {
      if (!auth.isLogin) return;
      if (status.name !== 'iddle' && status.name !== 'success') return;
      if (!refetch) return;

      setRefetch(false);
      dispatch(loading());

      const request = await fetch('https://todos.data.my.id/api/todos', {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      });

      if (!request.ok)
        return dispatch(
          error({ message: 'Error When trying to request data' }),
        );

      const requestJson = await request.json();

      dispatch(changeTodos({ todos: requestJson.data }));
      dispatch(success({ message: null }));
    }

    fetchData().catch((err) => console.error(err));
  }, [auth, dispatch, refetch, setRefetch, status]);
  return (
    <div className="grid gap-5">
      {todosIdVal.map((val, idx) => {
        return <Todo key={val} id={val} />;
      })}
    </div>
  );
}

function Todo({ id }) {
  const dispatch = useDispatch();
  const todosId = createSelector(todosDataFilterSelector, (todos) =>
    todos.find((todo) => todo.id === id),
  );
  const todoVal = useSelector(todosId);

  return (
    <div className="relative grid gap-10 p-5 rounded bg-slate-800">
      <div>
        <h1 className="mb-3 text-xl font-bold lg:text-3xl md:text-2xl">
          {todoVal.title}
        </h1>
        <p className="text-base md:text-md lg:text-xl ">
          {todoVal.description}
        </p>
      </div>
      <div className="flex flex-col justify-between md:flex-row">
        <div className="flex items-center mr-3">
          <input
            id={`finsih-${id}`}
            type="checkbox"
            className="flex-col lg:w-5 lg:h-5 w-4 h-4 mr-3 rounded-[50%] focus:ring-offset-0 focus:border-0"
          />
          <label className="text-sm md:text-md" htmlFor={`finsih-${id}`}>
            Mark This Todo done
          </label>
        </div>
        <div className="flex items-center mt-3 md:mt-0">
          <button className="flex items-center justify-between px-3 py-1 mr-2 font-bold bg-red-700 rounded-md shadow-md md:px-5 md:py-2 hover:bg-red-600">
            <AiFillEye className="mr-1"></AiFillEye>Active
          </button>
          <button className="flex items-center justify-between px-3 py-1 mr-2 font-bold bg-red-700 rounded-md shadow-md md:px-5 md:py-2 hover:bg-red-600">
            <AiFillDelete className="mr-1"></AiFillDelete>Delete
          </button>
          <button className="flex items-center justify-between px-3 py-1 font-bold rounded-md shadow-md bg-sky-700 md:px-5 md:py-2 hover:bg-sky-600">
            <AiFillDelete className="mr-1"></AiFillDelete>Update
          </button>
        </div>
      </div>
    </div>
  );
}
