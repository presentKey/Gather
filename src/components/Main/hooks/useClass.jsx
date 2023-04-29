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
import { CREATE, PARTICIPATION } from '../../../constants/formButtonText';

export default function useClass(code, info) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const ERROR = () => {
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 600);
  };

  const create = useMutation(({ user, info }) => createClass(user, info), {
    onSuccess: () => queryClient.invalidateQueries(['myClasses', user.uid]),
  });

  const participation = useMutation(({ user, info }) => participationClass(user, info), {
    onSuccess: () => queryClient.invalidateQueries(['myClasses', user.uid]),
  });

  const updateHeader = useMutation(
    ({ user, code, info }) => updateClassHeader(user.uid, code, info),
    {
      onSuccess: () => queryClient.invalidateQueries(['myClass', code, user.uid]),
    }
  );

  const leave = useMutation(({ code, user, members }) => leaveClass(code, user, members), {
    onSuccess: () => queryClient.invalidateQueries(['myClasses', user.uid]),
  });

  const addHistory = useMutation(
    ({ code, user, info, minDate }) => depositOrWithdraw(code, user, info, minDate),
    {
      onSuccess: () => queryClient.invalidateQueries(['myClass', code, user.uid]),
    }
  );

  const removeHistory = useMutation(
    ({ code, user, id, histories }) => deleteHistory(code, user, id, histories),
    {
      onSuccess: () => queryClient.invalidateQueries(['myClass', code, user.uid]),
    }
  );

  const classListQuery = useQuery(['myClasses', user.uid], () => getClassList(user.uid), {
    staleTime: 1000 * 60 * 60,
  });

  const classDetailQuery = useQuery(['myClass', code, user.uid], () => getClassDetail(code), {
    enabled: !!code,
    staleTime: 1000 * 60 * 60,
  });

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    create.mutate(
      { user, info },
      {
        onSuccess: () => navigate('/detail'),
        onError: ERROR,
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
        onError: ERROR,
        onSettled: () => setIsLoading(false),
      }
    );
  };

  const handleSubmit = (e, text) => {
    e.preventDefault();
    switch (text) {
      case CREATE:
        handleCreateSubmit(e);
        break;
      case PARTICIPATION:
        handleParticipationSubmit(e);
        break;
      default:
        throw new Error(`${text}에 실패했습니다.`);
    }
  };

  const handleUpdateHeader = (onModifyBtnClick) => {
    setIsLoading(true);
    updateHeader.mutate(
      { user, code, info },
      {
        onSuccess: () => onModifyBtnClick(),
        onError: ERROR,
        onSettled: () => setIsLoading(false),
      }
    );
  };

  const handleLeaveClass = (members, onToggleModal) => {
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

  const handleAddHistorySumbit = (e, onAddBtnClick, minDate) => {
    e.preventDefault();
    setIsLoading(true);
    addHistory.mutate(
      { code, user, info, minDate },
      {
        onSuccess: () => onAddBtnClick(),
        onError: ERROR,
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
        onError: ERROR,
        onSettled: () => setIsLoading(false),
      }
    );
  };

  return {
    user,
    isLoading,
    error,
    classListQuery,
    classDetailQuery,
    handleSubmit,
    handleUpdateHeader,
    handleLeaveClass,
    handleAddHistorySumbit,
    handleDeleteHistory,
  };
}
