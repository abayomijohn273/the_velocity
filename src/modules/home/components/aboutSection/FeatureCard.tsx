import React from 'react';

interface FeatureCardProps {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ id, title, description, icon }) => {
  const bgColor = id % 2 === 1 ? 'bg-[#4D5E00]' : 'bg-primary';
  return (
    <div
      className={`${bgColor} h-[28rem] md:h-[29rem] lg:h-[30rem] border-[3px] border-white rounded-[20px] p-8 flex flex-col pt-14 md:pt-16 lg:pt-20`}
    >
      <div className="">{icon}</div>
      <div className="mt-12 lg:mt-16">
        <h3 className="text-xl font-semibold text-white mb-3 w-11/12">{title}</h3>
        <p className="text-white text-base lg:text-lg leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
