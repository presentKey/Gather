import React from 'react';
import { useLocation } from 'react-router-dom';
import ShowHeader from './ShowHeader';
import ModificationHeader from './ModificationHeader';
import { Navigate } from 'react-router-dom';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import styles from './Detail.module.css';
import AddHistoryForm from './AddHistoryForm';
import History from './History';
import useClass from '../../components/Main/hooks/useClass';
import useClassDetail from './hooks/useClassDetail';

export default function Detail() {
  const { state } = useLocation();
  const {
    classDetailQuery: { isLoading, data: detail },
  } = useClass(state?.code);
  const {
    openAddForm,
    isModification,
    handleToggleAddForm,
    handleModifyBtnClick,
    sortHistory,
  } = useClassDetail();

  if (!state) return <Navigate to="/" replace />;
  if (isLoading) return <p>detail 로딩</p>;

  const histories = sortHistory(detail.history);
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
          {histories.map((history) => (
            <History
              key={history.id}
              code={code}
              histories={histories}
              history={history}
              members={detail.members}
            />
          ))}
        </ul>
      </section>
    </>
  );
}
