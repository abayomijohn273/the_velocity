import Skeleton from '@/components/ui/skeleton';

/** Loading placeholder mirroring the MemberCard layout. */
const MemberCardSkeleton = () => (
  <div className="flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
    <Skeleton className="h-[92px] w-[92px] rounded-full" />
    <Skeleton className="mt-4 h-5 w-32" />
    <Skeleton className="mt-2 h-4 w-24" />
    <Skeleton className="mt-3 h-6 w-28 rounded-full" />
    <div className="mt-5 flex gap-3">
      <Skeleton className="h-10 w-10 rounded-full" />
      <Skeleton className="h-10 w-10 rounded-full" />
    </div>
  </div>
);

export default MemberCardSkeleton;
