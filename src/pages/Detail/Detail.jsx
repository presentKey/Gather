import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ShowHeader from './ShowHeader';
import ModificationHeader from './ModificationHeader';
import { Navigate } from 'react-router-dom';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import useInput from '../../hooks/useInput';
import styles from './Detail.module.css';

export default function Detail() {
  const { state } = useLocation();
  const [info, handleChange] = useInput({ type: 'deposit' });
  const [isModification, setIsModification] = useState(false);
  const handleModifyBtnClick = () => setIsModification(!isModification);

  if (!state) return <Navigate to="/" replace />;

  const { code, detail } = state;

  return (
    <>
      {!isModification && (
        <ShowHeader
          headerInfo={detail}
          onModifyBtnClick={handleModifyBtnClick}
        />
      )}
      {isModification && (
        <ModificationHeader
          code={code}
          headerInfo={detail}
          onModifyBtnClick={handleModifyBtnClick}
        />
      )}
      <section className={styles.detail}>
        <button className={styles['plus-btn']} type="button">
          <HiOutlinePlusCircle />
        </button>
        <form className={styles.form}>
          <div className={styles['radio-group']}>
            <input
              type="radio"
              id="deposit"
              name="type"
              value="deposit"
              onChange={handleChange}
              checked={info.type === 'deposit'}
            />
            <label htmlFor="deposit">입금</label>
            <input
              type="radio"
              id="withdraw"
              name="type"
              value="withdraw"
              onChange={handleChange}
              checked={info.type === 'withdraw'}
            />
            <label htmlFor="withdraw">출금</label>
          </div>
          <div className={styles['price-group']}>
            <label htmlFor="price">금액</label>
            <input
              type="text"
              id="price"
              name="price"
              value={info.price ?? ''}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles['date-group']}>
            <label htmlFor="date">날짜</label>
            <input type="date" required />
          </div>
          <div className={styles['btn-group']}>
            <button className={styles['register-btn']} type="button">
              등록
            </button>
            <button className={styles['cancel-btn']} type="button">
              취소
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
