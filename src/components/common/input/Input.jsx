import styles from './Input.module.css';

export default function Input({ type, name, text, value, onChange, ...rest }) {
  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type={type}
        id={name}
        name={name}
        value={value[name] ?? ''}
        onChange={onChange}
        onWheel={(e) => e.target.blur()}
        {...rest}
      />
      <label className={styles.label} htmlFor={name}>
        {text}
      </label>
    </div>
  );
}
