import '../styles/globals.css';
import Link from 'next/link';
import { Provider } from 'react-redux';
import { store } from '../src/app/store';
import NP from 'nextjs-progressbar';
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <NP options={{ showSpinner: false }} />
      <div className="min-h-screen px-10 font-sans md:px-14 lg:px-24 xl:px-28 text-slate-300 w-100 bg-slate-900">
        <header className="flex items-center justify-between px-5 py-5 mb-5 border-b-2 border-slate-800">
          <h1 className="text-xl font-semibold md:text-3xl text-sky-500 ">
            <Link href="/">
              <a className="cursor-pointer hover:underline" href="">
                Todolist App
              </a>
            </Link>
          </h1>
          <h1 className="font-medium md:text-lg text-md text-cyan-700 hover:text-cyan-400">
            <Link href="/logout">
              <a className="cursor-pointer hover:underline" href="">
                Logout
              </a>
            </Link>
          </h1>
        </header>
        <Component {...pageProps} />
        <footer className="flex items-center justify-center py-5 mt-10 border-t-2 border-slate-800">
          <p>
            Made with ❤ By{' '}
            <a
              className="underline text-sky-700 hover:text-sky-400"
              href="https://elbi.vercel.app"
            >
              Rhafael Bijaksana
            </a>
          </p>
        </footer>
      </div>
    </Provider>
  );
}

export default MyApp;
