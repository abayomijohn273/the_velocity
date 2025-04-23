'use client';
import { useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import FeatureCard from './FeatureCard';
import { ArrowIcon, PaymentIcon, SalesPageIcon, TokenizationIcon } from './Icons';

const AboutSection = () => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  const features = [
    {
      id: 1,
      title: 'Be Seen and Celebrated',
      description: `Get featured in our Spotlight Stories that shine a light on your achievements, 
      journey, and growth moments. Because your story deserves to be told—and shared.`,
      icon: <TokenizationIcon />,
    },
    {
      id: 2,
      title: 'Build Deep, Valuable Connections',
      description: `Tap into a curated hub of high achievers through The Achievers Directory and our 
      social meetups. From virtual vibes to in-person events, we make networking real and lasting.`,
      icon: <SalesPageIcon />,
    },
    {
      id: 3,
      title: 'Unlock Big Opportunities',
      description: `Whether it’s a new job, a partnership, or an invite-only room — you’ll 
      get access to the people, insights, and chances that others only dream of.`,
      icon: <PaymentIcon />,
    },
    {
      id: 4,
      title: 'Stay Sharp, Stay Ahead',
      description: `From our Insight Sessions to hot-topic hangouts, learn from 
      industry leaders and trendsetters to stay ahead of the curve.`,
      icon: <SalesPageIcon />,
    },
  ];

  const handlePrevClick = () => {
    if (swiper) {
      swiper.slidePrev();
    }
  };

  const handleNextClick = () => {
    if (swiper) {
      swiper.slideNext();
    }
  };

  return (
    <section
      id="about"
      className="relative pt-[5.938rem] pb-[7rem] md:pb-[9rem] lg:pb-[12rem] px-4 bg-[#FCFAF1]"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
            What The Velocity Can Help You Do
          </h2>
          <p className="mt-4 text-base md:text-lg max-w-2xl mx-auto text-black">
            We bring together people who are making moves and accelerating their growth—creating a
            space where energy meets opportunity.
          </p>
        </div>

        <div className="relative">
          <Swiper
            modules={[Navigation]}
            spaceBetween={18}
            slidesPerView={1.1}
            onSwiper={setSwiper}
            loop={true}
            breakpoints={{
              640: { slidesPerView: 2.1 },
              1024: { slidesPerView: 3.1 },
            }}
            className="py-4"
          >
            {features.map((feature, index) => (
              <SwiperSlide key={index}>
                <FeatureCard
                  id={feature.id}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div
            className="flex space-x-4 my-8 justify-center w-full 
            md:justify-between md:absolute md:top-1/2 md:left-0 md:-translate-y-[4rem] md:z-10"
          >
            <button
              className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center transform rotate-180 md:-ml-4"
              onClick={handlePrevClick}
              aria-label="Previous slide"
            >
              <ArrowIcon />
            </button>
            <button
              className="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center md:-mr-4"
              onClick={handleNextClick}
              aria-label="Next slide"
            >
              <ArrowIcon />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
