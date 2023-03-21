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

  const updateHeader = useMutation(
    ({ code, info }) => updateClassHeader(code, info),
    {
      onSuccess: () =>
        queryClient.invalidateQueries(['myClass', code, user.uid]),
    }
  );

  const leave = useMutation(
    ({ code, user, members }) => leaveClass(code, user, members),
    {
      onSuccess: () => queryClient.invalidateQueries(['myClasses', user.uid]),
    }
  );

  const addHistory = useMutation(
    ({ code, user, info }) => depositOrWithdraw(code, user, info),
    {
      onSuccess: () =>
        queryClient.invalidateQueries(['myClass', code, user.uid]),
    }
  );

  const removeHistory = useMutation(
    ({ code, user, id, histories }) => deleteHistory(code, user, id, histories),
    {
      onSuccess: () =>
        queryClient.invalidateQueries(['myClass', code, user.uid]),
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
    ['myClass', code, user.uid],
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
        onSuccess: () => navigate('/detail'),
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
        onSuccess: () => navigate('/detail'),
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

  const handleUpdateHeader = (onModifyBtnClick) => {
    setIsLoading(true);
    updateHeader.mutate(
      { code, info },
      {
        onSuccess: () => onModifyBtnClick(),
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

  const handleLeaveClass = (detail, onToggleModal) => {
    const { members } = detail;
    setIsLoading(true);
    leave.mutate(
      { code, user, members },
      {
        onSuccess: () => navigate('/'),
        onSettled: () => {
          setIsLoading(false);
          onToggleModal();
        },
      }
    );
  };

  const handleAddHistorySumbit = (e, onAddBtnClick) => {
    e.preventDefault();
    setIsLoading(true);
    addHistory.mutate(
      { code, user, info },
      {
        onSuccess: () => onAddBtnClick(),
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

  const handleDeleteHistory = (id, histories, onToggleModal) => {
    setIsLoading(true);
    removeHistory.mutate(
      { code, user, id, histories },
      {
        onSuccess: () => onToggleModal(),
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
    handleUpdateHeader,
    handleLeaveClass,
    handleAddHistorySumbit,
    handleDeleteHistory,
  };
}
