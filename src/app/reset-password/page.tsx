import { Suspense } from 'react';
import ResetPassword from '@/modules/auth/resetPassword';

const Page = () => {
  return (
    <Suspense>
      <ResetPassword />
    </Suspense>
  );
};

export default Page;
