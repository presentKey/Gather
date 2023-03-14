import React from 'react';
import { HiOutlineCurrencyDollar } from 'react-icons/hi';
import { useAuthContext } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import styles from './Login.module.css';
import LoadingMain from '../../components/common/LoadingMain/LoadingMain';

export default function Login() {
  const { user, googleLogin, anonymouseLogin } = useAuthContext();

  if (user === undefined) return <LoadingMain />;
  if (user) return <Navigate to="/" replace />;

  return (
    <section className={styles.login}>
      <div className={styles['logo-group']}>
        <HiOutlineCurrencyDollar className={styles.logo} />
        <h1 className={styles.title}>Gather</h1>
      </div>
      <div className={styles['btn-group']}>
        <button
          className={styles['login-btn']}
          onClick={googleLogin}
          type="button"
        >
          로그인
        </button>
        <button
          className={styles['guest-btn']}
          onClick={anonymouseLogin}
          type="button"
        >
          게스트
        </button>
      </div>
    </section>
  );
}
