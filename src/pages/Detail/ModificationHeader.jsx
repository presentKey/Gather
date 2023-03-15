import React from 'react';
import styles from './ModificationHeader.module.css';
import { IoMdBook } from 'react-icons/io';
import { CiCoinInsert } from 'react-icons/ci';
import SettingMenu from './SettingMenu';

export default function ModificationHeader({
  headerInfo: { title, account, total },
  onModifyBtnClick,
}) {
  return (
    <header className={styles.header}>
      <input className={styles.title} value={title} />
      <div className={styles['bank-group']}>
        <IoMdBook className={styles['bank-icon']} />
        <input className={styles.bank} value={account.bank} />
        <input className={styles.number} value={account.number} />
      </div>
      <div className={styles.amount}>
        <CiCoinInsert className={styles['money-icon']} />
        <input className={styles.total} value={total} />
      </div>
      <SettingMenu onModifyBtnClick={onModifyBtnClick} />
      <button>수정하기</button>
      <button>취소</button>
    </header>
  );
}
