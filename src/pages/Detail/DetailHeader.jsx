import React from 'react';
import styles from './DetailHeader.module.css';
import SettingMenu from './SettingMenu';
import BankIcon from '../../components/common/icons/BankIcon';
import MoneyIcon from '../../components/common/icons/MoneyIcon';

export default function DetailHeader({
  detail: { title, account, total, members },
  onUpdateButtonClick,
}) {
  return (
    <>
      <h2 className={styles.title}>{title}</h2>
      <dl className={styles['bank-group']}>
        <BankIcon />
        <dt className={styles.bank}>{account.bank}</dt>
        <dd className={styles.number}>{account.number}</dd>
      </dl>
      <div className={styles.amount}>
        <MoneyIcon />
        <strong className={styles.total}>{total.toLocaleString()}원</strong>
      </div>
      <SettingMenu members={members} onUpdateButtonClick={onUpdateButtonClick} />
    </>
  );
}
