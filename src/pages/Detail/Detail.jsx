import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ShowHeader from './ShowHeader';
import ModificationHeader from './ModificationHeader';
import { Navigate } from 'react-router-dom';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import styles from './Detail.module.css';
import AddHistoryForm from './AddHistoryForm';
import History from './History';
import useClass from '../../components/Main/hooks/useClass';

export default function Detail() {
  const { state } = useLocation();
  const {
    classDetailQuery: { isLoading, data: detail },
  } = useClass(state?.code);
  const [openAddForm, setOpenAddForm] = useState(false);
  const handleToggleAddForm = () => setOpenAddForm((prev) => !prev);
  const [isModification, setIsModification] = useState(false);
  const handleModifyBtnClick = () => setIsModification(!isModification);

  if (!state) return <Navigate to="/" replace />;
  if (isLoading) return <p>detail 로딩</p>;

  const sortedHistories = detail.history.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const { code } = state;

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
        {openAddForm && (
          <AddHistoryForm code={code} onClose={handleToggleAddForm} />
        )}

        <ul>
          {sortedHistories.map((history) => (
            <History
              key={history.id}
              code={code}
              histories={sortedHistories}
              history={history}
              members={detail.members}
            />
          ))}
        </ul>
      </section>
    </>
  );
}
