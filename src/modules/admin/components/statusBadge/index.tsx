import type { AccountStatus } from '@/types/user';

const styles: Record<AccountStatus, string> = {
  pending: 'bg-amber-50 text-amber-600',
  approved: 'bg-secondary/10 text-secondary',
  rejected: 'bg-red-50 text-red-500',
};

const labels: Record<AccountStatus, string> = {
  pending: 'Pending',
  approved: 'Approved',
  rejected: 'Rejected',
};

const StatusBadge = ({ status }: { status: AccountStatus }) => (
  <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${styles[status]}`}>
    {labels[status]}
  </span>
);

export default StatusBadge;
