import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ShowHeader from './ShowHeader';
import ModificationHeader from './ModificationHeader';
import { Navigate } from 'react-router-dom';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import styles from './Detail.module.css';
import AddHistoryForm from './AddHistoryForm';

export default function Detail() {
  const { state } = useLocation();
  const [openAddForm, setOpenAddForm] = useState(false);
  const handleToggleAddForm = () => setOpenAddForm((prev) => !prev);
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
      <section className={styles.detail}>
        <button
          className={styles['plus-btn']}
          type="button"
          onClick={handleToggleAddForm}
        >
          <HiOutlinePlusCircle />
        </button>
        {openAddForm && <AddHistoryForm onClose={handleToggleAddForm} />}
      </section>
    </>
  );
}
