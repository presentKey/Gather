import { useEffect, useState } from 'react';
import styles from './ToastNotification.module.css';
import { GoIssueOpened } from 'react-icons/go';
import { GrFormClose } from 'react-icons/gr';

export default function ToastNotification({ message }) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    let id;
    if (open) {
      id = setTimeout(() => setOpen(false), 4000);
    }

    return () => clearInterval(id);
  }, [open]);

  return (
    <>
      {open && (
        <aside className={styles.toast}>
          <GoIssueOpened />
          {message}
          <GrFormClose
            onClick={() => {
              setOpen(false);
            }}
          />
          <div className={styles['time-bar']}></div>
        </aside>
      )}
    </>
  );
}
