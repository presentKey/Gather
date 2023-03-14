import React from 'react';
import styles from './LoadingCard.module.css';

export default function LoadingCard() {
  return (
    <>
      <li className={styles.card}>
        <div className={styles.title}></div>
        <div className={styles.bank}></div>
        <div className={styles.number}></div>
        <div className={styles.members}></div>
        <div className={styles.amount}>
          <div className={styles.total}></div>
        </div>
      </li>
    </>
  );
}
