import { useMutation } from '@tanstack/react-query';

export default function useMutationClass(setIsLoading, setError, { mutationFn, onSuccess }) {
  const mutationResult = useMutation({
    mutationFn: async (args) => {
      setIsLoading(true);
      return mutationFn(args);
    },
    onSuccess: () => {
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: () => {
      setError(true);
      setTimeout(() => setError(false), 600);
    },
    onSettled: () => setIsLoading(false),
  });

  return mutationResult;
}
