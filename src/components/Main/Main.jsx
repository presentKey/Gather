import React from 'react';
import ClassCard from './ClassCard';
import styles from './Main.module.css';
import useClass from './hooks/useClass';
import BottomSheet from '../common/BottomSheet/BottomSheet';

export default function Main() {
  const {
    classListQuery: { data: classes },
  } = useClass();

  return (
    <>
      {classes && (
        <ul className={styles['class-list']}>
          {classes.myClasses.map((myClass) => (
            <ClassCard key={myClass} code={myClass} />
          ))}
        </ul>
      )}
      <BottomSheet>
        <BottomSheet.Header>
          <BottomSheet.Button />
          <BottomSheet.Button />
        </BottomSheet.Header>
        <BottomSheet.Form>
          <BottomSheet.Input />
          <BottomSheet.Input />
          <BottomSheet.Button />
        </BottomSheet.Form>
      </BottomSheet>
    </>
  );
}
