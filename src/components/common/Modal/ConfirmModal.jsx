import React from 'react';
import clipboard from '../../../utils/clipboard';
import styles from './ConfirmModal.module.css';

export default function ConfirmModal({
  message,
  code,
  btnText,
  isLoading,
  error,
  detail,
  onConfirm,
  onClose,
}) {
  return (
    <aside className={styles.modal}>
      <div className={styles['message-group']}>
        <p className={styles.message}>{message}</p>
        {code && <strong>{code}</strong>}
      </div>
      <div className={styles['btn-group']}>
        <button
          className={`${styles['confirm-btn']} ${error && styles['is-error']}`}
          type="button"
          onClick={onConfirm}
          disabled={isLoading}
        >
          {btnText}
        </button>
        <button
          className={styles['cancel-btn']}
          type="button"
          onClick={onClose}
        >
          취소
        </button>
      </div>
    </aside>
  );
}
