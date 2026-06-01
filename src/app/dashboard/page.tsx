import { Suspense } from 'react';
import Dashboard from '@/modules/dashboard';

const Page = () => {
  return (
    <Suspense>
      <Dashboard />
    </Suspense>
  );
};

export default Page;
