import React from 'react';
import Avatar from '../common/Avatar/Avatar';
import styles from './ClassCard.module.css';
import showMax7Members from '../../utils/showMax7Members';
import { Link } from 'react-router-dom';
import LoadingCard from './LoadingCard';
import useClassDetail from '../../hooks/useClassDetail';

export default function ClassCard({ code }) {
  const {
    useClassDetailQuery: { isLoading, data: myClass },
  } = useClassDetail(code);

  if (isLoading) return <LoadingCard />;
  const [members, overLength] = showMax7Members(myClass.members);

  return (
    <>
      {myClass && (
        <Link to='/detail' state={{ code }} className={styles.card}>
          <li className={styles['card-list']}>
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
            <div className={styles.amount}>
              <span className={styles.total}>{`${myClass.total.toLocaleString()}원`}</span>
            </div>
          </li>
        </Link>
      )}
    </>
  );
}
