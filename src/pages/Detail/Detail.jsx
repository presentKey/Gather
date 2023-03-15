import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ShowHeader from './ShowHeader';
import ModificationHeader from './ModificationHeader';

export default function Detail() {
  let {
    state: { detail },
  } = useLocation();
  const [isModification, setIsModification] = useState(false);
  const handleModifyBtnClick = () => setIsModification(!isModification);

  return (
    <>
      {!isModification && (
        <ShowHeader
          headerInfo={detail}
          onModifyBtnClick={handleModifyBtnClick}
        />
      )}
      {isModification && (
        <ModificationHeader
          headerInfo={detail}
          onModifyBtnClick={handleModifyBtnClick}
        />
      )}
      <div>Detail</div>
    </>
  );
}
