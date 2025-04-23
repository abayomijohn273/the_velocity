import React from 'react';

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  ariaLabel: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon, ariaLabel }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className="text-gray-600 hover:text-primary transition-colors duration-200 mr-4"
    >
      {icon}
    </a>
  );
};

export default SocialLink;
