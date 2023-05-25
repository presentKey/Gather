import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import styles from './css/LoadingMain.module.css';

export default function LoadingMain() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.avatar}></div>
        <h1 className={styles.title}>Gather</h1>
      </header>
      <LoadingSpinner />
      <div className={styles.toast}></div>
    </>
  );
}
