import React from 'react';
import styles from './css/Header.module.css';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import Avatar from './common/Avatar';

export default function Header() {
  const { user, logout } = useAuthContext();

  return (
    <header className={styles.header}>
      <Avatar image={user.photoURL} />
      <Link to='/' className={styles.title}>
        Gather
      </Link>
      <button className={styles.button} type='button' onClick={logout}>
        로그아웃
      </button>
    </header>
  );
}
