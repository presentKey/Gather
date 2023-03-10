import React from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import styles from './AddClassToast.module.css';

export default function AddClassToast() {
  return (
    <aside className={styles.toast}>
      <AiFillPlusCircle className={styles.plus} />
      <div className={styles['btn-group']}>
        <button className={styles['create-class']} type="button">
          모임 만들기
        </button>
        <button className={styles['participation-class']} type="button">
          모임 참여하기
        </button>
      </div>
    </aside>
  );
}
