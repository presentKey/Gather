import React from 'react';
import { useLocation } from 'react-router-dom';
import DetailHeader from './DetailHeader';
import UpdateHeader from './UpdateHeader';
import { Navigate } from 'react-router-dom';
import styles from './Detail.module.css';
import useClass from '../../components/Main/hooks/useClass';
import LoadingDetail from '../../components/common/LoadingDetail/LoadingDetail';
import BottomSheet from '../../components/common/BottomSheet/BottomSheet';
import { DEPOSIT, WITHDRAW } from '../../constants/bottomSheetTag';
import Body from '../../components/common/BottomSheet/Body/Body';
import HistoryList from './HistoryList';
import useDetail from './hooks/useDetail';

export default function Detail() {
  const { state } = useLocation();
  const { useClassDetailQuery } = useClass();
  const { isLoading, data: detail } = useClassDetailQuery(state?.code);
  const { isUpdate, handleUpdateButtonClick } = useDetail();

  if (!state) return <Navigate to='/' replace />;
  if (isLoading) return <LoadingDetail />;

  const { code } = state;

  return (
    <>
      {isUpdate ? (
        <UpdateHeader code={code} detail={detail} onUpdateButtonClick={handleUpdateButtonClick} />
      ) : (
        <DetailHeader detail={detail} onUpdateButtonClick={handleUpdateButtonClick} />
      )}
      <section className={styles.detail}>
        <HistoryList histories={detail.history} code={code} members={detail.members} />
        <BottomSheet>
          <BottomSheet.Header>
            <BottomSheet.Button text='입금' type='button' tag={DEPOSIT} />
            <BottomSheet.Button text='출금' type='button' tag={WITHDRAW} />
          </BottomSheet.Header>
          <BottomSheet.Body>
            <Body.TransferForm
              code={code}
              histories={detail.history}
              text='입금'
              tag={DEPOSIT}
              color='red'
            />
            <Body.TransferForm
              code={code}
              histories={detail.history}
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
