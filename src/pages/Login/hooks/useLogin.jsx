import { useState } from 'react';
import { useAuthContext } from '../../../context/AuthContext';

export default function useLogin() {
  const [isLoading, setIsLoding] = useState(false);
  const { user, googleLogin, anonymouseLogin } = useAuthContext();

  const handleGoogleLogin = () => {
    setIsLoding(true);
    googleLogin();
    setTimeout(() => setIsLoding(false), 3000);
  };

  const handleAnonymouseLogin = () => {
    setIsLoding(true);
    anonymouseLogin();
    setTimeout(() => setIsLoding(false), 7000);
  };

  return { isLoading, user, handleGoogleLogin, handleAnonymouseLogin };
}
