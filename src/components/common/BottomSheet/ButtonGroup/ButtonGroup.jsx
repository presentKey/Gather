import Button from '../../Button/Button';
import styles from './ButtonGroup.module.css';

export default function ButtonGroup({ content, handleContent, buttonInfo }) {
  return (
    <div className={styles.group}>
      {buttonInfo.map((info, index) => (
        <Button key={index} content={content} onClick={handleContent} {...info} />
      ))}
    </div>
  );
}
