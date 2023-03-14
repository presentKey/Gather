import React from 'react';
import styles from './Overlay.module.css';

export default function Overlay({ onClose }) {
  return <div onClick={onClose} className={styles.overlay}></div>;
}
