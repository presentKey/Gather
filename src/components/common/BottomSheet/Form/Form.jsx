import { useCallback, useEffect, useRef } from 'react';
import useClass from '../../../Main/hooks/useClass';
import { throttle } from 'lodash';
import styles from './Form.module.css';

export default function Form({
  text,
  children,
  setHeight,
  content,
  headerHeight,
  target,
  nonTarget,
  info,
}) {
  const { isLoading, error, handleCreateSubmit } = useClass(null, info);
  const formRef = useRef(null);

  const handleResize = useCallback(
    throttle(() => {
      setHeight(formRef.current?.offsetHeight);
    }, 700),
    []
  );

  useEffect(() => {
    if (content[target]) {
      setHeight(formRef.current?.offsetHeight);
      window.addEventListener('resize', handleResize);
    } else if (!content[target]) {
      if (content[nonTarget]) return;
      setHeight(0);
    }

    return () => window.removeEventListener('resize', handleResize);
  }, [content[target]]);

  return (
    <>
      <form
        className={`${styles.form} ${content[target] && styles['is-open']}`}
        style={{ top: headerHeight }}
        ref={formRef}
        onSubmit={handleCreateSubmit}
      >
        {children}
        <button className={`${styles.button} ${error && styles['is-error']}`} disabled={isLoading}>
          {text}
        </button>
      </form>
    </>
  );
}
