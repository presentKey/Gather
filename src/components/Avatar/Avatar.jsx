import React from 'react';
import { MdFace } from 'react-icons/md';
import styles from './Avatar.module.css';

export default function Avatar({ image }) {
  return (
    <div className={styles.avatar}>
      {image && <img className={styles.image} src={image} alt="아바타" />}
      {!image && <MdFace className={styles['none-image']} />}
    </div>
  );
}
