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
import { DEPOSIT, WITHDRAW } from '../../constants/formButtonText';
import Form from '../../components/common/BottomSheet/Form/Form';
import useInput from '../../hooks/useInput';
import OverlayPortal from '../../components/common/Overlay/OverlayPortal';
import Overlay from '../../components/common/Overlay/Overlay';
import MoneyFormContent from '../../components/common/BottomSheet/Form/moneyFormContent';
import getTodayDate from '../../utils/getTodayDate';

const TYPE_1 = 'deposit';
const TYPE_2 = 'withdraw';
const initialState = { [TYPE_1]: false, [TYPE_2]: false };
const buttonInfo = [
  { type: 'button', text: '입금', 'data-type': TYPE_1, color: 'red' },
  { type: 'button', text: '출금', 'data-type': TYPE_2, color: 'blue' },
];
const today = getTodayDate();

export default function Detail() {
  const { state } = useLocation();
  const {
    classDetailQuery: { isLoading, data: detail },
  } = useClass(state?.code);
  const { openAddForm, isModification, handleToggleAddForm, handleModifyBtnClick, sortedHistory } =
    useClassDetail();
  const [content, handleContent, handleClose] = useToggleContent(initialState);
  const [info, handleChange] = useInput({ message: '', date: today });
  const [headerHeight, setHeaderHeight] = useState(0);
  const [height, setHeight] = useState(0);

  if (!state) return <Navigate to='/' replace />;
  if (isLoading) return <LoadingDetail />;

  const histories = sortedHistory(detail.history);
  const lastModified = histories.find((history) => history.type === 'classModify');

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
          <Form
            code={code}
            text={DEPOSIT}
            setHeight={setHeight}
            headerHeight={headerHeight}
            content={content}
            target={TYPE_1}
            nonTarget={TYPE_2}
            info={info}
            lastModified={lastModified}
            onClose={handleClose}
          >
            <MoneyFormContent
              info={info}
              onChange={handleChange}
              lastModified={lastModified}
              today={today}
            />
          </Form>
          <Form
            code={code}
            text={WITHDRAW}
            setHeight={setHeight}
            headerHeight={headerHeight}
            content={content}
            target={TYPE_2}
            nonTarget={TYPE_1}
            info={info}
            lastModified={lastModified}
            onClose={handleClose}
          >
            <MoneyFormContent
              info={info}
              onChange={handleChange}
              lastModified={lastModified}
              today={today}
            />
          </Form>
          {(content[TYPE_1] || content[TYPE_2]) && (
            <OverlayPortal>
              <Overlay onClose={handleClose} />
            </OverlayPortal>
          )}
        </BottomSheet>
      </section>
    </>
  );
}
