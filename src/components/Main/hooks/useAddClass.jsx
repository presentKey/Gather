import { useState } from 'react';
import { useAuthContext } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { createClass, participationClass } from '../../../api/firebase';

export default function useAddClass() {
  const [info, setInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    createClass(user, info).then(() => navigate('/class'));
  };

  const handleParticipationSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    participationClass(user, info)
      .then(() => navigate('/class'))
      .catch(() => {
        setError(true);
        setIsLoading(false);
        setTimeout(() => {
          setError(false);
        }, 600);
      });
  };

  return {
    info,
    isLoading,
    error,
    handleChange,
    handleCreateSubmit,
    handleParticipationSubmit,
  };
}
