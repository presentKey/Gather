import { useState } from 'react';
import { useAuthContext } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  createClass,
  deleteHistory,
  depositOrWithdraw,
  getClassDetail,
  getClassList,
  leaveClass,
  participationClass,
  updateClassHeader,
} from '../../../api/firebase';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export default function useClass() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const create = useMutation(({ info }) => createClass(user, info), {
    onSuccess: () => queryClient.invalidateQueries(['classList', user.uid]),
  });

  const participation = useMutation(({ info }) => participationClass(user, info), {
    onSuccess: () => queryClient.invalidateQueries(['classList', user.uid]),
  });

  const updateHeader = useMutation(({ code, info }) => updateClassHeader(user.uid, code, info), {
    onSuccess: (code) => queryClient.invalidateQueries(['classDetail', code, user.uid]),
  });

  const leave = useMutation(({ code, members }) => leaveClass(code, user, members), {
    onSuccess: () => queryClient.invalidateQueries(['classList', user.uid]),
  });

  const addHistory = useMutation(
    ({ code, info, minDate, tag }) => depositOrWithdraw(code, user, info, minDate, tag),
    {
      onSuccess: (code) => queryClient.invalidateQueries(['classDetail', code, user.uid]),
    }
  );

  const removeHistory = useMutation(({ code, id }) => deleteHistory(code, user, id), {
    onSuccess: (code) => queryClient.invalidateQueries(['classDetail', code, user.uid]),
  });

  const classListQuery = useQuery(['classList', user.uid], () => getClassList(user.uid), {
    staleTime: 1000 * 60 * 60,
  });

  const useClassDetailQuery = (code) =>
    useQuery(['classDetail', code, user.uid], () => getClassDetail(code), {
      enabled: !!code,
      staleTime: 1000 * 60 * 60,
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

  const handleParticipationSubmit = (e, info) => {
    e.preventDefault();
    setIsLoading(true);
    participation.mutate(
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

  const handleAddHistorySumbit = (e, info, tag, code, minDate, onCloseSheet) => {
    e.preventDefault();
    setIsLoading(true);
    addHistory.mutate(
      { code, info, minDate, tag },
      {
        onSuccess: () => onCloseSheet(),
        onError: () => {
          setError(true);
          setTimeout(() => setError(false), 600);
        },
        onSettled: () => setIsLoading(false),
      }
    );
  };

  const handleUpdateHeader = (code, info, onUpdateButtonClick) => {
    setIsLoading(true);
    updateHeader.mutate(
      { code, info },
      {
        onSuccess: () => onUpdateButtonClick(),
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

  const handleDeleteHistory = (code, id, onToggleModal) => {
    setIsLoading(true);
    removeHistory.mutate(
      { code, id },
      {
        onSuccess: () => onToggleModal(),
        onError: () => {
          setError(true);
          setTimeout(() => setError(false), 600);
        },
        onSettled: () => setIsLoading(false),
      }
    );
  };

  return {
    user,
    isLoading,
    error,
    classListQuery,
    useClassDetailQuery,
    handleCreateSubmit,
    handleParticipationSubmit,
    handleAddHistorySumbit,
    handleUpdateHeader,
    handleLeaveClass,
    handleDeleteHistory,
  };
}
