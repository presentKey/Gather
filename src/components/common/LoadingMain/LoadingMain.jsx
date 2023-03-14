import React from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import styles from './LoadingMain.module.css';

export default function LoadingMain() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.avatar}></div>
        <h1 className={styles.title}>Gather</h1>
      </header>
      <div className={styles.loading}>
        <LoadingSpinner />
      </div>
      <div className={styles.toast}></div>
    </>
  );
}
