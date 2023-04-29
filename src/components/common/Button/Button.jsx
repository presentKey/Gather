import styles from './Button.module.css';

const BASIC = 'basic';
const RED = 'red';
const BLUE = 'blue';

export default function Button({ text, color = BASIC, onClick, content, ...rest }) {
  const { background } = getButtonStyle(color);

  return (
    <button
      className={`${styles['button']} ${styles[background]} ${
        content[rest['data-type']] && styles['is-active']
      }`}
      onClick={onClick}
      {...rest}
    >
      {text}
    </button>
  );
}

function getButtonStyle(color) {
  switch (color) {
    case RED:
      return { background: RED };
    case BLUE:
      return { background: BLUE };
    default:
      return { background: BASIC };
  }
}
