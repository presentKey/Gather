import React, { useState } from 'react';
import ClassCard from './ClassCard';
import styles from './Main.module.css';
import useClass from './hooks/useClass';
import BottomSheet from '../common/BottomSheet/BottomSheet';
import useToggleContent from './hooks/useToggleContent';
import Form from '../common/BottomSheet/Form/Form';
import useInput from '../../hooks/useInput';
import ParticipationFormContent from '../common/BottomSheet/Form/ParticipationFormContent';
import CreateFormContent from '../common/BottomSheet/Form/CreateFormContent';

const TYPE_1 = 'create';
const TYPE_2 = 'participation';
const initialState = { [TYPE_1]: false, [TYPE_2]: false };
const buttonInfo = [
  { type: 'button', text: '모임 만들기', 'data-type': TYPE_1 },
  { type: 'button', text: '모임 참여하기', 'data-type': TYPE_2 },
];

export default function Main() {
  const {
    classListQuery: { data: classes },
  } = useClass();
  const [content, handleContent, handleClose] = useToggleContent(initialState);
  const [info, handleChange] = useInput();
  const [headerHeight, setHeaderHeight] = useState(0);
  const [height, setHeight] = useState(0);

  return (
    <>
      {classes && (
        <ul className={styles['class-list']}>
          {classes.myClasses.map((myClass) => (
            <ClassCard key={myClass} code={myClass} />
          ))}
        </ul>
      )}

      <BottomSheet
        content={content}
        handleContent={handleContent}
        onClose={handleClose}
        buttonInfo={buttonInfo}
        height={height}
        setHeaderHeight={setHeaderHeight}
      >
        <Form
          text={'모임 생성!'}
          setHeight={setHeight}
          headerHeight={headerHeight}
          content={content}
          target={TYPE_1}
          nonTarget={TYPE_2}
          info={info}
        >
          <CreateFormContent info={info} onChange={handleChange} />
        </Form>
        <Form
          text={'모임 참여!'}
          setHeight={setHeight}
          headerHeight={headerHeight}
          content={content}
          target={TYPE_2}
          nonTarget={TYPE_1}
          info={info}
        >
          <ParticipationFormContent info={info} onChange={handleChange} />
        </Form>
      </BottomSheet>
    </>
  );
}
