import React from 'react';
import { useLocation } from 'react-router-dom';
import DetailHeader from './DetailHeader';

export default function Detail() {
  let {
    state: { detail },
  } = useLocation();

  return (
    <>
      <DetailHeader headerInfo={detail} />
      <div>Detail</div>
    </>
  );
}
