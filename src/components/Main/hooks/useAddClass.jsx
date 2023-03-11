import { useState } from 'react';
import { useAuthContext } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { createClass } from '../../../api/firebase';

export default function useAddClass() {
  const [info, setInfo] = useState({});
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    createClass(user.uid, info).then(() => navigate('/class'));
  };

  return { info, handleChange, handleCreateSubmit };
}
