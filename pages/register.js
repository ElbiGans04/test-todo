import Head from 'next/head';
import Link from 'next/link';
export default function register() {
  return (
    <div className="grid items-center w-full h-full grid-rows-3 gap-5 md:gap-10">
      <Head>
        <title>Register</title>
      </Head>

      <div className="flex flex-col">
        <label
          className="font-bold text-md md:text-xl text-cyan-500"
          htmlFor="name"
        >
          Name {' : '}
        </label>
        <input
          className="mt-1 border-0 rounded shadow-xl md:mt-3 bg-slate-800 focus:ring-1 focus:ring-slate-900"
          type="text"
          id="name"
        />
      </div>

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

      <div className="flex flex-col">
        <label
          className="font-bold text-md md:text-xl text-cyan-500"
          htmlFor="confirm_password"
        >
          Confirm Password {' : '}
        </label>
        <input
          className="mt-1 border-0 rounded shadow-xl md:mt-3 bg-slate-800 focus:ring-1 focus:ring-slate-900"
          type="password"
          id="confirm_password"
        />
      </div>

      <div className="grid items-center grid-cols-1 grid-rows-2 gap-1">
        <button className="px-3 py-1 font-bold rounded-md shadow-md md:px-5 md:py-2 hover:bg-sky-600 bg-sky-700">
          Register
        </button>
        <p className="text-sm text-center md:text-md">
          Already have an account?
          <Link href="/login">
            <a className="text-sky-700 hover:text-sky-400 hover:underline">
              {' '}
              click here{' '}
            </a>
          </Link>
          to login
        </p>
      </div>
    </div>
  );
}
