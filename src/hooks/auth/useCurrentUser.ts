'use client';

import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api/client';
import type { AuthUser, UserProfile } from '@/types/user';

interface MeResponse {
  user: AuthUser;
  profile: UserProfile | null;
}

export const useCurrentUser = () =>
  useQuery({
    queryKey: ['currentUser'],
    queryFn: () => apiFetch<MeResponse>('/api/auth/me'),
  });
