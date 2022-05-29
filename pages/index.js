import Head from 'next/head';
import { RiPencilLine } from 'react-icons/ri';
import { AiFillPlusCircle } from 'react-icons/ai';

const data = [
  {
    title: 'this title todo 1',
    description: 'this title description',
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
  return (
    <div className="grid w-full h-full gap-5 grid-columns-10">
      <Head>
        <title>Todolist</title>
      </Head>

      {/* Modal */}
      <div className="fixed top-0 bottom-0 left-0 right-0 z-50 p-5 overflow-x-hidden overflow-y-auto bg-black/70 ">
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
                id="email"
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
      </div>

      <div className="">
        <button className="px-1 py-1 font-bold rounded-md shadow-md md:px-5 md:py-2 hover:bg-sky-600 bg-sky-700">
          Add Todo
        </button>
      </div>
      <table className="w-full h-full p-5 overflow-hidden text-center align-middle rounded-md table-auto bg-slate-800">
        <thead className="bg-slate-700">
          <tr>
            <th></th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((val, idx) => {
            return (
              <tr className="p-5" key={idx}>
                <td className="mx-auto cursor-pointer">
                  <div>
                    <button className="px-0.5 py-0.5 font-bold rounded-md shadow-md  md:px-2 md:py-0.5 hover:bg-sky-600 bg-sky-700">
                      <AiFillPlusCircle />
                    </button>
                  </div>
                </td>
                <td>{val.title}</td>
                <td>
                  <div>
                    <button className="px-1 py-1 font-bold rounded-md shadow-md md:px-32md:py-10.5hover:bg-sky-600 bg-sky-700">
                      <RiPencilLine />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
