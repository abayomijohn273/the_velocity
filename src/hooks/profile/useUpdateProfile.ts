'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api/client';
import type { CompleteProfileInput } from '@/lib/validation/profile';
import type { AuthUser, UserProfile } from '@/types/user';

interface UpdateProfileResponse {
  user: AuthUser;
  profile: UserProfile;
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CompleteProfileInput) =>
      apiFetch<UpdateProfileResponse>('/api/profile', {
        method: 'PATCH',
        body: JSON.stringify(input),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });
};
