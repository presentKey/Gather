import styles from './ParticipationFormContent.module.css';

export default function ParticipationFormContent({ info, onChange }) {
  return (
    <div className={styles['input-box']}>
      <input type='text' name='code' value={info.code ?? ''} onChange={onChange} required />
      <span>모임 코드</span>
    </div>
  );
}
