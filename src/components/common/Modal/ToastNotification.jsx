import { useEffect, useState } from 'react';
import styles from './css/ToastNotification.module.css';
import { GoIssueOpened } from 'react-icons/go';
import { GrFormClose } from 'react-icons/gr';
import { BsFillCheckCircleFill } from 'react-icons/bs';

export default function ToastNotification({ type, message }) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    let id;
    if (open) {
      id = setTimeout(() => setOpen(false), 3000);
    }

    return () => clearInterval(id);
  }, [open]);

  return (
    <>
      {open && (
        <aside className={`${styles.toast} ${styles[getBackgrounColor(type)]}`}>
          <span className={styles['toast-icon']}>
            {type === 'success' ? <BsFillCheckCircleFill /> : <GoIssueOpened />}
          </span>
          <p>{message}</p>
          <button type='button'>
            <GrFormClose
              className={styles['close-icon']}
              onClick={() => {
                setOpen(false);
              }}
            />
          </button>
          <div className={styles['time-bar']}></div>
        </aside>
      )}
    </>
  );
}

function getBackgrounColor(type) {
  return type === 'success' ? 'success' : 'fail';
}
