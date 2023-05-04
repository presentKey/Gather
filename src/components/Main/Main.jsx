import React from 'react';
import ClassCard from './ClassCard';
import styles from './Main.module.css';
import useClass from './hooks/useClass';
import BottomSheet from '../common/BottomSheet/BottomSheet';
import Body from '../common/BottomSheet/Body/Body';

const CREATE = 'create';
const ATTEND = 'attend';

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
      <BottomSheet types={[CREATE, ATTEND]}>
        <BottomSheet.Header>
          <BottomSheet.Button text={'모임 만들기'} type={CREATE} />
          <BottomSheet.Button text={'모임 참여하기'} type={ATTEND} />
        </BottomSheet.Header>
        <BottomSheet.Body>
          <Body.ClassCreateForm type={CREATE} />
          <Body.ClassAttendForm type={ATTEND} />
        </BottomSheet.Body>
      </BottomSheet>
    </>
  );
}
