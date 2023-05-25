import styles from './css/Input.module.css';

export default function Input({ type, name, text, value, onChange, width, size, ...rest }) {
  return (
    <div className={`${styles.container} ${width && styles[getContainerWidth(width)]}`}>
      <input
        className={`${styles.input} ${size && styles[getSize(size)]}`}
        type={type}
        id={name}
        name={name}
        value={value[name] ?? ''}
        onChange={onChange}
        onWheel={(e) => e.target.blur()}
        {...rest}
      />
      <label className={`${styles.label} ${size && styles[getSize(size)]}`} htmlFor={name}>
        {text}
      </label>
    </div>
  );
}

function getContainerWidth(width) {
  if (width === 'short') return 'short';
  else if (width === 'long') return 'long';
}

function getSize(size) {
  if (size === 'small') return 'small';
}
