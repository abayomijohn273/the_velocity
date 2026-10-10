'use client';

import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api/client';
import type { AccountStatus, AuthUser } from '@/types/user';
import type { AdminUser, PaginatedAdminUsers } from '@/lib/db/users';

export interface AdminUsersFilters {
  page: number;
  search?: string;
  status?: AccountStatus | '';
}

const buildQuery = (filters: AdminUsersFilters): string => {
  const params = new URLSearchParams();
  params.set('page', String(filters.page));
  if (filters.search) params.set('search', filters.search);
  if (filters.status) params.set('status', filters.status);
  return params.toString();
};

export const useAdminUsers = (filters: AdminUsersFilters) =>
  useQuery({
    queryKey: ['adminUsers', filters],
    queryFn: () => apiFetch<PaginatedAdminUsers>(`/api/admin/users?${buildQuery(filters)}`),
    placeholderData: keepPreviousData,
  });

export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'approved' | 'rejected' }) =>
      apiFetch<{ user: AuthUser }>(`/api/admin/users/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['adminUsers'] }),
  });
};

export const useUpdateUserMonetized = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, isMonetized }: { id: string; isMonetized: boolean }) =>
      apiFetch<{ user: AuthUser }>(`/api/admin/users/${id}/monetized`, {
        method: 'PATCH',
        body: JSON.stringify({ isMonetized }),
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['adminUsers'] }),
  });
};

export type { AdminUser };
