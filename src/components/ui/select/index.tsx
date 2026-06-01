'use client';

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { CaretUpDown, Check } from '@phosphor-icons/react';
import { useId } from 'react';
import FieldWrapper from '@/components/ui/fieldWrapper';
import { inputBaseClass } from '@/components/ui/inputStyles';
import type { SelectOption } from '@/lib/constants/currentRoles';

export interface SelectProps {
  label?: string;
  error?: string;
  value?: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  id?: string;
}

/** Accessible dropdown built on Headless UI's Listbox. Controlled. */
const Select = ({
  label,
  error,
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  id,
}: SelectProps) => {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const selected = options.find((option) => option.value === value);

  return (
    <FieldWrapper label={label} htmlFor={selectId} error={error}>
      <Listbox value={value ?? ''} onChange={onChange}>
        <div className="relative">
          <ListboxButton
            id={selectId}
            aria-invalid={!!error}
            className={`${inputBaseClass(!!error)} flex items-center justify-between text-left`}
          >
            <span className={selected ? 'text-black' : 'text-gray-400'}>
              {selected?.label ?? placeholder}
            </span>
            <CaretUpDown size={18} className="text-gray-400" />
          </ListboxButton>
          <ListboxOptions
            anchor="bottom"
            className="z-50 mt-1 max-h-60 w-[var(--button-width)] overflow-auto rounded-lg border border-gray-100 bg-white py-1 shadow-lg focus:outline-none"
          >
            {options.map((option) => (
              <ListboxOption
                key={option.value}
                value={option.value}
                className="flex cursor-pointer items-center justify-between px-4 py-2.5 text-sm text-black data-[focus]:bg-secondary/10 data-[selected]:font-semibold"
              >
                {({ selected: isSelected }) => (
                  <>
                    <span>{option.label}</span>
                    {isSelected && <Check size={16} className="text-secondary" />}
                  </>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </FieldWrapper>
  );
};

export default Select;
