import React from 'react';
import { ImExit } from 'react-icons/im';
import { useAuthContext } from '../../context/AuthContext';
import Avatar from '../Avatar/Avatar';

export default function Header() {
  const { user, logout } = useAuthContext();

  return (
    <header>
      <Avatar image={user.photoURL} />
      <h1>Gather</h1>
      <button type="button" onClick={logout}>
        <ImExit />
      </button>
    </header>
  );
}
