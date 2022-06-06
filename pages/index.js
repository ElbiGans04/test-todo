import Head from 'next/head';
import React, { useEffect, useState, useRef } from 'react';
import { AiFillDelete, AiOutlineLoading, AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import {
  error,
  loading,
  statusSelector,
  success,
} from '../src/features/status/statusSlice';
import {
  CONSTANT_KIND_FILTER,
  preparedChangeFilter,
  preparedChangeTodos,
  preparedUpdateTodo,
  runRefetch,
  stopRefetch,
  todoFilterSelector,
  todosFilterSelector,
  todosIdFilterSelector,
  todosRefetchSelector,
} from '../src/features/todos/todosSlice';
import {
  close,
  updateModal,
  deleteModal,
  modalSelector,
  addModal,
} from '../src/features/modal/modalSlice';
import useAuth from '../src/hooks/useAuth';
import {
  useForm,
  FormProvider,
  useFormContext,
  useFormState,
} from 'react-hook-form';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
dayjs.extend(isSameOrAfter);

export default function Home() {
  const auth = useAuth(false, '/login');

  return (
    <div className="grid w-11/12 h-full gap-5 mx-auto grid-columns-10">
      <Head>
        <title>Todolist</title>
      </Head>

      {/* Modal */}
      <SwitchModal auth={auth} />

      <Header />
      <Todos auth={auth} />
    </div>
  );
}

function Header() {
  const filter = useSelector(todosFilterSelector);
  const dispatch = useDispatch();

  /* 
    Event Handler
  */
  const handler = (event) => {
    const optionValue = event.currentTarget.value;
    if (!CONSTANT_KIND_FILTER.includes(optionValue)) return false;

    // By Condition
    dispatch(preparedChangeFilter(optionValue));
  };

  return (
    <div className="grid w-full grid-cols-1 grid-rows-2 gap-3 p-2 rounded md:p-4 bg-slate-800 md:gap-10 lg:gap-28 sm:grid-cols-2 sm:grid-rows-1">
      <button
        onClick={() => dispatch(addModal())}
        className="px-1 py-1 font-bold rounded-md shadow-md md:px-5 md:py-2 hover:bg-slate-700 bg-slate-900"
      >
        Add Todo
      </button>

      <div className="grid grid-cols-1 grid-rows-2 gap-3 sm:grid-cols-2 sm:grid-rows-1">
        <button
          onClick={() => dispatch(runRefetch())}
          className="flex items-center justify-center px-3 py-1 font-bold rounded-md shadow-md md:justify-between bg-slate-900 md:px-5 md:py-2 hover:bg-slate-700"
        >
          Reload Todos
        </button>
        <select
          value={filter}
          onChange={handler}
          className="border-0 rounded hover:bg-slate-700 bg-slate-900 focus:outline-0"
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

function Todos({ auth }) {
  const dispatch = useDispatch();
  const todosIdVal = useSelector(todosIdFilterSelector);
  const status = useSelector(statusSelector);
  const refetch = useSelector(todosRefetchSelector);

  useEffect(() => {
    async function fetchData() {
      if (!auth.isLogin || status.name === 'loading' || !refetch) return;

      dispatch(stopRefetch());
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

      dispatch(preparedChangeTodos(requestJson.data));
      dispatch(success({ message: null }));
    }

    fetchData().catch((err) => console.error(err));
  }, [auth, dispatch, refetch, status]);
  return (
    <div className="grid gap-5">
      {(status.name === 'loading' || refetch) && (
        <div className="flex justify-center p-3 text-3xl lg:text-4xl">
          <AiOutlineLoading className="animate-spin" />
        </div>
      )}
      {todosIdVal.map((val, idx) => {
        return <Todo auth={auth} key={val} id={val} />;
      })}
    </div>
  );
}

function Todo({ id, auth }) {
  const dispatch = useDispatch();
  const todoVal = useSelector(todoFilterSelector(id));
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    function checked() {
      if (!todoVal) return;
      setChecked(todoVal.status === 'completed' ? true : false);
    }

    checked();
  }, [todoVal]);

  /* Event Handler */
  const checkboxEventHandler = (id) => {
    async function patchTodo() {
      dispatch(loading());

      const request = await fetch(
        `https://todos.data.my.id/api/todos/updatestatus/${id}`,
        {
          headers: {
            Authorization: `Bearer ${auth.user.token}`,
          },
          body: new URLSearchParams({
            status: checked ? 'active' : 'completed',
          }),
          method: 'PATCH',
        },
      );

      if (!request.ok)
        return dispatch(
          error({ message: 'Error When trying to change todo status' }),
        );

      const requestJson = await request.json();

      if (requestJson.message !== 'Update Status Success')
        return dispatch(
          error({ message: 'Error When trying to change todo status' }),
        );

      // how to update state.data ?
      setChecked((state) => !state);
      dispatch(
        preparedUpdateTodo(
          { ...todoVal, status: checked ? 'active' : 'completed' },
          id,
        ),
      );
      dispatch(success({ message: null }));
    }

    patchTodo().catch((err) => console.error(err));
  };

  return (
    <div
      className={
        'relative grid gap-10 p-5 rounded bg-slate-800 ' +
        (checked ? 'opacity-50' : '')
      }
    >
      <div>
        <h1
          className={
            'mb-3 text-xl font-bold lg:text-3xl md:text-2xl ' +
            (checked ? 'line-through' : '')
          }
        >
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
            checked={checked}
            onChange={() => checkboxEventHandler(todoVal.id)}
          />
          <label className="text-sm md:text-md" htmlFor={`finsih-${id}`}>
            Mark This Todo done
          </label>
        </div>
        <div className="grid grid-cols-1 grid-rows-2 gap-2 mt-3 md:grid-cols-2 md:grid-rows-1 md:mt-0">
          <button
            onClick={() => dispatch(deleteModal({ id }))}
            className="flex items-center justify-center px-3 py-1 font-bold bg-red-700 rounded-md shadow-md md:justify-between md:px-5 md:py-2 hover:bg-red-600"
          >
            <AiFillDelete className="mr-1"></AiFillDelete>Delete
          </button>
          <button
            onClick={() => dispatch(updateModal({ id }))}
            className="flex items-center justify-center px-3 py-1 font-bold rounded-md shadow-md md:justify-between bg-sky-700 md:px-5 md:py-2 hover:bg-sky-600"
          >
            <AiFillDelete className="mr-1"></AiFillDelete>Update
          </button>
        </div>
      </div>
    </div>
  );
}

function SwitchModal({ auth }) {
  const methods = useForm();
  const { handleSubmit } = methods;
  const dispatch = useDispatch();
  const modal = useSelector(modalSelector);
  const status = useSelector(statusSelector);
  const [ShowMessage, setShowMessage] = useState(false);
  const ref = useRef(null);

  /* 
  Event Handler
  */
  const handler = async (data) => {
    try {
      if (!modal.type || status.name === 'loading') return;
      dispatch(loading());

      const url =
        modal.type === 'add'
          ? `https://todos.data.my.id/api/todos/`
          : `https://todos.data.my.id/api/todos/${data.id}`;
      const options = {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
        ...(modal.type === 'delete'
          ? {}
          : {
              body: new URLSearchParams({
                title: data.title,
                description: data.description,
                start: dayjs(data.startDate).format('YYYY-MM-DD HH:mm:ss'),
                end: dayjs(data.endDate).format('YYYY-MM-DD HH:mm:ss'),
                ...(modal.type === 'add' ? {} : { status: data.status }),
              }),
            }),
      };

      switch (modal.type) {
        case 'add': {
          const { request, requestDoc } = await makeRequestAction(
            {
              url,
              options: {
                ...options,
                method: 'POST',
              },
            },
            setShowMessage,
          );

          if (request.status === 200 && requestDoc?.message !== 'success') {
            return dispatch(parseErrorMessage(requestDoc));
          }

          dispatch(success({ message: 'SUCCESS ADD TODO' }));
          break;
        }
        case 'update': {
          const { request, requestDoc } = await makeRequestAction(
            {
              url,
              options: {
                ...options,
                method: 'PATCH',
              },
            },
            setShowMessage,
          );

          if (
            request.status === 200 &&
            requestDoc?.message !== 'Update Data Success'
          ) {
            return dispatch(parseErrorMessage(requestDoc));
          }

          dispatch(success({ message: 'SUCCESS UPDATE TODO' }));
          break;
        }
        case 'delete': {
          const { request, requestDoc } = await makeRequestAction(
            {
              url,
              options: {
                ...options,
                method: 'DELETE',
              },
            },
            setShowMessage,
          );

          if (
            request.status === 200 &&
            requestDoc?.message !== 'Deleted Success'
          ) {
            return dispatch(parseErrorMessage(requestDoc));
          }

          dispatch(success({ message: 'SUCCESS DELETE TODO' }));
          break;
        }
      }
    } catch (err) {
      setShowMessage(true);
      console.log(err);
      dispatch(error({ message: err.message }));
    }
  };

  const closeHandler = () => {
    dispatch(runRefetch());
    setShowMessage(false);
    dispatch(close());
  };

  return (
    <FormProvider {...methods}>
      <div
        className={
          'fixed top-0 bottom-0 left-0 right-0 z-50 p-5 overflow-x-hidden overflow-y-auto bg-black/70 ' +
          (!modal.type ? 'hidden' : '')
        }
      >
        <form
          onSubmit={handleSubmit(handler)}
          className="grid w-10/12 grid-cols-1 mx-auto overflow-hidden bg-gray-900 rounded-md lg:w-2/4 "
        >
          <div className="flex items-center row-span-1 p-3 border-b-2 md:p-5 border-slate-800">
            <h1 className="text-xl font-semibold capitalize md:text-3xl text-sky-500 ">
              {modal.type} Todo
            </h1>
          </div>

          <div className={'capitalize ' + (ShowMessage ? 'p-3' : '')}>
            <div
              ref={ref}
              style={
                ref.current &&
                ShowMessage &&
                status.message &&
                (status.name === 'error' || status.name === 'success')
                  ? {
                      maxHeight: `${ref.current.scrollHeight}px`,
                      marginBottom: '1rem',
                    }
                  : { marginBottom: '0', maxHeight: '0' }
              }
              className="overflow-hidden transition-all rounded bg-sky-700 max-h-0"
            >
              <div className="grid gap-3 m-5">
                <h1 className="text-xl font-bold lg:text-2xl text-slate-900">
                  {status.name}
                </h1>
                <p className="text-sm lg:text-md">{status.message}</p>
                <div className="">
                  <button
                    type="button"
                    onClick={() => setShowMessage(false)}
                    className="flex items-center justify-between px-3 py-1 font-bold rounded-md shadow-md bg-slate-900 md:px-5 md:py-2 hover:bg-slate-800"
                  >
                    <AiOutlineClose className="mr-1"></AiOutlineClose>Close
                  </button>
                </div>
              </div>
            </div>
          </div>

          <ModalContent />
          <div className="flex justify-end row-span-1 p-3 border-t-2 border-slate-800">
            <button
              type="button"
              onClick={closeHandler}
              className="px-3 py-1 font-bold bg-red-700 rounded-md shadow-md md:px-5 md:py-2 hover:bg-red-600"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-3 py-1 ml-2 font-bold capitalize rounded-md shadow-md md:ml-5 md:px-5 md:py-2 hover:bg-sky-600 bg-sky-700 "
            >
              {modal.type}
            </button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}

function ModalContent() {
  const modal = useSelector(modalSelector);
  const { register, control, reset, getValues } = useFormContext();
  const { errors } = useFormState({ control });
  const todo = useSelector(todoFilterSelector(modal.id));

  useEffect(() => {
    function resetFields() {
      if (!modal.type && !todo) return;

      switch (modal.type) {
        case 'add': {
          reset(
            { title: '', description: '', startDate: '', endDate: '' },
            { keepErrors: false, keepIsSubmitted: false },
          );
          break;
        }
        case 'update': {
          reset(
            {
              title: todo.title,
              description: todo.description,
              status: todo.status,
              startDate: dayjs(todo.start).format('YYYY-MM-DD'),
              endDate: dayjs(todo.end).format('YYYY-MM-DD'),
              id: todo.id,
            },
            { keepErrors: false, keepIsSubmitted: false },
          );
          break;
        }
        case 'delete': {
          reset(
            {
              id: todo.id,
            },
            { keepErrors: false, keepIsSubmitted: false },
          );
          break;
        }
      }
    }

    resetFields();
  }, [modal, reset, todo]);

  if (!modal.type) return <></>;

  if (modal.type === 'delete')
    return (
      <div className="p-5 ">
        <h1 className="text-md md:text-md xl:text-xl">
          Are you sure want to delete this todo?
        </h1>
      </div>
    );

  return (
    <React.Fragment>
      <div className="grid grid-rows-2 row-span-3 gap-5 p-5 ">
        <div className="flex flex-col">
          <label
            className="font-bold text-md md:text-xl text-cyan-500"
            htmlFor="title"
          >
            Title {' : '}
          </label>
          <input
            className="mt-1 border-0 rounded shadow-xl md:mt-3 bg-slate-800 focus:ring-1 focus:ring-slate-900 hover:bg-slate-700"
            type="text"
            id="title"
            {...register('title', {
              required: {
                value: true,
                message: 'PLEASE INSERT TITLE',
              },
              minLength: {
                value: 3,
                message: 'the minimum length of the title is 3',
              },
              maxLength: {
                value: 20,
                message: 'the maxium length of the title is 20',
              },
              pattern: {
                value: /[A-Za-z0-9_]/,
                message: 'ONLY INSERT ALPANUMERIC',
              },
            })}
          />
          {errors.title?.message && (
            <p className="mt-1 text-sm font-bold text-red-900 md:text-md md:mt-3">
              {errors.title?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col ">
          <label
            className="font-bold text-md md:text-xl text-cyan-500"
            htmlFor="description"
          >
            Description {' : '}
          </label>
          <input
            className="mt-1 border-0 rounded shadow-xl md:mt-3 bg-slate-800 focus:ring-1 focus:ring-slate-900 hover:bg-slate-700"
            type="text"
            id="description"
            {...register('description', {
              required: {
                value: true,
                message: 'PLEASE INSERT description',
              },
              minLength: {
                value: 5,
                message: 'the minimum length of the description is 5',
              },
              maxLength: {
                value: 50,
                message: 'the maxium length of the description is 50',
              },
              pattern: {
                value: /[A-Za-z0-9_]/,
                message: 'ONLY INSERT ALPANUMERIC',
              },
            })}
          />
          {errors.description?.message && (
            <p className="mt-1 text-sm font-bold text-red-900 md:text-md md:mt-3">
              {errors.description?.message}
            </p>
          )}
        </div>

        {modal.type === 'update' && (
          <div className="flex flex-col ">
            <label
              className="font-bold text-md md:text-xl text-cyan-500"
              htmlFor="status"
            >
              Status {' : '}
            </label>
            <select
              className="mt-1 border-0 rounded hover:bg-slate-700 bg-slate-800 focus:outline-0 md:mt-3 "
              {...register('status', {
                required: {
                  value: true,
                  message: 'PLEASE INSERT STATUS',
                },
                validate: (val) => {
                  return val !== 'completed' &&
                    val !== 'active' &&
                    val !== 'inactive'
                    ? 'Invalid Value'
                    : true;
                },
              })}
            >
              <option value="completed">Completed</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            {errors.status?.message && (
              <p className="mt-1 text-sm font-bold text-red-900 md:text-md md:mt-3">
                {errors.status?.message}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col ">
          <label
            className="font-bold text-md md:text-xl text-cyan-500"
            htmlFor="start_date"
          >
            Start Date {' : '}
          </label>
          <input
            className="mt-1 border-0 rounded shadow-xl md:mt-3 bg-slate-800 focus:ring-1 focus:ring-slate-900 hover:bg-slate-700"
            type="date"
            id="start_date"
            {...register('startDate', {
              required: {
                value: true,
                message: 'PLEASE INSERT DATE',
              },
              validate: (val) => {
                return dayjs(val).isSameOrAfter(dayjs(), 'day')
                  ? true
                  : 'the time must be the same or newer than the current time';
              },
            })}
          />
          {errors.startDate?.message && (
            <p className="mt-1 text-sm font-bold text-red-900 md:text-md md:mt-3">
              {errors.startDate?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col ">
          <label
            className="font-bold text-md md:text-xl text-cyan-500"
            htmlFor="end_date"
          >
            End Date {' : '}
          </label>
          <input
            className="mt-1 border-0 rounded shadow-xl md:mt-3 bg-slate-800 focus:ring-1 focus:ring-slate-900 hover:bg-slate-700"
            type="date"
            id="end_date"
            {...register('endDate', {
              required: {
                value: true,
                message: 'PLEASE INSERT DATE',
              },
              validate: (val) => {
                const min = getValues('startDate');
                return dayjs(val).isSameOrAfter(dayjs(min).add(1, 'day'), 'day')
                  ? true
                  : `time must be newer than ${dayjs(min).format()}`;
              },
            })}
          />
          {errors.endDate?.message && (
            <p className="mt-1 text-sm font-bold text-red-900 md:text-md md:mt-3">
              {errors.endDate?.message}
            </p>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

async function makeRequestAction(setting, setShowMessage) {
  const request = await fetch(setting.url, setting.options);

  if (!request.ok) throw new Error('Request Failed');

  const doc = await request.json();

  setShowMessage(true);

  return {
    request,
    requestDoc: doc,
  };
}

function parseErrorMessage(doc) {
  return error({
    message: Object.entries(doc)
      .map((val) => `${val[0]}: ${val[1]}`)
      .join(', '),
  });
}
