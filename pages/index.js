import Head from 'next/head';
import { RiPencilLine } from 'react-icons/ri';
import { AiFillEye, AiFillDelete } from 'react-icons/ai';
import useAuth from '../src/hooks/useAuth';
import {
  CONSTANT_KIND_FILTER,
  all,
  active,
  notActive,
  completed,
  tooLate,
  whichWillCome,
  filterSelector,
} from '../src/features/filter/filterSlice';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const data = [
  {
    title: 'this title todo 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada proin. Non nisi est sit amet facilisis. Lacinia at quis risus sed vulputate odio ut enim blandit. Sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque',
    start: '2022-02-24 00:00:00',
    end: '2022-02-25 00:00:00',
  },
  {
    title: 'this title todo 2',
    description: 'this title 2 description',
    start: '2022-02-02 00:00:00',
    end: '2022-02-11 00:00:00',
  },
  {
    title: 'this title todo 3',
    description: 'this title 3 description',
    start: '2022-02-05 00:00:00',
    end: '2022-02-12 00:00:00',
  },
];

export default function Home() {
  const auth = useAuth(false, '/login');

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

      <Header />
      <Todos auth={auth} />
    </div>
  );
}

function Header() {
  const filter = useSelector(filterSelector);
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
      case 'active':
        dispatch(active());
        break;
      case 'notActive':
        dispatch(notActive());
        break;
      case 'completed':
        dispatch(completed());
        break;
      case 'tooLate':
        dispatch(tooLate());
        break;
      case 'whichWillCome':
        dispatch(whichWillCome());
        break;
    }
  };

  return (
    <div className="flex justify-between w-full p-5 rounded bg-slate-800">
      <button className="px-1 py-1 font-bold rounded-md shadow-md md:px-5 md:py-2 hover:bg-slate-700 bg-slate-900">
        Add Todo
      </button>

      <select
        value={filter}
        onChange={handler}
        className="border-0 rounded bg-slate-900 focus:outline-0"
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
  );
}

function Todos() {
  return (
    <div className="grid gap-5">
      {data.map((val, idx) => {
        return (
          <div
            key={idx}
            className="relative grid gap-10 p-5 rounded bg-slate-800"
          >
            <div>
              <h1 className="mb-3 text-xl font-bold lg:text-3xl md:text-2xl">
                {val.title}
              </h1>
              <p className="text-base md:text-md lg:text-xl ">
                {val.description}
              </p>
            </div>
            <div className="flex flex-col justify-between md:flex-row">
              <div className="flex items-center mr-3">
                <input
                  id={`finsih-${idx}`}
                  type="checkbox"
                  className="flex-col lg:w-5 lg:h-5 w-4 h-4 mr-3 rounded-[50%] focus:ring-offset-0 focus:border-0"
                />
                <label className="text-sm md:text-md" htmlFor={`finsih-${idx}`}>
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
      })}
    </div>
  );
}
