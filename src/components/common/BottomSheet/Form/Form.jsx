import { useCallback, useEffect, useRef } from 'react';
import useClass from '../../../Main/hooks/useClass';
import { throttle } from 'lodash';
import styles from './Form.module.css';
import { DEPOSIT, WITHDRAW } from '../../../../constants/formButtonText';

export default function Form({
  code,
  text,
  children,
  setHeight,
  content,
  headerHeight,
  target,
  nonTarget,
  info,
  lastModified,
  onClose,
  clear,
}) {
  const { isLoading, error, handleSubmit } = useClass(code, info);
  const formRef = useRef(null);

  const handleResize = useCallback(
    throttle(() => setHeight(formRef.current?.offsetHeight), 700),
    []
  );

  useEffect(() => {
    if (!content[target] && !content[nonTarget]) {
      window.removeEventListener('resize', handleResize);
    } else if (content[target]) {
      setHeight(formRef.current?.offsetHeight);
      window.addEventListener('resize', handleResize);
      return;
    }
    if (content[nonTarget]) return;
    setHeight(0);

    return () => window.removeEventListener('resize', handleResize);
  }, [content[target]]);

  return (
    <>
      <form
        className={`${styles.form} ${content[target] && styles['is-open']}`}
        style={{ top: headerHeight }}
        ref={formRef}
        onSubmit={(e) => {
          handleSubmit(e, text, onClose, lastModified?.date, target);
          clear && clear();
        }}
      >
        {children}

        <button
          className={`${styles.button} ${styles[getButtonColor(text)]} ${
            error && styles['is-error']
          }`}
          disabled={isLoading}
        >
          {text}
        </button>
      </form>
    </>
  );
}

function getButtonColor(text) {
  if (text === DEPOSIT) return 'red';
  if (text === WITHDRAW) return 'blue';
}
