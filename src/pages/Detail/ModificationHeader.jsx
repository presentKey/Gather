import React from 'react';
import styles from './ModificationHeader.module.css';
import { IoMdBook } from 'react-icons/io';
import { CiCoinInsert } from 'react-icons/ci';
import SettingMenu from './SettingMenu';
import useInput from '../../hooks/useInput';
import isInputLengthZero from '../../utils/isInputLengthZero';
import useClass from '../../components/Main/hooks/useClass';

export default function ModificationHeader({
  code,
  headerInfo: { title, account, total },
  onModifyBtnClick,
}) {
  const { bank, number } = account;
  const [info, handleChange] = useInput({ title, bank, number, total });
  const { isLoading, error, handleUpdateHeader } = useClass(code, info);

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
          type="number"
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
        onClick={() => handleUpdateHeader(onModifyBtnClick)}
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
