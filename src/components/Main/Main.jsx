import React, { useState } from 'react';
import ClassCard from './ClassCard';
import styles from './Main.module.css';
import useClass from './hooks/useClass';
import BottomSheet from '../common/BottomSheet/BottomSheet';
import useToggleContent from './hooks/useToggleContent';
import CreateForm from './CreateForm';
import ParticipationForm from './ParticipationForm';

const initialState = { create: false, participation: false };
const buttonInfo = [
  { type: 'button', text: '모임 만들기', 'data-type': 'create' },
  { type: 'button', text: '모임 참여하기', 'data-type': 'participation' },
];

export default function Main() {
  const {
    classListQuery: { data: classes },
  } = useClass();
  const [content, handleContent, handleClose] = useToggleContent(initialState);
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
        <CreateForm setHeight={setHeight} headerHeight={headerHeight} content={content} />
        <ParticipationForm setHeight={setHeight} headerHeight={headerHeight} content={content} />
      </BottomSheet>
    </>
  );
}
