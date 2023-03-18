import { depositOrWithdraw } from '../../../api/firebase';
import { useAuthContext } from '../../../context/AuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useHistory() {
  const { user } = useAuthContext();
  const queryClient = useQueryClient();

  const add = useMutation(
    ({ code, user, info }) => depositOrWithdraw(code, user, info),
    {
      onSuccess: () =>
        queryClient.invalidateQueries(['history', code, user.uid]),
    }
  );

  const handleAddHistorySumbit = (e, code, info) => {
    e.preventDefault();
    add.mutate(
      { code, user, info },
      {
        onSuccess: () => {},
      }
    );
  };

  return { handleAddHistorySumbit };
}
