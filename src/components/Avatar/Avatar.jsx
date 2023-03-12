import React from 'react';
import { HiOutlineUserCircle } from 'react-icons/hi';
import styles from './Avatar.module.css';

export default function Avatar({ image }) {
  return (
    <div className={styles.avatar}>
      {image && <img className={styles.image} src={image} alt="아바타" />}
      {!image && <HiOutlineUserCircle className={styles['none-image']} />}
    </div>
  );
}
