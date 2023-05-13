import React from 'react';
import styles from './UpdateHeader.module.css';
import { IoMdBook } from 'react-icons/io';
import { CiCoinInsert } from 'react-icons/ci';
import SettingMenu from './SettingMenu';
import useInput from '../../hooks/useInput';
import isInputLengthZero from '../../utils/isInputLengthZero';
import useClass from '../../components/Main/hooks/useClass';

export default function UpdateHeader({
  code,
  detail: { title, account, total, allowAnonymouse },
  onUpdateButtonClick,
}) {
  const { bank, number } = account;
  const [info, handleChange] = useInput({ title, bank, number, total, allowAnonymouse });
  const { isLoading, error, handleUpdateHeader } = useClass(code, info);

  return (
    <header className={styles.header}>
      <input
        name='title'
        className={`${styles.title} ${isInputLengthZero(info.title) && styles['is-error']}`}
        value={info.title ?? ''}
        onChange={handleChange}
      />
      <div className={styles['bank-group']}>
        <IoMdBook className={styles['bank-icon']} />
        <input
          name='bank'
          className={`${styles.bank} ${isInputLengthZero(info.bank) && styles['is-error']}`}
          value={info.bank ?? ''}
          onChange={handleChange}
        />
        <input
          name='number'
          type='number'
          className={`${styles.number} ${isInputLengthZero(info.number) && styles['is-error']}`}
          value={info.number ?? ''}
          onChange={handleChange}
        />
      </div>
      <div className={styles.amount}>
        <CiCoinInsert className={styles['money-icon']} />
        <input
          name='total'
          type='number'
          className={`${styles.total} ${isInputLengthZero(info.total) && styles['is-error']}`}
          value={info.total ?? ''}
          onChange={handleChange}
        />
      </div>
      <div className={styles['set-group']}>
        <input
          className={styles['set-anonymouse']}
          type='checkbox'
          name='allowAnonymouse'
          id='allowAnonymouse'
          checked={info.allowAnonymouse}
          onChange={handleChange}
        />
        <label htmlFor='allowAnonymouse'>모임 구성원으로 게스트 유저 허용</label>
      </div>
      <SettingMenu onUpdateButtonClick={onUpdateButtonClick} />
      <button
        className={`${styles['modify-btn']} ${error && styles['is-error']}`}
        type='button'
        disabled={isLoading}
        onClick={() => handleUpdateHeader(onUpdateButtonClick)}
      >
        수정하기
      </button>
      <button className={styles['cancel-btn']} type='button' onClick={onUpdateButtonClick}>
        취소
      </button>
    </header>
  );
}
