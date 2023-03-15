import React, { useState } from 'react';
import styles from './ModificationHeader.module.css';
import { IoMdBook } from 'react-icons/io';
import { CiCoinInsert } from 'react-icons/ci';
import SettingMenu from './SettingMenu';
import useInput from '../../hooks/useInput';
import { updateClassHeader } from '../../api/firebase';
import isInputLengthZero from '../../utils/isInputLengthZero';

export default function ModificationHeader({
  code,
  headerInfo: { title, account, total },
  onModifyBtnClick,
}) {
  const { bank, number } = account;
  const [info, handleChange] = useInput({ title, bank, number, total });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const handleUpdateHeader = () => {
    setIsLoading(true);
    updateClassHeader(code, info)
      .then(() => {
        onModifyBtnClick();
      })
      .catch(() => {
        setError(true);
        setTimeout(() => setError(false), 600);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <header className={styles.header}>
      <input
        name="title"
        className={`${styles.title} ${
          isInputLengthZero(info.title) && styles['is-error']
        }`}
        value={info.title ?? ''}
        onChange={handleChange}
      />
      <div className={styles['bank-group']}>
        <IoMdBook className={styles['bank-icon']} />
        <input
          name="bank"
          className={`${styles.bank} ${
            isInputLengthZero(info.bank) && styles['is-error']
          }`}
          value={info.bank ?? ''}
          onChange={handleChange}
        />
        <input
          name="number"
          className={`${styles.number} ${
            isInputLengthZero(info.number) && styles['is-error']
          }`}
          value={info.number ?? ''}
          onChange={handleChange}
        />
      </div>
      <div className={styles.amount}>
        <CiCoinInsert className={styles['money-icon']} />
        <input
          name="total"
          type="number"
          className={`${styles.total} ${
            isInputLengthZero(info.total) && styles['is-error']
          }`}
          value={info.total ?? ''}
          onChange={handleChange}
        />
      </div>
      <SettingMenu onModifyBtnClick={onModifyBtnClick} />
      <button
        className={`${styles['modify-btn']} ${error && styles['is-error']}`}
        type="button"
        disabled={isLoading}
        onClick={handleUpdateHeader}
      >
        수정하기
      </button>
      <button
        className={styles['cancel-btn']}
        type="button"
        onClick={onModifyBtnClick}
      >
        취소
      </button>
    </header>
  );
}
