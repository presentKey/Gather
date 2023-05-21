import styles from './CheckBox.module.css';

export default function CheckBox({ type, name, text, onChange, color, size, ...rest }) {
  return (
    <div className={`${styles.container} ${color && styles[getColorStyle(color)]}`}>
      <input
        className={`${styles.input} ${size && styles[getSize(size)]}`}
        type={type}
        id={name}
        name={name}
        onChange={onChange}
        {...rest}
      />
      <label
        className={`${styles.label} ${color && styles[getColorStyle(color)]} ${
          size && styles[getSize(size)]
        }`}
        htmlFor={name}
      >
        {text}
      </label>
    </div>
  );
}

function getColorStyle(color) {
  if (color === 'black') return 'black';
}

function getSize(size) {
  if (size === 'small') return 'small';
}
