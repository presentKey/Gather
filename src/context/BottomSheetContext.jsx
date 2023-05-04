import { createContext, useContext, useState } from 'react';

const BottomSheetContext = createContext();

export function BottomSheetProvider({ children }) {
  const [toggle, setToggle] = useState(null);

  return (
    <BottomSheetContext.Provider value={{ toggle, setToggle }}>
      {children}
    </BottomSheetContext.Provider>
  );
}

export function useBottomSheet() {
  return useContext(BottomSheetContext);
}
