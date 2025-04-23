import Link from 'next/link';

const Button = ({
  href,
  title,
  className,
  variant = 'primary',
  ...props
}: {
  href: string;
  title: string;
  className?: string;
  variant?: 'primary' | 'secondary';
  target?: string;
}) => {
  const buttonPrimary =
    'bg-gradient-to-r from-[#7B9404] to-[#B0D10E] hover:from-[#667c03] hover:to-[#96b80b] text-white';
  const buttonSecondary = 'bg-white text-secondary hover:bg-secondary hover:text-white';
  const variantClasses = variant === 'primary' ? buttonPrimary : buttonSecondary;
  const buttonClasses = `group transition-all duration-300 ease-in-out
     pl-6 pr-4 py-4 rounded-full flex items-center gap-6 text-xs md:text-sm font-semibold w-fit`;
  return (
    <Link href={href} className={`${buttonClasses} ${variantClasses} ${className}`} {...props}>
      {title}
      <span className="group-hover:translate-x-1 transition-all duration-300">
        <svg
          width="23"
          height="14"
          viewBox="0 0 23 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.7866 7.46212C22.1313 7.11734 22.1313 6.55833 21.7866 6.21354L16.1679 0.594906C15.8231 0.250119 15.2641 0.250119 14.9193 0.594906C14.5746 0.939693 14.5746 1.4987 14.9193 1.84349L19.9137 6.83783L14.9193 11.8322C14.5746 12.177 14.5746 12.736 14.9193 13.0808C15.2641 13.4255 15.8231 13.4255 16.1679 13.0808L21.7866 7.46212ZM0.855957 7.72071L21.1623 7.72071L21.1623 5.95495L0.855957 5.95495L0.855957 7.72071Z"
            fill="currentColor"
          />
        </svg>
      </span>
    </Link>
  );
};

export default Button;
