import React from 'react';

export default function ModifyHistory({ code, histories, history, members }) {
  const { type } = history;
  return <div>{type}</div>;
}
