import React from 'react';
import styles from './ShowHeader.module.css';
import { IoMdBook } from 'react-icons/io';
import { CiCoinInsert } from 'react-icons/ci';
import SettingMenu from './SettingMenu';

export default function ShowHeader({
  headerInfo: { title, account, total },
  onModifyBtnClick,
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
      <SettingMenu onModifyBtnClick={onModifyBtnClick} />
    </header>
  );
}
