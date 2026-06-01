import { UsersThree } from '@phosphor-icons/react';

interface EmptyStateProps {
  title?: string;
  message?: string;
}

const EmptyState = ({
  title = 'No members found',
  message = 'Try adjusting your search or filters to find who you’re looking for.',
}: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-16 text-center">
    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10">
      <UsersThree size={32} className="text-secondary" />
    </div>
    <h3 className="text-lg font-semibold text-black">{title}</h3>
    <p className="mt-1 max-w-sm text-sm text-gray-500">{message}</p>
  </div>
);

export default EmptyState;
