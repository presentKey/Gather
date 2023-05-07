import { createContext, useContext, useState } from 'react';

const BottomSheetContext = createContext();

export function BottomSheetProvider({ children }) {
  const [toggle, setToggle] = useState(null);
  const handleToggle = (distinct) => setToggle(distinct);

  return (
    <BottomSheetContext.Provider value={{ toggle, handleToggle }}>
      {children}
    </BottomSheetContext.Provider>
  );
}

export function useBottomSheet() {
  return useContext(BottomSheetContext);
}
