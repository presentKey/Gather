import { createContext, useContext, useState } from 'react';

const BottomSheetContext = createContext();

export function BottomSheetProvider({ children, types }) {
  const [toggle, setToggle] = useState(null);
  const handleToggle = (target) => setToggle(target);

  console.log(`toggle ${toggle}`);
  return (
    <BottomSheetContext.Provider value={{ toggle, handleToggle }}>
      {children}
    </BottomSheetContext.Provider>
  );
}

export function useBottomSheet() {
  return useContext(BottomSheetContext);
}
