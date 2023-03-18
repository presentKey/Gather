import React from 'react';
import { deposit } from '../../api/firebase';
import { useAuthContext } from '../../context/AuthContext';
import useInput from '../../hooks/useInput';
import styles from './AddHistoryForm.module.css';

export default function AddHistoryForm({ code, onClose }) {
  const [info, handleChange] = useInput({ type: 'deposit' });
  const { user } = useAuthContext();
  const handleDeposit = () => {
    deposit(code, user, info);
  };

  const handleSumbit = (e) => {
    e.preventDefault();
  };

  return (
    <form className={styles.form} onSubmit={handleSumbit}>
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
          type="number"
          id="price"
          name="price"
          value={info.price ?? ''}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles['date-group']}>
        <label htmlFor="date">날짜</label>
        <input
          type="date"
          id="date"
          name="date"
          value={info.date ?? ''}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles['btn-group']}>
        <button
          className={styles['register-btn']}
          button="submit"
          onClick={handleDeposit}
        >
          등록
        </button>
        <button
          className={styles['cancel-btn']}
          type="button"
          onClick={onClose}
        >
          취소
        </button>
      </div>
    </form>
  );
}
