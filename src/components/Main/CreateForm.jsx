import React from 'react';
import useClass from './hooks/useClass';
import styles from './addForm.module.css';
import useInput from '../../hooks/useInput';

export default function CreateForm() {
  const [info, handleChange] = useInput();
  const { isLoading, error, handleCreateSubmit } = useClass(null, info);

  return (
    <>
      <form onSubmit={handleCreateSubmit} className={styles.form}>
        <div className={styles['set-group']}>
          <input
            className={styles['set-anonymouse']}
            type='checkbox'
            name='allowAnonymouse'
            id='allowAnonymouse'
            onChange={handleChange}
          />
          <label htmlFor='allowAnonymouse'>모임 구성원으로 게스트 유저 허용</label>
        </div>
        <div className={styles['input-box']}>
          <input
            type='text'
            name='title'
            value={info.title ?? ''}
            onChange={handleChange}
            required
          />
          <span>모임 이름</span>
        </div>
        <div className={styles['input-box']}>
          <input type='text' name='bank' value={info.bank ?? ''} onChange={handleChange} required />
          <span>은행</span>
        </div>
        <div className={styles['input-box']}>
          <input
            type='number'
            name='number'
            value={info.number ?? ''}
            onChange={handleChange}
            required
          />
          <span>계좌번호</span>
        </div>
        <button className={`${error && styles['is-error']}`} disabled={isLoading}>
          모임 생성!
        </button>
      </form>
    </>
  );
}
