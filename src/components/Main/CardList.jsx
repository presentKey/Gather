import styles from './css/CardList.module.css';
import ClassCard from './ClassCard';
import useClassList from '../../hooks/useClassList';
import EmptyList from './EmptyList';
import LoadingSpinner from '../common/LoadingSpinner/LoadingSpinner';

export default function CardList() {
  const {
    classListQuery: { isLoading, data: classes },
  } = useClassList();

  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      {classes.myClasses.length === 0 ? (
        <EmptyList />
      ) : (
        <ul className={styles['class-list']}>
          {classes.myClasses.map((myClass) => (
            <ClassCard key={myClass} code={myClass} />
          ))}
        </ul>
      )}
    </>
  );
}
