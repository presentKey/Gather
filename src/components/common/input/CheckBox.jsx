import styles from './CheckBox.module.css';

export default function CheckBox({ type, name, text, onChange, color, ...rest }) {
  return (
    <div className={`${styles.container} ${color && styles[getColorStyle(color)]}`}>
      <input
        className={styles.input}
        type={type}
        id={name}
        name={name}
        onChange={onChange}
        {...rest}
      />
      <label className={`${styles.label} ${color && styles[getColorStyle(color)]}`} htmlFor={name}>
        {text}
      </label>
    </div>
  );
}

function getColorStyle(color) {
  if (color === 'black') return 'black';
  else return;
}
