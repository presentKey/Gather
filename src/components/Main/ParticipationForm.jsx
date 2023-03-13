import React from 'react';
import useClass from './hooks/useClass';
import styles from './addForm.module.css';

export default function ParticipationForm() {
  const { info, isLoading, error, handleChange, handleParticipationSubmit } =
    useClass();

  return (
    <>
      <form onSubmit={handleParticipationSubmit} className={styles.form}>
        <div className={styles['input-box']}>
          <input
            className={`${error && styles['is-error']}`}
            type="text"
            name="code"
            value={info.code ?? ''}
            onChange={handleChange}
            required
          />
          <span>모임 코드</span>
        </div>

        <button disabled={isLoading}>모임 참여!</button>
      </form>
    </>
  );
}
