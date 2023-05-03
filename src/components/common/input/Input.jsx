import styles from './Input.module.css';

export default function Input() {
  return (
    <div className={styles.container}>
      <input className={styles.input} type='text' id='input' required />
      <label className={styles.label} htmlFor='input'>
        모임코드
      </label>
    </div>
  );
}
