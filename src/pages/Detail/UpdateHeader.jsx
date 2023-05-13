import React from 'react';
import styles from './UpdateHeader.module.css';
import { IoMdBook } from 'react-icons/io';
import { CiCoinInsert } from 'react-icons/ci';
import SettingMenu from './SettingMenu';
import useInput from '../../hooks/useInput';
import useClass from '../../components/Main/hooks/useClass';
import Input from '../../components/common/Input/Input';
import CheckBox from '../../components/common/Input/CheckBox';

export default function UpdateHeader({
  code,
  detail: { title, account, total, allowAnonymouse },
  onUpdateButtonClick,
}) {
  const { bank, number } = account;
  const [info, handleChange] = useInput({ title, bank, number, total, allowAnonymouse });
  const { isLoading, error, handleUpdateHeader } = useClass(code, info);

  return (
    <>
      <Input
        type='text'
        name='title'
        text='모임이름'
        value={info}
        onChange={handleChange}
        width='long'
        size='small'
      />
      <div className={styles.container}>
        <IoMdBook className={styles['bank-icon']} />
        <Input
          type='text'
          name='bank'
          text='은행'
          value={info}
          onChange={handleChange}
          width='short'
          size='small'
        />
        <Input
          type='number'
          name='number'
          text='계좌번호'
          value={info}
          onChange={handleChange}
          width='long'
          size='small'
        />
      </div>
      <div className={styles.container}>
        <CiCoinInsert className={styles['money-icon']} />
        <Input
          type='number'
          name='total'
          text='총 금액'
          value={info}
          onChange={handleChange}
          width='long'
          size='small'
        />
      </div>
      <CheckBox
        type='checkbox'
        name='allowAnonymouse'
        text='모임 구성원으로 게스트 유저 허용'
        onChange={handleChange}
        checked={info.allowAnonymouse}
        color='black'
        size='small'
      />

      <SettingMenu onUpdateButtonClick={onUpdateButtonClick} />
      <button
        className={`${styles['update-btn']} ${error && styles['is-error']}`}
        type='button'
        disabled={isLoading}
        onClick={() => handleUpdateHeader(onUpdateButtonClick)}
      >
        수정하기
      </button>
      <button className={styles['cancel-btn']} type='button' onClick={onUpdateButtonClick}>
        취소
      </button>
    </>
  );
}
