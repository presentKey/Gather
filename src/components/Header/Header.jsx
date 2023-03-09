import React from 'react';
import { ImExit } from 'react-icons/im';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import Avatar from '../Avatar/Avatar';

export default function Header() {
  const { user, logout } = useAuthContext();

  return (
    <header>
      <Avatar image={user.photoURL} />
      <Link to="/">Gather</Link>
      <button type="button" onClick={logout}>
        <ImExit />
      </button>
    </header>
  );
}
