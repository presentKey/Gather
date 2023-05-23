import { useMutation } from '@tanstack/react-query';

export default function useMutationClass(setIsLoading, setError, { mutationFn, onSuccess }) {
  const mutationResult = useMutation({
    mutationFn: async (args) => {
      setIsLoading(true);
      setError({ state: false, message: '' });
      return mutationFn(args);
    },
    onSuccess: () => {
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: ({ message }) => {
      setError({ state: true, message });
    },
    onSettled: () => setIsLoading(false),
  });

  return mutationResult;
}
