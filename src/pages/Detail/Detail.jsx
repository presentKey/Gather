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
import { DEPOSIT, WITHDRAW } from '../../constants/bottomSheetTag';
import Body from '../../components/common/BottomSheet/Body/Body';

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
            <BottomSheet.Button text='입금' type='button' tag={DEPOSIT} />
            <BottomSheet.Button text='출금' type='button' tag={WITHDRAW} />
          </BottomSheet.Header>
          <BottomSheet.Body>
            <Body.TransferForm
              code={code}
              histories={histories}
              text='입금'
              tag={DEPOSIT}
              color='red'
            />
            <Body.TransferForm
              code={code}
              histories={histories}
              text='출금'
              tag={WITHDRAW}
              color='blue'
            />
          </BottomSheet.Body>
        </BottomSheet>
      </section>
    </>
  );
}
