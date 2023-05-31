import React from 'react';
import styles from './css/Header.module.css';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import Avatar from './common/Avatar';
import { useLocation } from 'react-router-dom';
import { ImArrowLeft2 } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { user, logout } = useAuthContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {pathname === '/detail' && (
          <button className={styles['back-button']} type='button'>
            <ImArrowLeft2 onClick={() => navigate('/')} />
          </button>
        )}
        <Avatar image={user.photoURL} />
      </div>
      <Link to='/' className={styles.title}>
        Gather
      </Link>
      <button className={styles.button} type='button' onClick={logout}>
        로그아웃
      </button>
    </header>
  );
}
