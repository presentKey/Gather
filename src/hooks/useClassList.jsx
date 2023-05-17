import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import { AttendClass, createClass, getClassList, leaveClass } from '../api/firebase';

export default function useClassList() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const classListQuery = useQuery(['classList', user.uid], () => getClassList(user.uid), {
    staleTime: 1000 * 60 * 60,
  });

  const create = useMutation(({ info }) => createClass(user, info), {
    onSuccess: () => queryClient.invalidateQueries(['classList', user.uid]),
  });

  const attend = useMutation(({ info }) => AttendClass(user, info), {
    onSuccess: () => queryClient.invalidateQueries(['classList', user.uid]),
  });

  const leave = useMutation(({ code, members }) => leaveClass(code, user.uid, members), {
    onSuccess: () => queryClient.invalidateQueries(['classList', user.uid]),
  });

  const handleCreateSubmit = (e, info) => {
    e.preventDefault();
    setIsLoading(true);
    create.mutate(
      { info },
      {
        onSuccess: () => navigate('/detail'),
        onError: () => {
          setError(true);
          setTimeout(() => setError(false), 600);
        },
        onSettled: () => setIsLoading(false),
      }
    );
  };

  const handleAttendSubmit = (e, info) => {
    e.preventDefault();
    setIsLoading(true);
    attend.mutate(
      { info },
      {
        onSuccess: () => navigate('/detail'),
        onError: () => {
          setError(true);
          setTimeout(() => setError(false), 600);
        },
        onSettled: () => setIsLoading(false),
      }
    );
  };

  const handleLeaveClass = (code, members, onToggleModal) => {
    setIsLoading(true);
    leave.mutate(
      { code, members },
      {
        onSuccess: () => navigate('/'),
        onSettled: () => {
          setIsLoading(false);
          onToggleModal();
        },
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
