'use client';
import { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

const FaqsSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqItems: FaqItem[] = [
    {
      question: 'What is The Velocity?',
      answer: `The Velocity is an exclusive community of ambitious, high-performing professionals, 
        entrepreneurs, and industry leaders from Africa and across the globe. It’s a space built 
        for those who are shaping the future and driving meaningful impact.`,
    },
    {
      question: 'What does “Top 1%” mean at The Velocity?',
      answer: `We define the Top 1% as individuals who are not just excelling in their fields, but actively 
        redefining industry standards, influencing change, and setting the pace for others.`,
    },
    {
      question: 'Who can join The Velocity?',
      answer: `Membership is by invitation or referral only. We welcome trailblazers, thought leaders, 
        and change-makers—people who are truly making a difference in their work and communities.`,
    },
    {
      question: 'How do I become a member?',
      answer: `The Velocity is a referral-based community. To join, you’ll need a recommendation 
        from an existing member who can vouch for your work, impact, and values.`,
    },
    {
      question: 'Is there a membership fee?',
      answer: `Yes, there’s an annual membership fee of $300. This helps us sustain high-quality experiences, events, and community support throughout the year.`,
    },
    {
      question: 'Who can I reach out to for support or questions?',
      answer: `You’re never alone in The Velocity. You can post your questions directly in the community group 
        for peer-to-peer support. Beyond that, our team includes a full-time Community Manager, Chief 
        Operating Officer, a Governing Council, an Advisory Board, and of course, the Convener—ready 
        to support you whenever needed.`,
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faqs"
      className="py-20 md:py-28 lg:py-32 px-4 md:px-6 lg:px-8 bg-gray-50 relative overflow-hidden"
    >
      <div className="max-w-3xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          {faqItems.map((item, index) => (
            <div key={index} className="border-b border-gray-200 pb-6">
              <button
                onClick={() => toggleAccordion(index)}
                className="flex justify-between items-center w-full text-left py-3 text-black cursor-pointer"
                aria-expanded={openIndex === index}
              >
                <h3 className="text-base md:text-lg lg:text-xl font-semibold w-10/12">
                  {item.question}
                </h3>
                <svg
                  className={`w-6 h-6 transition-transform duration-300 ease-in-out ${openIndex === index ? 'transform rotate-180' : ''}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 9l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-screen opacity-100 pt-4' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-base text-black">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqsSection;
