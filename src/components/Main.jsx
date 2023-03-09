import React from 'react';
import { useAuthContext } from '../context/AuthContext';

export default function Main() {
  const { logout } = useAuthContext();

  return (
    <div>
      Main
      <button onClick={logout}>로그아웃</button>
    </div>
  );
}
