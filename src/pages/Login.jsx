import React from 'react';
import { HiOutlineCurrencyDollar } from 'react-icons/hi';
import { useAuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function Login() {
  const { user, googleLogin, anonymouseLogin } = useAuthContext();

  if (user === undefined) return <></>;
  if (user) return <Navigate to="/" replace />;

  return (
    <>
      <HiOutlineCurrencyDollar />
      <h1>Gather</h1>
      <div>
        <button onClick={googleLogin} type="button">
          로그인
        </button>
        <button onClick={anonymouseLogin} type="button">
          게스트
        </button>
      </div>
    </>
  );
}
