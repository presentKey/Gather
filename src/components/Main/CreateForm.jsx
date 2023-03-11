import React from 'react';
import useCreateClass from './hooks/useCreateClass';
import styles from './addForm.module.css';

export default function CreateForm() {
  const { createInfo, handleChange, handleSubmit } = useCreateClass();

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles['input-box']}>
          <input
            type="text"
            name="title"
            value={createInfo.title ?? ''}
            onChange={handleChange}
            required
          />
          <span>모임 이름</span>
        </div>
        <div className={styles['input-box']}>
          <input
            type="text"
            name="bank"
            value={createInfo.bank ?? ''}
            onChange={handleChange}
            required
          />
          <span>은행</span>
        </div>
        <div className={styles['input-box']}>
          <input
            type="text"
            name="number"
            value={createInfo.number ?? ''}
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
