import Head from 'next/head';

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
      <div className="">
        <button className="px-1 py-1 font-bold rounded-md shadow-md md:px-5 md:py-2 hover:bg-sky-600 bg-sky-700">
          Add Todo
        </button>
      </div>
      <table className="w-full h-full p-5 overflow-hidden text-center align-middle rounded-md table-auto bg-slate-800">
        <thead className="bg-slate-700">
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Description</th>
            <th>Start</th>
            <th>End</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((val, idx) => {
            return (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{val.title}</td>
                <td>{val.description}</td>
                <td>{val.start}</td>
                <td>{val.end}</td>
                <td>
                  <div>
                    <button className="px-1 py-1 font-bold rounded-md shadow-md md:px-5 md:py-2 hover:bg-sky-600 bg-sky-700">
                      ✏
                    </button>
                    <button className="px-1 py-1 font-bold rounded-md shadow-md md:px-5 md:py-2 hover:bg-sky-600 bg-sky-700">
                      ❌
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
