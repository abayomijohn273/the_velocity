import { Suspense } from 'react';
import VerifyOtp from '@/modules/auth/verifyOtp';

const Page = () => {
  return (
    <Suspense>
      <VerifyOtp />
    </Suspense>
  );
};

export default Page;
