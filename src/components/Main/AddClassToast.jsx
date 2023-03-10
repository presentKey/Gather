import React from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import styles from './AddClassToast.module.css';
import CreateForm from './CreateForm';
import useToggleContent from './hooks/useToggleContent';

export default function AddClassToast() {
  const [content, handleContent] = useToggleContent();

  return (
    <aside className={styles.toast}>
      <AiFillPlusCircle className={styles.plus} />
      <div className={styles['btn-group']}>
        <button
          className={styles['create-class']}
          type="button"
          data-type="create"
          onClick={handleContent}
        >
          모임 만들기
        </button>
        <button
          className={styles['participation-class']}
          type="button"
          data-type="participation"
          onClick={handleContent}
        >
          모임 참여하기
        </button>
      </div>
      {content.create && <CreateForm />}
      {content.participation && <CreateForm />}
    </aside>
  );
}
