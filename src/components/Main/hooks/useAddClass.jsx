import { useState } from 'react';
import { useAuthContext } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { createClass, participationClass } from '../../../api/firebase';

export default function useAddClass() {
  const [info, setInfo] = useState({});
  const [error, setError] = useState(false);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    createClass(user, info).then(() => navigate('/class'));
  };

  const handleParticipationSubmit = (e) => {
    e.preventDefault();
    participationClass(user, info)
      .then(() => navigate('/class'))
      .catch(() => {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 600);
      });
  };

  return {
    info,
    error,
    handleChange,
    handleCreateSubmit,
    handleParticipationSubmit,
  };
}
