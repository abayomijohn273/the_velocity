import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="w-full md:w-11/12 lg:w-10/12">
      <div className="mb-6">{icon}</div>
      <h3 className="text-lg font-semibold mb-2 text-black">{title}</h3>
      <p className="text-base leading-relaxed text-black">{description}</p>
    </div>
  );
};

export default FeatureCard;
