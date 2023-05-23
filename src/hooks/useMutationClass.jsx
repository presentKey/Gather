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
    onError: ({ message }) => {
      setError({ state: true, message });
      setTimeout(() => setError({ state: false, message: '' }), 3000);
    },
    onSettled: () => setIsLoading(false),
  });

  return mutationResult;
}
