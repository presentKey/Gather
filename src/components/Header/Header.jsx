import React from 'react';
import { ImExit } from 'react-icons/im';
import { useAuthContext } from '../../context/AuthContext';

export default function Header() {
  const { logout } = useAuthContext();

  return (
    <header>
      <h1>Gather</h1>
      <button type="button" onClick={logout}>
        <ImExit />
      </button>
    </header>
  );
}
