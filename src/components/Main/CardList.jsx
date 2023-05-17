import styles from './Main.module.css';
import ClassCard from './ClassCard';
import useClassList from '../../hooks/useClassList';

export default function CardList() {
  const {
    classListQuery: { data: classes },
  } = useClassList();

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
