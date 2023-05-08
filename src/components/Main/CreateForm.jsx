import React, { useCallback, useEffect, useRef } from 'react';
import useClass from './hooks/useClass';
import styles from './addForm.module.css';
import useInput from '../../hooks/useInput';
import { throttle } from 'lodash';

export default function CreateForm({ setHeight, content, headerHeight }) {
  const [info, handleChange] = useInput();
  const { isLoading, error, handleCreateSubmit } = useClass(null, info);
  const formRef = useRef(null);

  const handleResize = useCallback(
    throttle(() => {
      setHeight(formRef.current?.offsetHeight);
    }, 700),
    []
  );

  useEffect(() => {
    if (content.create) {
      setHeight(formRef.current?.offsetHeight);
      window.addEventListener('resize', handleResize);
    } else if (!content.create) {
      setHeight(0);
    }

    return () => window.removeEventListener('resize', handleResize);
  }, [content.create]);

  return (
    <>
      <form
        className={`${styles.form} ${content.create && styles['is-open']}`}
        style={{ top: headerHeight }}
        ref={formRef}
        onSubmit={handleCreateSubmit}
      >
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
