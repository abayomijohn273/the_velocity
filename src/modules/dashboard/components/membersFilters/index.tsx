'use client';

import Select from '@/components/ui/select';
import { currentRoles } from '@/lib/constants/currentRoles';
import { industries } from '@/lib/constants/industries';
import { MagnifyingGlass } from '@phosphor-icons/react';

export interface MembersFiltersValue {
  search: string;
  currentRole: string;
  industry: string;
}

interface MembersFiltersProps {
  value: MembersFiltersValue;
  onChange: (patch: Partial<MembersFiltersValue>) => void;
}

const roleOptions = [{ label: 'All roles', value: '' }, ...currentRoles];
const industryOptions = [{ label: 'All industries', value: '' }, ...industries];

const MembersFilters = ({ value, onChange }: MembersFiltersProps) => {
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
          aria-label="Search members by name or email"
          className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-secondary focus:ring-2 focus:ring-secondary/20"
        />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:w-[36rem]">
        <Select
          options={roleOptions}
          value={value.currentRole}
          onChange={(currentRole) => onChange({ currentRole })}
          placeholder="All roles"
        />
        <Select
          options={industryOptions}
          value={value.industry}
          onChange={(industry) => onChange({ industry })}
          placeholder="All industries"
        />
      </div>
    </div>
  );
};

export default MembersFilters;
