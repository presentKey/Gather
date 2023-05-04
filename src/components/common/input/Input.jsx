import styles from './Input.module.css';

export default function Input({ type, name, text }) {
  return (
    <div className={styles.container}>
      <input className={styles.input} type={type} id={name} required />
      <label className={styles.label} htmlFor={name}>
        {text}
      </label>
    </div>
  );
}
