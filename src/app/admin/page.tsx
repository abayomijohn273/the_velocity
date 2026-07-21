import { Suspense } from 'react';
import AdminDashboard from '@/modules/admin';

const Page = () => {
  return (
    <Suspense>
      <AdminDashboard />
    </Suspense>
  );
};

export default Page;
