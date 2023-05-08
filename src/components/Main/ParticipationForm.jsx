import React, { useCallback, useEffect, useRef } from 'react';
import useClass from './hooks/useClass';
import styles from './addForm.module.css';
import useInput from '../../hooks/useInput';
import { throttle } from 'lodash';

export default function ParticipationForm({ setHeight, content, headerHeight }) {
  const [info, handleChange] = useInput();
  const { isLoading, error, handleParticipationSubmit } = useClass(null, info);
  const formRef = useRef(null);

  const handleResize = useCallback(
    throttle(() => {
      setHeight(formRef.current?.offsetHeight);
    }, 700),
    []
  );

  useEffect(() => {
    if (content.participation) {
      setHeight(formRef.current?.offsetHeight);
      window.addEventListener('resize', handleResize);
    } else if (!content.participation) {
      if (content.create) return;
      setHeight(0);
    }

    return () => window.removeEventListener('resize', handleResize);
  }, [content.participation]);

  return (
    <>
      <form
        className={`${styles.form} ${content.participation && styles['is-open']}`}
        style={{ top: headerHeight }}
        onSubmit={handleParticipationSubmit}
        ref={formRef}
      >
        <div className={styles['input-box']}>
          <input
            className={`${error && styles['is-error']}`}
            type='text'
            name='code'
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
