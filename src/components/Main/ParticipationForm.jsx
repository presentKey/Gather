import React from 'react';
import useAddClass from './hooks/useAddClass';
import styles from './addForm.module.css';

export default function ParticipationForm() {
  const { info, handleChange, handleParticipationSubmit } = useAddClass();

  return (
    <>
      <form onSubmit={handleParticipationSubmit} className={styles.form}>
        <div className={styles['input-box']}>
          <input
            type="text"
            name="code"
            value={info.code ?? ''}
            onChange={handleChange}
            required
          />
          <span>모임 코드</span>
        </div>

        <button>모임 참여!</button>
      </form>
    </>
  );
}
