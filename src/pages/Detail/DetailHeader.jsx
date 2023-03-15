import React from 'react';
import styles from './DetailHeader.module.css';
import { IoMdBook, IoMdSettings } from 'react-icons/io';
import { CiCoinInsert } from 'react-icons/ci';

export default function DetailHeader({
  headerInfo: { title, account, total },
}) {
  return (
    <header className={styles.header}>
      <h2 className={styles.title}>{title}</h2>
      <dl className={styles['bank-group']}>
        <IoMdBook className={styles['bank-icon']} />
        <dt className={styles.bank}>{account.bank}</dt>
        <dd className={styles.number}>{account.number}</dd>
      </dl>
      <div className={styles.amount}>
        <CiCoinInsert className={styles['money-icon']} />
        <strong className={styles.total}>{total.toLocaleString()}원</strong>
      </div>
      <button className={styles['setting-btn']}>
        <IoMdSettings className={styles['setting-icon']} />
      </button>
    </header>
  );
}
