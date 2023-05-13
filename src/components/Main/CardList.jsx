import styles from './Main.module.css';
import ClassCard from './ClassCard';
import useClass from './hooks/useClass';

export default function CardList() {
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
    </>
  );
}
