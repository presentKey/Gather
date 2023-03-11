import React from 'react';
import useAddClass from './hooks/useAddClass';
import styles from './addForm.module.css';

export default function CreateForm() {
  const { info, handleChange, handleCreateSubmit } = useAddClass();

  return (
    <>
      <form onSubmit={handleCreateSubmit} className={styles.form}>
        <div className={styles['input-box']}>
          <input
            type="text"
            name="title"
            value={info.title ?? ''}
            onChange={handleChange}
            required
          />
          <span>모임 이름</span>
        </div>
        <div className={styles['input-box']}>
          <input
            type="text"
            name="bank"
            value={info.bank ?? ''}
            onChange={handleChange}
            required
          />
          <span>은행</span>
        </div>
        <div className={styles['input-box']}>
          <input
            type="text"
            name="number"
            value={info.number ?? ''}
            onChange={handleChange}
            required
          />
          <span>계좌번호</span>
        </div>
        <button>모임 생성!</button>
      </form>
    </>
  );
}
