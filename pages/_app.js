import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <div className="min-h-screen px-10 font-sans md:px-14 lg:px-24 xl:px-28 text-slate-300 w-100 bg-slate-900">
      <header className="flex items-center justify-between px-5 py-5 mb-5 border-b-2 border-slate-800">
        <h1 className="text-xl font-semibold md:text-3xl text-cyan-400 ">
          <a className="cursor-pointer hover:underline" href="">
            Todolist App
          </a>
        </h1>
        <h1 className="font-medium md:text-lg text-md text-cyan-700">
        <a className="cursor-pointer hover:underline" href="">
          Logout
          </a>
        </h1>
      </header>
      <Component {...pageProps} />
      <footer className='flex items-center justify-center py-5 mt-10 border-t-2 border-slate-800'>
        <p>
          Made with ❤ By <a className="underline text-rose-400 hover:text-rose-700" href="https://elbi.vercel.app">Rhafael Bijaksana</a>
        </p>
      </footer>
    </div>
  )
}

export default MyApp
