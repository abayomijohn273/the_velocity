import { Suspense } from 'react';
import CompleteSignup from '@/modules/auth/completeSignup';

const Page = () => {
  return (
    <Suspense>
      <CompleteSignup />
    </Suspense>
  );
};

export default Page;
