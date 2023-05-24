import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import { AttendClass, createClass, getClassList, leaveClass } from '../api/firebase';
import useMutationClass from './useMutationClass';

export default function useClassList() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ state: false, message: '' });
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const QUERY_KEY = ['classList', user.uid];

  const classListQuery = useQuery(QUERY_KEY, () => getClassList(user.uid), {
    staleTime: 1000 * 60 * 60,
  });

  const create = useMutationClass(setIsLoading, setError, {
    mutationFn: ({ info }) => createClass(user, info),
    onSuccess: () => queryClient.invalidateQueries(QUERY_KEY),
  });

  const attend = useMutationClass(setIsLoading, setError, {
    mutationFn: ({ info }) => AttendClass(user, info),
    onSuccess: () => queryClient.invalidateQueries(QUERY_KEY),
  });

  const leave = useMutationClass(setIsLoading, setError, {
    mutationFn: ({ code, members }) => leaveClass(code, user.uid, members),
    onSuccess: () => queryClient.invalidateQueries(QUERY_KEY),
  });

  const handleCreateSubmit = (e, info) => {
    e.preventDefault();
    create.mutate(
      { info },
      {
        onSuccess: () => navigate('/detail'),
      }
    );
  };

  const handleAttendSubmit = (e, info) => {
    e.preventDefault();
    attend.mutate(
      { info },
      {
        onSuccess: () => navigate('/detail'),
      }
    );
  };

  const handleLeaveClass = (code, members, onToggleModal) => {
    setIsLoading(true);
    leave.mutate(
      { code, members },
      {
        onSuccess: () => navigate('/'),
        onSettled: () => onToggleModal(),
      }
    );
  };

  return {
    user,
    isLoading,
    error,
    classListQuery,
    handleCreateSubmit,
    handleAttendSubmit,
    handleLeaveClass,
  };
}
