import Head from 'next/head';
export default function login() {
  return (
    <div className="grid items-center w-full grid-rows-3 md:h-64 h-52">
      <Head>
        <title>Login</title>
      </Head>

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

      <div className="flex flex-col">
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

      <div className="grid grid-cols-1">
        <button className="px-3 py-1 font-bold rounded-md shadow-md md:px-5 md:py-2 hover:bg-sky-600 bg-sky-700">
          Login
        </button>
      </div>
    </div>
  );
}
