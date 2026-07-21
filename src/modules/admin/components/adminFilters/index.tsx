'use client';

import Select from '@/components/ui/select';
import type { AccountStatus } from '@/types/user';
import { MagnifyingGlass } from '@phosphor-icons/react';

export interface AdminFiltersValue {
  search: string;
  status: AccountStatus | '';
}

interface AdminFiltersProps {
  value: AdminFiltersValue;
  onChange: (patch: Partial<AdminFiltersValue>) => void;
}

const statusOptions = [
  { label: 'All statuses', value: '' },
  { label: 'Pending', value: 'pending' },
  { label: 'Approved', value: 'approved' },
  { label: 'Rejected', value: 'rejected' },
];

const AdminFilters = ({ value, onChange }: AdminFiltersProps) => {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center">
      <div className="relative flex-1">
        <MagnifyingGlass
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="search"
          value={value.search}
          onChange={(e) => onChange({ search: e.target.value })}
          placeholder="Search by name or email"
          aria-label="Search users by name or email"
          className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-secondary focus:ring-2 focus:ring-secondary/20"
        />
      </div>
      <div className="md:w-64">
        <Select
          options={statusOptions}
          value={value.status}
          onChange={(status) => onChange({ status: status as AccountStatus | '' })}
          placeholder="All statuses"
        />
      </div>
    </div>
  );
};

export default AdminFilters;
