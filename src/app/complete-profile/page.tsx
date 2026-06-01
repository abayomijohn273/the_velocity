import { Suspense } from 'react';
import CompleteProfile from '@/modules/profile/completeProfile';

const Page = () => {
  return (
    <Suspense>
      <CompleteProfile />
    </Suspense>
  );
};

export default Page;
