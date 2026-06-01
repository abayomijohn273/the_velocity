'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api/client';
import type { CompleteProfileInput } from '@/lib/validation/profile';
import type { AuthUser, UserProfile } from '@/types/user';

interface CompleteProfileResponse {
  user: AuthUser;
  profile: UserProfile;
}

export const useCompleteProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CompleteProfileInput) =>
      apiFetch<CompleteProfileResponse>('/api/profile/complete', {
        method: 'POST',
        body: JSON.stringify(input),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });
};
