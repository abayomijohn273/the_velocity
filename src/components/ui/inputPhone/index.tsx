'use client';

import { useId } from 'react';
import PhoneInput, { type Country } from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';
import 'react-phone-number-input/style.css';
import FieldWrapper from '@/components/ui/fieldWrapper';
import { inputBaseClass } from '@/components/ui/inputStyles';

export interface InputPhoneProps {
  label?: string;
  error?: string;
  value?: string;
  onChange: (value?: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  defaultCountry?: Country;
  id?: string;
}

/**
 * Phone field with country flag + dial code, styled to match the other inputs.
 * Controlled — pair with react-hook-form's <Controller>.
 */
const InputPhone = ({
  label,
  error,
  value,
  onChange,
  onBlur,
  placeholder = 'Enter phone number',
  defaultCountry = 'NG',
  id,
}: InputPhoneProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <FieldWrapper label={label} htmlFor={inputId} error={error}>
      <div
        className={`${inputBaseClass(!!error)} flex items-center gap-2 py-2.5 [&_.PhoneInputCountrySelectArrow]:text-gray-400 [&_.PhoneInputInput]:border-0 [&_.PhoneInputInput]:bg-transparent [&_.PhoneInputInput]:p-0 [&_.PhoneInputInput]:text-sm [&_.PhoneInputInput]:outline-none`}
      >
        <PhoneInput
          id={inputId}
          className="w-full"
          flags={flags}
          international
          defaultCountry={defaultCountry}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          aria-invalid={!!error}
        />
      </div>
    </FieldWrapper>
  );
};

export default InputPhone;
