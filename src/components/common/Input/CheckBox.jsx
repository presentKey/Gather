import styles from './CheckBox.module.css';

export default function CheckBox({ type, name, text, onChange }) {
  return (
    <div className={styles.container}>
      <input className={styles.input} type={type} id={name} name={name} onChange={onChange} />
      <label className={styles.label} htmlFor={name}>
        {text}
      </label>
    </div>
  );
}
