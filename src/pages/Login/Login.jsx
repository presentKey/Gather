import React from 'react';
import { Navigate } from 'react-router-dom';
import styles from './Login.module.css';
import useLogin from './hooks/useLogin';
import Symbole from '../../components/common/icons/Symbole';
import LoadingMain from '../../components/common/Loading/LoadingMain';

export default function Login() {
  const { isLoading, user, handleGoogleLogin, handleAnonymouseLogin, isWebView } = useLogin();

  if (user === undefined) return <LoadingMain />;
  if (user) return <Navigate to='/' replace />;

  return (
    <section className={styles.login}>
      <div className={styles['logo-group']}>
        <Symbole />
        <h1 className={styles.title}>Gather</h1>
      </div>
      <div className={styles['btn-group']}>
        {isWebView() && (
          <p className={styles.webView}>
            접속하신 브라우저는 구글 로그인을 지원하지 않습니다.
            <br />
            Chrome, 삼성 인터넷 등 다른 브라우저를 이용해주세요.
          </p>
        )}
        <button
          className={styles['login-btn']}
          onClick={handleGoogleLogin}
          type='button'
          disabled={isLoading || isWebView()}
        >
          로그인
        </button>
        <button
          className={styles['guest-btn']}
          onClick={handleAnonymouseLogin}
          type='button'
          disabled={isLoading}
        >
          게스트
        </button>
      </div>
    </section>
  );
}
