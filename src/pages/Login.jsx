import React, { useEffect, useState } from 'react';
import { HiOutlineCurrencyDollar } from 'react-icons/hi';
import {
  anonymouseLogin,
  googleLogin,
  onUserStateChange,
} from '../api/firebase';

export default function Login() {
  const [user, setUser] = useState();
  useEffect(() => {
    onUserStateChange(setUser);
  }, []);

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
