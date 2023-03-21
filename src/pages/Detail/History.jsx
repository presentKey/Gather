import React from 'react';
import Avatar from '../../components/common/Avatar/Avatar';
import { v4 as uuidv4 } from 'uuid';
import { BsThreeDotsVertical } from 'react-icons/bs';
import styles from './History.module.css';
import useModal from '../../hooks/useModal';
import OverlayPortal from '../../components/common/Overlay/OverlayPortal';
import Overlay from '../../components/common/Overlay/Overlay';
import ModalPortal from '../../components/common/Modal/ModalProtal';
import ConfirmModal from '../../components/common/Modal/ConfirmModal';
import useClass from '../../components/Main/hooks/useClass';

export default function History({ code, histories, history, members }) {
  const { id, date, price, message, type, uid } = history;
  const [toggleHistoryModal, setToggleHistoryModal] = useModal();
  const { isLoading, error, handleDeleteHistory } = useClass(code);

  return (
    <li className={styles['history-list']}>
      <div className={styles.left}>
        {members.map(
          (member) =>
            member.uid === uid && (
              <Avatar key={uuidv4()} image={member.photoURL} />
            )
        )}
        <span className={styles.date}>{date}</span>
        <p className={styles.message}>{message}</p>
      </div>
      <div className={styles.right}>
        <b className={`${styles.type} ${type === 'deposit' && styles.deposit}`}>
          {type === 'deposit' ? '입금' : '출금'}
        </b>
        <strong className={styles.price}>{price.toLocaleString()}원</strong>
      </div>
      <button
        className={styles['set-btn']}
        type="button"
        onClick={setToggleHistoryModal}
      >
        <BsThreeDotsVertical className={styles['set-icon']} />
      </button>
      {toggleHistoryModal && (
        <OverlayPortal>
          <Overlay onClose={setToggleHistoryModal} />
          <ModalPortal>
            <ConfirmModal
              message={'해당 내역을 삭제하시겠습니까?'}
              btnText={'내역 삭제'}
              isLoading={isLoading}
              error={error}
              onConfirm={() =>
                handleDeleteHistory(id, histories, setToggleHistoryModal)
              }
              onClose={setToggleHistoryModal}
            />
          </ModalPortal>
        </OverlayPortal>
      )}
    </li>
  );
}
