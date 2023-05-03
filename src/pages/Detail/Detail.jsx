import React from 'react';
import { useLocation } from 'react-router-dom';
import ShowHeader from './ShowHeader';
import ModificationHeader from './ModificationHeader';
import { Navigate } from 'react-router-dom';
import styles from './Detail.module.css';
import History from './History';
import useClass from '../../components/Main/hooks/useClass';
import useClassDetail from './hooks/useClassDetail';
import LoadingDetail from '../../components/common/LoadingDetail/LoadingDetail';
import ModifyHistory from './ModifyHistory';
import BottomSheet from '../../components/common/BottomSheet/BottomSheet';

export default function Detail() {
  const { state } = useLocation();
  const {
    classDetailQuery: { isLoading, data: detail },
  } = useClass(state?.code);
  const { isModification, handleModifyBtnClick, sortedHistory } = useClassDetail();

  if (!state) return <Navigate to='/' replace />;
  if (isLoading) return <LoadingDetail />;

  const histories = sortedHistory(detail.history);
  const { code } = state;

  return (
    <>
      {!isModification && (
        <ShowHeader headerInfo={detail} onModifyBtnClick={handleModifyBtnClick} />
      )}
      {isModification && (
        <ModificationHeader
          code={code}
          headerInfo={detail}
          onModifyBtnClick={handleModifyBtnClick}
        />
      )}
      <section className={styles.detail}>
        <ul>
          {histories.map((history) => {
            switch (history.type) {
              case 'classModify':
                return (
                  <ModifyHistory
                    key={history.id}
                    code={code}
                    histories={histories}
                    history={history}
                    members={detail.members}
                  />
                );
              default:
                return (
                  <History
                    key={history.id}
                    code={code}
                    histories={histories}
                    history={history}
                    members={detail.members}
                  />
                );
            }
          })}
        </ul>
        <BottomSheet>
          <BottomSheet.Header>
            <BottomSheet.Button />
            <BottomSheet.Button />
          </BottomSheet.Header>
          <BottomSheet.Form>
            <BottomSheet.Input />
            <BottomSheet.Button />
          </BottomSheet.Form>
        </BottomSheet>
      </section>
    </>
  );
}
