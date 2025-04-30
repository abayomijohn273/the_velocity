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
    },
    {
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
    },
    {
      title: 'Gold',
      subtitle: 'For Leaders Ready to Scale',
      features: [
        'Everything in Premium',
        'Early access to deals & investments via Velocity DealFlow',
        'Scale your ideas/startups with The Velocity Venture Studio',
        'Discounted access to Velocity Workspaces (currently in Lagos)',
        '50% discount on premium events, sessions, and meetings',
        'Access to the network of Velocity Consultant',
        'Exclusive Gold Member privileges',
      ],
      price: {
        monthly: 500,
        annual: 5000,
      },
      ctaText: 'Choose Gold',
      ctaLink: '/join-us',
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 md:py-28 lg:py-32 px-4 bg-[#FCFAF1]">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-black">
            Choose Your Velocity
          </h2>
          <p className="text-center text-base max-w-2xl mx-auto text-gray-600 mb-8">
            Join our community with a plan that suits your needs
          </p>

          {/* Toggle Switch */}
          <div className="flex items-center gap-4 mt-4">
            <span
              className={`text-base font-medium ${!isAnnual ? 'text-primary' : 'text-gray-500'}`}
            >
              Monthly
            </span>
            <div
              className="relative w-14 h-7 bg-gray-200 rounded-full cursor-pointer bg-primary"
              onClick={() => setIsAnnual(!isAnnual)}
            >
              <div
                className={`absolute top-1 w-5 h-5 rounded-full transition-transform duration-300 ease-in-out bg-gradient-to-r from-[#7B9404] to-[#B0D10E] ${
                  isAnnual ? 'translate-x-8' : 'translate-x-1'
                }`}
              ></div>
            </div>
            <span
              className={`text-base font-medium ${isAnnual ? 'text-primary' : 'text-gray-500'}`}
            >
              Annual
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-2">
          {pricingOptions.map((option, index) => (
            <div
              key={index}
              className={`relative rounded-xl overflow-hidden shadow-md flex flex-col 
                transition-all duration-300 hover:shadow-xl hover:-translate-y-1
                ${
                  option.popular
                    ? 'border-2 border-secondary md:scale-103 z-10 bg-gradient-to-b from-white to-[#7B9404]/10'
                    : 'border border-gray-100 bg-white'
                }`}
            >
              {option.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-gradient-to-r from-[#7B9404] to-[#B0D10E] text-white text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-bl-lg shadow-md">
                    Most Popular
                  </div>
                </div>
              )}
              <div className={`p-6 ${option.popular ? '' : ''}`}>
                <h3 className="text-xl font-bold text-black mb-2">{option.title}</h3>
                <p className="text-gray-600 text-sm mb-5">{option.subtitle}</p>

                <ul className="space-y-3 mb-6">
                  {option.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span
                        className={`mt-0.5 flex-shrink-0 ${option.popular ? 'text-[#B0D10E]' : 'text-secondary'}`}
                      >
                        <CheckIcon />
                      </span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className={`p-6 mt-auto ${option.popular ? 'border-t border-[#7B9404]/20' : 'bg-gray-50'}`}
              >
                <div className="flex items-end gap-1 mb-4">
                  <span className="text-3xl font-bold text-black">
                    ${isAnnual ? option.price.annual : option.price.monthly}
                  </span>
                  <span className="text-gray-500 text-sm mb-1">/{isAnnual ? 'year' : 'month'}</span>
                </div>

                <Link
                  href={option.ctaLink}
                  className={`block w-full py-3 px-5 rounded-full text-center font-semibold text-sm
                    transition-all duration-300 
                    ${
                      option.popular
                        ? 'bg-gradient-to-r from-[#7B9404] to-[#B0D10E] hover:from-[#667c03] hover:to-[#96b80b] text-white'
                        : 'bg-white border-2 border-secondary text-secondary hover:bg-secondary hover:text-white'
                    }`}
                >
                  {option.ctaText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
