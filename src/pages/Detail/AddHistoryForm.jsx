import React from 'react';
import useClass from '../../components/Main/hooks/useClass';
import useInput from '../../hooks/useInput';
import getTodayDate from '../../utils/getTodayDate';
import styles from './AddHistoryForm.module.css';

export default function AddHistoryForm({ code, onClose }) {
  const [info, handleChange] = useInput({
    type: 'deposit',
    message: '',
    date: getTodayDate(),
  });
  const { isLoading, error, handleAddHistorySumbit } = useClass(code, info);

  return (
    <form
      className={styles.form}
      onSubmit={(e) => handleAddHistorySumbit(e, onClose)}
    >
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
      <div className={`${styles['text-input']} ${styles['price-group']}`}>
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
      <div className={`${styles['text-input']} ${styles['message-group']}`}>
        <label htmlFor="message">메시지</label>
        <input
          type="text"
          id="message"
          name="message"
          value={info.message ?? ''}
          onChange={handleChange}
          placeholder={'[옵션] 최대 20글자 입력 가능'}
          maxLength="20"
        />
      </div>
      <div className={`${styles['text-input']} ${styles['date-group']}`}>
        <label htmlFor="date">날짜</label>
        <input
          type="date"
          id="date"
          name="date"
          value={info.date ?? getTodayDate()}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles['btn-group']}>
        <button
          className={`${styles['register-btn']} ${error && styles['is-error']}`}
          button="submit"
          disabled={isLoading}
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
