import React from 'react';
import ClassCard from './ClassCard';
import styles from './Main.module.css';
import useClass from './hooks/useClass';
import BottomSheet from '../common/BottomSheet/BottomSheet';
import Body from '../common/BottomSheet/Body/Body';
import { ATTEND, CREATE } from '../../constants/bottomSheetTag';

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
          <BottomSheet.Button text='모임 만들기' type='button' tag={CREATE} />
          <BottomSheet.Button text='모임 참여하기' type='button' tag={ATTEND} />
        </BottomSheet.Header>
        <BottomSheet.Body>
          <Body.ClassCreate tag={CREATE} />
          <Body.ClassAttend tag={ATTEND} />
        </BottomSheet.Body>
      </BottomSheet>
    </>
  );
}
