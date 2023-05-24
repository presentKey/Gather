import styles from './EmptyList.module.css';

export default function EmptyList() {
  return (
    <div className={styles.empty}>
      <p>
        모임이 존재하지 않습니다.
        <br />
        Gather로 돈을 관리해보세요!
      </p>
    </div>
  );
}
