import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getClassDetail } from '../../api/firebase';

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
        <li>
          <h2>{myClass.title}</h2>
          <dl>
            <dt>{myClass.account.bank}</dt>
            <dd>{myClass.account.number}</dd>
          </dl>
          <span>{`${myClass.total.toLocaleString()}원`}</span>
        </li>
      )}
    </>
  );
}
