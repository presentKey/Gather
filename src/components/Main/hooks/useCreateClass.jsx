import { useState } from 'react';
import { useAuthContext } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { createClass } from '../../../api/firebase';

export default function useCreateClass() {
  const [createInfo, setCreateInfo] = useState({});
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreateInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createClass(user.uid, createInfo).then(() => navigate('/class'));
  };

  return { createInfo, handleChange, handleSubmit };
}
