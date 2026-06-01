import Button from '@/components/ui/button';
import FeatureCard from './FeatureCard';
import {
  CustomerSupportIcon,
  FastIntegrationIcon,
  FundingIcon,
  IncubatorIcon,
} from './FooterIcons';

const CtaSection = () => {
  return (
    <section className="bg-[#FCFAF1] relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-[7.438rem] pb-[6rem]">
        <div className="flex justify-end">
          <Button href="/signup" title="GET STARTED" variant="secondary" />
        </div>

        <div className="mt-4">
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-primary leading-tight">
            More than a Community
          </h2>
        </div>

        <div className="mt-10 lg:mt-12 flex flex-col lg:flex-row mb-20">
          <div className="w-full md:w-8/12 lg:w-7/12 xl:w-7/12 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 md:gap-y-20">
            <FeatureCard
              icon={<CustomerSupportIcon />}
              title="Support That Moves You Forward"
              description="From intros to partners, to help finding your next win—we’ve got your back."
            />
            <FeatureCard
              icon={<FastIntegrationIcon />}
              title="Built-In Growth Tools"
              description="From personal brand elevation to idea validation—access what helps you grow faster."
            />
            <FeatureCard
              icon={<IncubatorIcon />}
              title="Curated Member Circle"
              description="We’re intentional about who’s in. Everyone brings value. Everyone adds energy."
            />
            <FeatureCard
              icon={<FundingIcon />}
              title="Plug Into Possibilities"
              description="We bridge the gap between talent and opportunity across Africa and beyond."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
