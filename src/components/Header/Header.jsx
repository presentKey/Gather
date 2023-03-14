import React from 'react';
import { ImExit } from 'react-icons/im';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import Avatar from '../common/Avatar/Avatar';
import styles from './Header.module.css';

export default function Header() {
  const { user, logout } = useAuthContext();

  return (
    <header className={styles.header}>
      <Avatar image={user.photoURL} />
      <Link to="/" className={styles.title}>
        Gather
      </Link>
      <button className={styles.button} type="button" onClick={logout}>
        <ImExit className={styles.logout} />
      </button>
    </header>
  );
}
