'use client';

import { useEffect, useState } from 'react';
import AppHeader from '@/components/layouts/appHeader';
import Skeleton from '@/components/ui/skeleton';
import Pagination from '@/components/ui/pagination';
import { useAdminUsers } from '@/hooks/admin/useAdminUsers';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import AdminFilters, { type AdminFiltersValue } from '@/modules/admin/components/adminFilters';
import AdminUsersTable from '@/modules/admin/components/adminUsersTable';
import EmptyState from '@/modules/dashboard/components/emptyState';

const AdminDashboard = () => {
  const [filters, setFilters] = useState<AdminFiltersValue>({ search: '', status: '' });
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebouncedValue(filters.search, 400);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, filters.status]);

  const { data, isLoading, isError } = useAdminUsers({
    page,
    search: debouncedSearch,
    status: filters.status,
  });

  const handleFilterChange = (patch: Partial<AdminFiltersValue>) =>
    setFilters((prev) => ({ ...prev, ...patch }));

  const users = data?.items ?? [];
  const showEmpty = !isLoading && !isError && users.length === 0;

  return (
    <div className="min-h-screen bg-[#f4f6ee]">
      <AppHeader />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-black sm:text-3xl">Admin dashboard</h1>
        <p className="mt-2 text-sm text-gray-600">
          Approve or reject new accounts, and mark verified members as monetized.
        </p>

        <div className="mt-8 flex flex-col gap-6">
          <AdminFilters value={filters} onChange={handleFilterChange} />

          {!isLoading && !showEmpty && data && (
            <p className="text-sm text-gray-500">
              {data.total} user{data.total === 1 ? '' : 's'}
            </p>
          )}

          {isError ? (
            <EmptyState
              title="Couldn’t load users"
              message="Something went wrong while fetching the user list. Please try again."
            />
          ) : isLoading ? (
            <Skeleton className="h-96 w-full" />
          ) : showEmpty ? (
            <EmptyState title="No users found" message="Try adjusting your search or filters." />
          ) : (
            <AdminUsersTable users={users} />
          )}

          {data && !isLoading && (
            <Pagination page={page} totalPages={data.totalPages} onPageChange={setPage} />
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
