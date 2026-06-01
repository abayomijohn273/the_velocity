'use client';

import FieldWrapper from '@/components/ui/fieldWrapper';
import { inputBaseClass } from '@/components/ui/inputStyles';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import { forwardRef, useId, useState, type InputHTMLAttributes } from 'react';

export interface InputPasswordProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  hint?: string;
}

const InputPassword = forwardRef<HTMLInputElement, InputPasswordProps>(
  ({ label, error, hint, id, className, ...props }, ref) => {
    const [visible, setVisible] = useState(false);
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <FieldWrapper label={label} htmlFor={inputId} error={error} hint={hint}>
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            type={visible ? 'text' : 'password'}
            aria-invalid={!!error}
            className={`${inputBaseClass(!!error)} pr-11 ${className ?? ''}`}
            {...props}
          />
          <button
            type="button"
            onClick={() => setVisible((prev) => !prev)}
            aria-label={visible ? 'Hide password' : 'Show password'}
            className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-secondary"
          >
            {visible ? <EyeSlash size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </FieldWrapper>
    );
  }
);

InputPassword.displayName = 'InputPassword';

export default InputPassword;
