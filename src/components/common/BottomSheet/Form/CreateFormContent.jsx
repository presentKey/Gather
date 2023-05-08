import styles from './CreateFormContent.module.css';

export default function CreateFormContent({ info, onChange }) {
  return (
    <>
      <div className={styles['set-group']}>
        <input
          className={styles['set-anonymouse']}
          type='checkbox'
          name='allowAnonymouse'
          id='allowAnonymouse'
          onChange={onChange}
        />
        <label htmlFor='allowAnonymouse'>모임 구성원으로 게스트 유저 허용</label>
      </div>
      <div className={styles['input-box']}>
        <input type='text' name='title' value={info.title ?? ''} onChange={onChange} required />
        <span>모임 이름</span>
      </div>
      <div className={styles['input-box']}>
        <input type='text' name='bank' value={info.bank ?? ''} onChange={onChange} required />
        <span>은행</span>
      </div>
      <div className={styles['input-box']}>
        <input type='number' name='number' value={info.number ?? ''} onChange={onChange} required />
        <span>계좌번호</span>
      </div>
    </>
  );
}
