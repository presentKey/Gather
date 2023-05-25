import React from 'react';
import { CgSpinner } from 'react-icons/cg';
import styles from './css/LoadingSpinner.module.css';

export default function LoadingSpinner() {
  return (
    <>
      <CgSpinner className={styles.spinner} />
    </>
  );
}
