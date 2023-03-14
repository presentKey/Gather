import React from 'react';
import { CgSpinner } from 'react-icons/cg';
import styles from './LoadingSpinner.module.css';

export default function LoadingSpinner() {
  return (
    <>
      <CgSpinner className={styles.spinner} />
    </>
  );
}
