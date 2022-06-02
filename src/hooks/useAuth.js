import { useSelector } from 'react-redux';
import { userSelector } from '../features/user/userSlice';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function useAuth(ifFound, destination) {
  const data = useSelector(userSelector);
  const router = useRouter();

  useEffect(() => {
    if (
      (data.token && data.name && data.email && ifFound) ||
      (data.token === null &&
        data.name === null &&
        data.email === null &&
        !ifFound)
    ) {
      router.push(destination).catch((err) => {
        console.error(err);
        alert('ERROR WHEN REDIRECT PAGE');
      });
    }
  }, [data, router, ifFound, destination]);

  return {
    isLogin: data.token && data.name && data.email ? true : false,
    user:
      data.token && data.name && data.email
        ? {
            token: data.token,
            name: data.name,
            email: data.email,
          }
        : false,
  };
}
