import React from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import Overlay from '../common/Overlay/Overlay';
import OverlayPortal from '../common/Overlay/OverlayPortal';
import styles from './AddClassToast.module.css';
import CreateForm from './CreateForm';
import useToggleContent from './hooks/useToggleContent';
import ParticipationForm from './ParticipationForm';

export default function AddClassToast() {
  const [content, handleContent, handleClose] = useToggleContent();

  return (
    <aside className={styles.toast}>
      <AiFillPlusCircle className={styles.plus} />
      <div className={styles['btn-group']}>
        <button
          className={`${styles.btn} ${content.create && styles['is-active']}`}
          type="button"
          data-type="create"
          onClick={handleContent}
        >
          모임 만들기
        </button>
        <button
          className={`${styles.btn} ${
            content.participation && styles['is-active']
          }`}
          type="button"
          data-type="participation"
          onClick={handleContent}
        >
          모임 참여하기
        </button>
      </div>
      {content.create && <CreateForm />}
      {content.participation && <ParticipationForm />}
      {(content.create || content.participation) && (
        <OverlayPortal>
          <Overlay onClose={handleClose} />
        </OverlayPortal>
      )}
    </aside>
  );
}
