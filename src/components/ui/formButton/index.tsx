'use client';

import { CircleNotch } from '@phosphor-icons/react';
import type { ButtonHTMLAttributes } from 'react';

export interface FormButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
}

/** Solid action button used across the auth/profile forms, with a loading state. */
const FormButton = ({
  children,
  loading = false,
  disabled,
  variant = 'primary',
  fullWidth = true,
  className,
  ...props
}: FormButtonProps) => {
  const variants = {
    primary: 'bg-black text-white hover:bg-black/90 disabled:bg-black/50',
    secondary: 'bg-secondary text-white hover:bg-secondary/90 disabled:bg-secondary/50',
  };

  return (
    <button
      disabled={disabled || loading}
      className={`flex items-center cursor-pointer justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-300 disabled:cursor-not-allowed ${
        variants[variant]
      } ${fullWidth ? 'w-full' : 'w-fit'} ${className ?? ''}`}
      {...props}
    >
      {loading && <CircleNotch size={18} className="animate-spin" />}
      {children}
    </button>
  );
};

export default FormButton;
