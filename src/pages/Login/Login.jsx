import React from 'react';
import { HiOutlineCurrencyDollar } from 'react-icons/hi';
import { Navigate } from 'react-router-dom';
import styles from './Login.module.css';
import LoadingMain from '../../components/common/LoadingMain/LoadingMain';
import useLogin from './hooks/useLogin';

export default function Login() {
  const { isLoading, user, handleGoogleLogin, handleAnonymouseLogin } =
    useLogin();

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
          onClick={handleGoogleLogin}
          type="button"
          disabled={isLoading}
        >
          로그인
        </button>
        <button
          className={styles['guest-btn']}
          onClick={handleAnonymouseLogin}
          type="button"
          disabled={isLoading}
        >
          게스트
        </button>
      </div>
    </section>
  );
}
