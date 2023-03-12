import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getClassDetail } from '../../api/firebase';
import Avatar from '../Avatar/Avatar';
import styles from './ClassCard.module.css';
import showMax7Members from '../../utils/showMax7Members';

export default function ClassCard({ code }) {
  const { isLoading, data: myClass } = useQuery(
    ['myClass', code],
    () => getClassDetail(code),
    {
      staleTime: 1000 * 60 * 60,
    }
  );

  if (isLoading) return <p>로딩중</p>;
  const [members, overLength] = showMax7Members(myClass.members);

  return (
    <>
      {myClass && (
        <li className={styles.card}>
          <h2 className={styles.title}>{myClass.title}</h2>
          <dl>
            <dt className={styles.bank}>{myClass.account.bank}</dt>
            <dd className={styles.number}>{myClass.account.number}</dd>
          </dl>
          <div className={styles['member-content']}>
            <ul className={styles['member-list']}>
              {members.map((member) => (
                <Avatar key={member.uid} image={member.photoURL} />
              ))}
            </ul>
            {overLength !== 0 && <b>+{overLength}</b>}
          </div>
          <div className={styles['right']}>
            <span
              className={styles.total}
            >{`${myClass.total.toLocaleString()}원`}</span>
          </div>
        </li>
      )}
    </>
  );
}
