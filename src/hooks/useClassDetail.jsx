import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import {
  deleteHistory,
  depositOrWithdraw,
  getClassDetail,
  updateClassHeader,
} from '../api/firebase';

export default function useClassDetail(code) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { user } = useAuthContext();
  const queryClient = useQueryClient();

  const useClassDetailQuery = useQuery(
    ['classDetail', code, user.uid],
    () => getClassDetail(code),
    {
      enabled: !!code,
      staleTime: 1000 * 60 * 60,
    }
  );

  const updateHeader = useMutation(({ info }) => updateClassHeader(user.uid, code, info), {
    onSuccess: () => queryClient.invalidateQueries(['classDetail', code, user.uid]),
  });

  const addHistory = useMutation(
    ({ info, minDate, tag }) => depositOrWithdraw(code, user.uid, info, minDate, tag),
    {
      onSuccess: () => queryClient.invalidateQueries(['classDetail', code, user.uid]),
    }
  );

  const removeHistory = useMutation(({ id }) => deleteHistory(code, user.uid, id), {
    onSuccess: () => queryClient.invalidateQueries(['classDetail', code, user.uid]),
  });

  const handleUpdateHeader = (info, onUpdateButtonClick) => {
    setIsLoading(true);
    updateHeader.mutate(
      { info },
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

  const handleAddHistorySumbit = (e, info, tag, minDate, onCloseSheet) => {
    e.preventDefault();
    setIsLoading(true);
    addHistory.mutate(
      { info, minDate, tag },
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

  const handleDeleteHistory = (id, onToggleModal) => {
    setIsLoading(true);
    removeHistory.mutate(
      { id },
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
    useClassDetailQuery,
    handleAddHistorySumbit,
    handleUpdateHeader,
    handleDeleteHistory,
  };
}
