import React from 'react';
import Avatar from '../../components/common/Avatar/Avatar';
import { v4 as uuidv4 } from 'uuid';
import { BsThreeDotsVertical } from 'react-icons/bs';
import styles from './History.module.css';

export default function History({ history, members }) {
  const { date, price, type, uid } = history;

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
      </div>
      <div className={styles.right}>
        <b className={`${styles.type} ${type === 'deposit' && styles.deposit}`}>
          {type === 'deposit' ? '입금' : '출금'}
        </b>
        <strong className={styles.price}>{price.toLocaleString()}원</strong>
      </div>
      <button className={styles['set-btn']} type="button">
        <BsThreeDotsVertical className={styles['set-icon']} />
      </button>
    </li>
  );
}
