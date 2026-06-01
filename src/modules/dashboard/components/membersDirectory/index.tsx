'use client';

import { useEffect, useState } from 'react';
import EmptyState from '@/modules/dashboard/components/emptyState';
import MemberCard from '@/modules/dashboard/components/memberCard';
import MemberCardSkeleton from '@/modules/dashboard/components/memberCard/skeleton';
import MembersFilters, {
  type MembersFiltersValue,
} from '@/modules/dashboard/components/membersFilters';
import Pagination from '@/components/ui/pagination';
import { useMembers } from '@/hooks/members/useMembers';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { MEMBERS_PER_PAGE } from '@/lib/constants/pagination';

const MembersDirectory = () => {
  const [filters, setFilters] = useState<MembersFiltersValue>({
    search: '',
    currentRole: '',
    industry: '',
  });
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebouncedValue(filters.search, 400);

  // Reset to the first page whenever the filters change.
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, filters.currentRole, filters.industry]);

  const { data, isLoading, isError } = useMembers({
    page,
    search: debouncedSearch,
    currentRole: filters.currentRole,
    industry: filters.industry,
  });

  const handleFilterChange = (patch: Partial<MembersFiltersValue>) =>
    setFilters((prev) => ({ ...prev, ...patch }));

  const members = data?.items ?? [];
  const showSkeleton = isLoading;
  const showEmpty = !isLoading && !isError && members.length === 0;

  return (
    <section className="flex flex-col gap-6">
      <MembersFilters value={filters} onChange={handleFilterChange} />

      {!showSkeleton && !showEmpty && data && (
        <p className="text-sm text-gray-500">
          {data.total} member{data.total === 1 ? '' : 's'}
        </p>
      )}

      {isError ? (
        <EmptyState
          title="Couldn’t load members"
          message="Something went wrong while fetching the directory. Please try again."
        />
      ) : showEmpty ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {showSkeleton
            ? Array.from({ length: MEMBERS_PER_PAGE }).map((_, i) => <MemberCardSkeleton key={i} />)
            : members.map((member) => <MemberCard key={member.userId} member={member} />)}
        </div>
      )}

      {data && !showSkeleton && (
        <Pagination page={page} totalPages={data.totalPages} onPageChange={setPage} />
      )}
    </section>
  );
};

export default MembersDirectory;
