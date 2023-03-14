import React from 'react';
import useClass from './hooks/useClass';
import styles from './addForm.module.css';
import useInput from '../../hooks/useInput';

export default function ParticipationForm() {
  const [info, handleChange] = useInput();
  const { isLoading, error, handleParticipationSubmit } = useClass(null, info);

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
