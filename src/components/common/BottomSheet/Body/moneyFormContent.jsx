import styles from './moneyFormContent.module.css';

export default function MoneyFormContent({ info, onChange, lastModified, today }) {
  return (
    <>
      <div className={`${styles['text-input']} ${styles['price-group']}`}>
        <label htmlFor='price'>금액</label>
        <input
          type='number'
          id='price'
          name='price'
          value={info.price ?? ''}
          onChange={onChange}
          required
        />
      </div>
      <div className={`${styles['text-input']} ${styles['message-group']}`}>
        <label htmlFor='message'>메시지</label>
        <input
          type='text'
          id='message'
          name='message'
          value={info.message ?? ''}
          onChange={onChange}
          placeholder='[옵션] 최대 20글자 입력 가능'
          maxLength='20'
        />
      </div>
      <div className={`${styles['text-input']} ${styles['date-group']}`}>
        <label htmlFor='date'>날짜</label>
        <input
          type='date'
          id='date'
          name='date'
          min={lastModified?.date}
          value={info.date ?? today}
          onChange={onChange}
          required
        />
      </div>
    </>
  );
}
