import React from 'react';
import { HiOutlineUserCircle } from 'react-icons/hi';
import styles from './css/Avatar.module.css';

export default function Avatar({ image }) {
  return (
    <div className={styles.avatar}>
      {image && (
        <img className={styles.image} referrerPolicy='no-referrer' src={image} alt='아바타' />
      )}
      {!image && <HiOutlineUserCircle className={styles['none-image']} />}
    </div>
  );
}
