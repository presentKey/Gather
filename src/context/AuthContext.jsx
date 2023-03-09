import { createContext, useContext, useEffect, useState } from 'react';
import {
  googleLogin,
  anonymouseLogin,
  onUserStateChange,
} from '../api/firebase';

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    onUserStateChange(setUser);
  }, []);

  return (
    <AuthContext.Provider value={{ user, googleLogin, anonymouseLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
