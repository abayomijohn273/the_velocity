import AiLaunchHour from '@/modules/aiLaunchHour';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'AI Launch Hour — The Velocity',
  description:
    "AI Launch Hour is The Velocity's virtual 60-minute build sprint: solve a real problem, create a useful AI automation, and launch a working prototype.",
};

export const viewport: Viewport = {
  themeColor: '#070a14',
};

const Page = () => {
  return <AiLaunchHour />;
};

export default Page;
