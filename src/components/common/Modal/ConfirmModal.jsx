import React from 'react';
import styles from './ConfirmModal.module.css';

export default function ConfirmModal({ detail, onConfirm, onClose }) {
  return (
    <aside className={styles.modal}>
      <p className={styles.message}>모임에서 나가시겠습니까?</p>
      <div className={styles['btn-group']}>
        <button
          className={styles['confirm-btn']}
          type="button"
          onClick={() => onConfirm(detail, onClose)}
        >
          모임 나가기
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