import { createContext, useContext, useState } from 'react';

const BottomSheetContext = createContext();

export function BottomSheetProvider({ children }) {
  const [toggle, setToggle] = useState(null);
  const handleToggle = (distinct) => setToggle(distinct);
  const closeSheet = () => setToggle(null);

  return (
    <BottomSheetContext.Provider value={{ toggle, handleToggle, closeSheet }}>
      {children}
    </BottomSheetContext.Provider>
  );
}

export function useBottomSheet() {
  return useContext(BottomSheetContext);
}
