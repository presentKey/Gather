import React from 'react';
import useCreateClass from './hooks/useCreateClass';

export default function CreateForm() {
  const { createInfo, handleChange, handleSubmit } = useCreateClass();

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="title"
            value={createInfo.title ?? ''}
            onChange={handleChange}
            required
          />
          <span>모임 이름</span>
        </div>
        <div>
          <input
            type="text"
            name="bank"
            value={createInfo.bank ?? ''}
            onChange={handleChange}
            required
          />
          <span>은행</span>
        </div>
        <div>
          <input
            type="text"
            name="number"
            value={createInfo.number ?? ''}
            onChange={handleChange}
            required
          />
          <span>계좌번호</span>
        </div>
        <button>모임 생성!</button>
      </form>
    </>
  );
}
