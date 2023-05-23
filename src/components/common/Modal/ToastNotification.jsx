import { useEffect, useState } from 'react';
import styles from './ToastNotification.module.css';
import { GoIssueOpened } from 'react-icons/go';
import { GrFormClose } from 'react-icons/gr';

export default function ToastNotification({ message }) {
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
        <aside className={styles.toast}>
          <GoIssueOpened className={styles['issue-icon']} />
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
