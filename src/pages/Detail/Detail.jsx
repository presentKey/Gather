import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ShowHeader from './ShowHeader';
import ModificationHeader from './ModificationHeader';
import { Navigate } from 'react-router-dom';

export default function Detail() {
  const { state } = useLocation();
  const [isModification, setIsModification] = useState(false);
  const handleModifyBtnClick = () => setIsModification(!isModification);

  if (!state) return <Navigate to="/" replace />;

  const { code, detail } = state;

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
          code={code}
          headerInfo={detail}
          onModifyBtnClick={handleModifyBtnClick}
        />
      )}
      <div>Detail</div>
    </>
  );
}
