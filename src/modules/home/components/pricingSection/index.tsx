'use client';
import Link from 'next/link';
import { useState } from 'react';

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor" />
  </svg>
);

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const pricingOptions = [
    {
      badge: 'Basic',
      title: 'Basic',
      subtitle: 'Free Access. Stay Connected.',
      features: [
        'Full access to The Velocity Community and Groups',
        'Engage with community assets and relationships',
        'Join free sessions, rooms, and events',
      ],
      price: {
        monthly: 0,
        annual: 0,
      },
      ctaText: 'Choose Basic',
      ctaLink: '/join-us',
      popular: false,
      color: '#89A590',
      bgColor: '#0B3424',
    },
    {
      badge: 'Premium',
      title: 'Premium',
      subtitle: 'Unlock Opportunities & Exclusive Spaces',
      features: [
        'Everything in Basic',
        'Personalised introductions by the admin team',
        'Access to Partnership, Funding, and Exclusive Spaces',
      ],
      price: {
        monthly: 200,
        annual: 2000,
      },
      ctaText: 'Choose Premium',
      ctaLink: '/join-us',
      popular: true,
      color: '#D6D394',
      bgColor: '#606C1F',
    },
    {
      badge: 'Gold',
      title: 'Gold',
      subtitle: 'For Leaders Ready to Scale',
      features: [
        'Everything in Premium',
        'Early access to deals & investments via Velocity DealFlow',
        'Scale your ideas/startups with The Velocity Venture Studio',
        'Discounted access to Velocity Workspaces (currently in Lagos)',
        '50% discount on premium events, sessions, and meetings',
        'Access to the network of Velocity Consultant',
      ],
      price: {
        monthly: 500,
        annual: 5000,
      },
      ctaText: 'Choose Gold',
      ctaLink: '/join-us',
      popular: false,
      color: '#FFFFFF',
      bgColor: '#9A7D2E',
    },
  ];

  return (
    <section id="pricing" className="py-20 md:py-28 lg:py-32 px-4 bg-[#FCFAF1] text-black">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center mb-16">
          <h2 className="w-full md:w-8/12 lg:w-7/12 xl:w-6/12 2xl:w-5/12 text-3xl md:text-4xl md:leading-12 font-bold mb-4 text-center text-black">
            Choose Your Velocity Membership Plan
          </h2>
          <p className="text-center text-base max-w-2xl mx-auto text-gray-600 mb-10">
            Join our community with a plan that suits your needs
          </p>

          {/* Toggle Switch */}
          <div className="flex items-center gap-4 mt-4">
            <span className={`text-base font-medium ${!isAnnual ? 'text-black' : 'text-gray-500'}`}>
              Monthly
            </span>
            <div
              className="relative w-14 h-7 bg-secondary rounded-full cursor-pointer"
              onClick={() => setIsAnnual(!isAnnual)}
            >
              <div
                className={`absolute top-1 w-5 h-5 rounded-full transition-transform duration-300 ease-in-out bg-white ${
                  isAnnual ? 'translate-x-8' : 'translate-x-1'
                }`}
              ></div>
            </div>
            <span className={`text-base font-medium ${isAnnual ? 'text-black' : 'text-gray-500'}`}>
              Annual
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingOptions.map((option, index) => (
            <div
              key={index}
              className="flex flex-col h-full rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105 relative"
              style={{
                backgroundColor: option.bgColor,
                background: option.bgColor,
              }}
            >
              {option.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-[#D6D394] text-[#606C1F] text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-bl-2xl shadow-md">
                    Most Popular
                  </div>
                </div>
              )}
              <div className="p-6 flex flex-col h-full">
                {/* Badge */}
                <div className="mb-10">
                  <span
                    className="inline-block py-1.5 px-4 rounded-full border text-sm font-medium"
                    style={{
                      borderColor: option.color,
                      color: option.color,
                    }}
                  >
                    {option.badge}
                  </span>
                </div>

                {/* Price */}
                <div className="mb-5">
                  <div className="flex items-baseline">
                    <span className="text-6xl font-bold" style={{ color: option.color }}>
                      {option.price.monthly === 0
                        ? 'Free'
                        : `$${isAnnual ? option.price.annual : option.price.monthly}`}
                    </span>
                    {option.price.monthly !== 0 && (
                      <span
                        className="text-sm ml-2"
                        style={{
                          color: option.bgColor === '#FCFAF1' ? 'gray' : 'rgba(255,255,255,0.7)',
                        }}
                      >
                        per {isAnnual ? 'year' : 'month'}
                      </span>
                    )}
                  </div>
                  <p
                    className="mt-3"
                    style={{
                      color: option.bgColor === '#FCFAF1' ? 'gray' : 'rgba(255,255,255,0.8)',
                    }}
                  >
                    {option.subtitle}
                  </p>
                </div>

                <div
                  className={`border-t my-6 pt-6 ${option.bgColor === '#FCFAF1' ? 'border-gray-200' : 'border-opacity-20 border-white'}`}
                >
                  <ul className="space-y-4">
                    {option.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3"
                        style={{ color: option.bgColor === '#FCFAF1' ? '#4B5563' : 'white' }}
                      >
                        <span className="flex-shrink-0 mt-1" style={{ color: option.color }}>
                          <CheckIcon />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto pt-6">
                  <Link
                    href={option.ctaLink}
                    className={`block w-full py-3.5 px-5 rounded-2xl text-center font-medium 
                    transition-all duration-300 ${
                      option.bgColor !== '#FCFAF1'
                        ? 'text-black border border-opacity-20'
                        : 'border border-gray-300 hover:bg-gray-100'
                    }`}
                    style={{
                      backgroundColor: option.bgColor !== '#FCFAF1' ? option.color : 'transparent',
                      color:
                        option.bgColor !== '#FCFAF1'
                          ? option.popular
                            ? 'black'
                            : option.bgColor
                          : 'black',
                    }}
                  >
                    {option.ctaText}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
