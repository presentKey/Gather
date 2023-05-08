import styles from './ParticipationFormContent.module.css';

export default function ParticipationFormContent({ info, onChange }) {
  return (
    <>
      <p className={styles.info}>모임 구성원에게 코드 공유를 요청하세요!</p>
      <div className={styles['input-box']}>
        <input type='text' name='code' value={info.code ?? ''} onChange={onChange} required />
        <span>모임 코드</span>
      </div>
    </>
  );
}
