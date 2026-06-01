'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api/client';
import type { PaginatedMembers } from '@/types/member';

export interface MembersFilters {
  page: number;
  search?: string;
  currentRole?: string;
  industry?: string;
}

const buildQuery = (filters: MembersFilters): string => {
  const params = new URLSearchParams();
  params.set('page', String(filters.page));
  if (filters.search) params.set('search', filters.search);
  if (filters.currentRole) params.set('currentRole', filters.currentRole);
  if (filters.industry) params.set('industry', filters.industry);
  return params.toString();
};

export const useMembers = (filters: MembersFilters) =>
  useQuery({
    queryKey: ['members', filters],
    queryFn: () => apiFetch<PaginatedMembers>(`/api/members?${buildQuery(filters)}`),
    placeholderData: keepPreviousData,
  });
