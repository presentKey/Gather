import React from 'react';
import AddClassToast from './AddClassToast';
import ClassCard from './ClassCard';
import styles from './Main.module.css';
import useClass from './hooks/useClass';

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
      <AddClassToast />
    </>
  );
}
