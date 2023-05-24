import React from 'react';
import styles from './css/LoadingDetail.module.css';

export default function LoadingDetail() {
  return (
    <div>
      <header className={styles.header}>
        <div className={styles.title}></div>
        <div className={styles.bank}></div>
        <div className={styles.total}></div>
      </header>
      <div className={styles.button}></div>
      <ul>
        <li className={styles.item}></li>
        <li className={styles.item}></li>
        <li className={styles.item}></li>
      </ul>
    </div>
  );
}
