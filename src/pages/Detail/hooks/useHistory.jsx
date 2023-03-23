import { depositOrWithdraw, getHistory } from '../../../api/firebase';
import { useAuthContext } from '../../../context/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export default function useHistory(code) {
  const { user } = useAuthContext();
  const queryClient = useQueryClient();

  const add = useMutation(
    ({ code, user, info }) => depositOrWithdraw(code, user, info),
    {
      onSuccess: () =>
        queryClient.invalidateQueries(['history', code, user.uid]),
    }
  );

  const historyQuery = useQuery(
    ['history', code, user.uid],
    () => getHistory(code),
    {
      enabled: !!code,
      staleTime: 1000 * 60 * 60,
    }
  );

  const handleAddHistorySumbit = (e, info, onAddBtnClick) => {
    e.preventDefault();
    add.mutate(
      { code, user, info },
      {
        onSuccess: () => onAddBtnClick(),
      }
    );
  };

  return { historyQuery, handleAddHistorySumbit };
}
