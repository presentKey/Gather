import React from 'react';
import styles from './ConfirmModal.module.css';
import ModalPortal from './ModalPortal';
import ToastNotification from './ToastNotification';

export default function ConfirmModal({
  message,
  code,
  btnText,
  isLoading,
  error,
  onConfirm,
  onClose,
}) {
  return (
    <>
      <aside className={styles.modal}>
        <div className={styles['message-group']}>
          <p className={styles.message}>{message}</p>
          {code && <strong>{code}</strong>}
        </div>
        <div className={styles['btn-group']}>
          <button
            className={styles['confirm-btn']}
            type='button'
            onClick={onConfirm}
            disabled={isLoading}
          >
            {btnText}
          </button>
          <button className={styles['cancel-btn']} type='button' onClick={onClose}>
            취소
          </button>
        </div>
      </aside>

      {error && error.state && (
        <ModalPortal>
          <ToastNotification message={error.message} />
        </ModalPortal>
      )}
    </>
  );
}
