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
import useClassDetail from './hooks/useClassDetail';
import LoadingDetail from '../../components/common/LoadingDetail/LoadingDetail';
import ModifyHistory from './ModifyHistory';
import BottomSheet from '../../components/common/BottomSheet/BottomSheet';
import useToggleContent from '../../components/Main/hooks/useToggleContent';
import CreateForm from '../../components/Main/CreateForm';
import ParticipationForm from '../../components/Main/ParticipationForm';

const initialState = { create: false, participation: false };
const buttonInfo = [
  { type: 'button', text: '모임 만들기', 'data-type': 'create' },
  { type: 'button', text: '모임 참여하기', 'data-type': 'participation' },
];

export default function Detail() {
  const { state } = useLocation();
  const {
    classDetailQuery: { isLoading, data: detail },
  } = useClass(state?.code);
  const { openAddForm, isModification, handleToggleAddForm, handleModifyBtnClick, sortedHistory } =
    useClassDetail();
  const [content, handleContent, handleClose] = useToggleContent(initialState);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [height, setHeight] = useState(0);

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
        <button className={styles['plus-btn']} type='button' onClick={handleToggleAddForm}>
          <HiOutlinePlusCircle />
        </button>
        {openAddForm && (
          <AddHistoryForm code={code} histories={histories} onClose={handleToggleAddForm} />
        )}

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
        <BottomSheet
          content={content}
          handleContent={handleContent}
          onClose={handleClose}
          buttonInfo={buttonInfo}
          height={height}
          setHeaderHeight={setHeaderHeight}
        >
          <CreateForm setHeight={setHeight} headerHeight={headerHeight} content={content} />
          <ParticipationForm setHeight={setHeight} headerHeight={headerHeight} content={content} />
        </BottomSheet>
      </section>
    </>
  );
}
