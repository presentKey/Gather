import React from 'react';
import { useLocation } from 'react-router-dom';
import DetailHeader from './DetailHeader';
import UpdateHeader from './UpdateHeader';
import { Navigate } from 'react-router-dom';
import styles from './css/Detail.module.css';
import BottomSheet from '../../components/common/BottomSheet/BottomSheet';
import { DEPOSIT, WITHDRAW } from '../../constants/bottomSheetTag';
import SheetBody from '../../components/common/BottomSheet/SheetBody';
import HistoryList from './HistoryList';
import useDetail from './hooks/useDetail';
import useClassDetail from '../../hooks/useClassDetail';
import LoadingDetail from '../../components/common/Loading/LoadingDetail';

export default function Detail() {
  const { state } = useLocation();
  const {
    classDetailQuery: { isLoading, data: detail },
  } = useClassDetail(state?.code);
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
            <SheetBody.TransferForm
              code={code}
              histories={detail.history}
              text='입금'
              tag={DEPOSIT}
              color='red'
            />
            <SheetBody.TransferForm
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
