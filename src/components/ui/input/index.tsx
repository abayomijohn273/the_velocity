import { forwardRef, useId, type InputHTMLAttributes } from 'react';
import FieldWrapper from '@/components/ui/fieldWrapper';
import { inputBaseClass } from '@/components/ui/inputStyles';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, id, className, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <FieldWrapper label={label} htmlFor={inputId} error={error} hint={hint}>
        <input
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={`${inputBaseClass(!!error)} ${className ?? ''}`}
          {...props}
        />
      </FieldWrapper>
    );
  }
);

Input.displayName = 'Input';

export default Input;
