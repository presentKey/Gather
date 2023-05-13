import React from 'react';
import styles from './DetailHeader.module.css';
import { IoMdBook } from 'react-icons/io';
import { CiCoinInsert } from 'react-icons/ci';
import SettingMenu from './SettingMenu';

export default function DetailHeader({
  detail: { title, account, total, members },
  onUpdateButtonClick,
}) {
  return (
    <>
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
      <SettingMenu members={members} onUpdateButtonClick={onUpdateButtonClick} />
    </>
  );
}
