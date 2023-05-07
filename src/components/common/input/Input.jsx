import styles from './Input.module.css';

export default function Input({ type, name, text, value, onChange }) {
  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type={type}
        id={name}
        name={name}
        value={value[name] ?? ''}
        onChange={onChange}
        required
      />
      <label className={styles.label} htmlFor={name}>
        {text}
      </label>
    </div>
  );
}
