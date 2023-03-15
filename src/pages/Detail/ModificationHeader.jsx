import React, { useState } from 'react';
import styles from './ModificationHeader.module.css';
import { IoMdBook } from 'react-icons/io';
import { CiCoinInsert } from 'react-icons/ci';
import SettingMenu from './SettingMenu';
import useInput from '../../hooks/useInput';

export default function ModificationHeader({
  headerInfo: { title, account, total },
  onModifyBtnClick,
}) {
  const { bank, number } = account;
  const [info, handleChange] = useInput({ title, bank, number, total });

  return (
    <header className={styles.header}>
      <input
        name="title"
        className={styles.title}
        value={info.title ?? ''}
        onChange={handleChange}
      />
      <div className={styles['bank-group']}>
        <IoMdBook className={styles['bank-icon']} />
        <input
          name="bank"
          className={styles.bank}
          value={info.bank ?? ''}
          onChange={handleChange}
        />
        <input
          name="number"
          className={styles.number}
          value={info.number ?? ''}
          onChange={handleChange}
        />
      </div>
      <div className={styles.amount}>
        <CiCoinInsert className={styles['money-icon']} />
        <input
          name="total"
          type="number"
          className={styles.total}
          value={info.total ?? ''}
          onChange={handleChange}
        />
      </div>
      <SettingMenu onModifyBtnClick={onModifyBtnClick} />
      <button className={styles['modify-btn']} type="button">
        수정하기
      </button>
      <button className={styles['cancel-btn']} type="button">
        취소
      </button>
    </header>
  );
}
