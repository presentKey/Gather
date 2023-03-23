import React from 'react';
import styles from './NotFound.module.css';
import { RiEmotionSadLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className={styles['not-found']}>
      <RiEmotionSadLine className={styles.icon} />
      <p className={styles.message}>페이지를 찾을 수 없습니다.</p>
      <Link to="/" className={styles.btn} type="button">
        홈으로 돌아가기
      </Link>
    </section>
  );
}
