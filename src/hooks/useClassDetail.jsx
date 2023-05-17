import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import {
  deleteHistory,
  depositOrWithdraw,
  getClassDetail,
  updateClassHeader,
} from '../api/firebase';
import useMutationClass from './useMutationClass';

export default function useClassDetail(code) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { user } = useAuthContext();
  const queryClient = useQueryClient();

  const QUERY_KEY = ['classDetail', code, user.uid];

  const classDetailQuery = useQuery(QUERY_KEY, () => getClassDetail(code), {
    enabled: !!code,
    staleTime: 1000 * 60 * 60,
  });

  const updateHeader = useMutationClass(setIsLoading, setError, {
    mutationFn: ({ info }) => updateClassHeader(user.uid, code, info),
    onSuccess: () => queryClient.invalidateQueries(QUERY_KEY),
  });

  const addHistory = useMutationClass(setIsLoading, setError, {
    mutationFn: ({ info, minDate, tag }) => depositOrWithdraw(code, user.uid, info, minDate, tag),
    onSuccess: () => queryClient.invalidateQueries(QUERY_KEY),
  });

  const removeHistory = useMutationClass(setIsLoading, setError, {
    mutationFn: ({ id }) => deleteHistory(code, user.uid, id),
    onSuccess: () => queryClient.invalidateQueries(QUERY_KEY),
  });

  const handleUpdateHeader = (info, onUpdateButtonClick) => {
    updateHeader.mutate(
      { info },
      {
        onSuccess: () => onUpdateButtonClick(),
      }
    );
  };

  const handleAddHistorySumbit = (e, info, tag, minDate, onCloseSheet) => {
    e.preventDefault();
    addHistory.mutate(
      { info, minDate, tag },
      {
        onSuccess: () => onCloseSheet(),
      }
    );
  };

  const handleDeleteHistory = (id, onToggleModal) => {
    removeHistory.mutate(
      { id },
      {
        onSuccess: () => onToggleModal(),
      }
    );
  };

  return {
    user,
    isLoading,
    error,
    classDetailQuery,
    handleAddHistorySumbit,
    handleUpdateHeader,
    handleDeleteHistory,
  };
}
