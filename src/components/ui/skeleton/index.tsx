interface SkeletonProps {
  className?: string;
}

/** Animated placeholder block used to build loading states. */
const Skeleton = ({ className }: SkeletonProps) => (
  <div
    className={`animate-pulse rounded bg-black/10 flex flex-col gap-2 ${className ?? ''}`}
    aria-hidden="true"
  />
);
export default Skeleton;
