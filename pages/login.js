import Head from 'next/head';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useAuth from '../src/hooks/useAuth';
import { login } from '../src/features/user/userSlice';
import {
  iddle,
  loading,
  error,
  statusSelector,
} from '../src/features/status/statusSlice';
import { useSelector } from 'react-redux';

const schema = Yup.object({
  email: Yup.string()
    .min(5, 'MIN 5 LENGTH')
    .max(100, 'MAX 100 LENGTH')
    .email('PLEASE INSERT ONLY VALID EMAIL')
    .required('PLEASE INSERT YOUR EMAIL'),
  password: Yup.string()
    .min(5, 'MIN 5 LENGTH')
    .max(100, 'MAX 100 LENGTH')
    .required('PLEASE INSERT YOUR PASSWORD'),
}).required();
/* password
      .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      `please enter a password with a minimum length of 8 letters, consisting of at least one letter, at least one number and at least one special letter`,
    )
*/
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: 'onSubmit' });
  const dispatch = useDispatch();
  const auth = useAuth(true, '/');
  const status = useSelector(statusSelector);

  /* 
    Event Handler
  */
  const formHandler = handleSubmit((data) => {
    if (status.name === 'loading') return;

    dispatch(loading());
    fetch('https://todos.data.my.id/api/login', {
      method: 'POST',
      body: new URLSearchParams(data),
    })
      .then((res) => {
        if (!res.ok && res.status === 401)
          throw new Error('WRONG EMAIL OR PASSWORD');
        return res.json();
      })
      .then((res) => {
        alert('SUCCESS LOGIN. WILL REDIRECT');
        dispatch(iddle());
        dispatch(
          login({
            token: res.access_token,
            name: res.data.name,
            email: res.data.email,
          }),
        );
      })
      .catch((err) => {
        dispatch(error());
        alert(err);
      });
  });

  return (
    <form
      onSubmit={formHandler}
      className="grid items-center w-full h-full grid-rows-3 gap-5 md:gap-10"
    >
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
          className="mt-1 border-0 rounded shadow-xl invalid:border-1 invalid:border-pink-900 md:mt-3 bg-slate-800 focus:ring-1 focus:ring-slate-900"
          type="email"
          id="email"
          {...register('email')}
        />
        {errors.email?.message && (
          <p className="mt-1 text-sm font-bold text-red-900 md:text-md md:mt-3">
            {errors.email?.message}
          </p>
        )}
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
          id="password"
          {...register('password')}
        />
        {errors.password?.message && (
          <p className="mt-1 text-sm font-bold text-red-900 md:text-md md:mt-3">
            {errors.password?.message}
          </p>
        )}
      </div>

      <div className="grid items-center grid-cols-1 grid-rows-2 gap-1">
        <button
          type="submit"
          className="px-3 py-1 font-bold rounded-md shadow-md md:px-5 md:py-2 hover:bg-sky-600 bg-sky-700"
          disabled={status.name === 'loading' ? true : false}
        >
          {status.name !== 'loading' ? 'Login' : 'Loading...'}
        </button>
        <p className="text-sm text-center md:text-md">
          Don&apos;t have an account yet?
          <Link href="/register">
            <a className="text-sky-700 hover:text-sky-400 hover:underline">
              {' '}
              click here{' '}
            </a>
          </Link>
          to go to account list page
        </p>
      </div>
    </form>
  );
}
