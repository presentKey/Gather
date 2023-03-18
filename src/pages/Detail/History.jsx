import React from 'react';
import Avatar from '../../components/common/Avatar/Avatar';
import { v4 as uuidv4 } from 'uuid';

export default function History({ history, members }) {
  const { date, price, type, uid } = history;

  return (
    <li>
      <div>{date}</div>
      <div>{price}</div>
      <div>{type}</div>
      <div>{uid}</div>
      {members.map(
        (members) =>
          members.uid === uid && (
            <Avatar key={uuidv4()} image={members.photoURL} />
          )
      )}
      <br />
    </li>
  );
}
