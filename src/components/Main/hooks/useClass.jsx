import { useState } from 'react';
import { useAuthContext } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  createClass,
  getClassDetail,
  getClassList,
  participationClass,
} from '../../../api/firebase';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export default function useClass(code, info) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const create = useMutation(({ user, info }) => createClass(user, info), {
    onSuccess: () => queryClient.invalidateQueries(['myClasses', user.uid]),
  });

  const participation = useMutation(
    ({ user, info }) => participationClass(user, info),
    {
      onSuccess: () => queryClient.invalidateQueries(['myClasses', user.uid]),
    }
  );

  const classListQuery = useQuery(
    ['myClasses', user.uid],
    () => getClassList(user.uid),
    {
      staleTime: 1000 * 60 * 60,
    }
  );

  const classDetailQuery = useQuery(
    ['myClass', code],
    () => getClassDetail(code),
    {
      enabled: !!code,
      staleTime: 1000 * 60 * 60,
    }
  );

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    create.mutate(
      { user, info },
      {
        onSuccess: () => navigate('/class'),
        onError: () => {
          setError(true);
          setTimeout(() => {
            setError(false);
          }, 600);
        },
        onSettled: () => setIsLoading(false),
      }
    );
  };

  const handleParticipationSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    participation.mutate(
      { user, info },
      {
        onSuccess: () => navigate('/class'),
        onError: () => {
          setError(true);
          setTimeout(() => {
            setError(false);
          }, 600);
        },
        onSettled: () => setIsLoading(false),
      }
    );
  };

  return {
    isLoading,
    error,
    classListQuery,
    classDetailQuery,
    handleCreateSubmit,
    handleParticipationSubmit,
  };
}
