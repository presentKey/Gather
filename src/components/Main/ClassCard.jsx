import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getClassDetail } from '../../api/firebase';
import styles from './ClassCard.module.css';

export default function ClassCard({ code }) {
  const { data: myClass } = useQuery(
    ['myClass', code],
    () => getClassDetail(code),
    {
      staleTime: 1000 * 60 * 60,
    }
  );

  return (
    <>
      {myClass && (
        <li className={styles.card}>
          <h2 className={styles.title}>{myClass.title}</h2>
          <dl>
            <dt className={styles.bank}>{myClass.account.bank}</dt>
            <dd className={styles.number}>{myClass.account.number}</dd>
          </dl>
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
