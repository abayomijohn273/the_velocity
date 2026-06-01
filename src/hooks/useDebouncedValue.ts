'use client';

import { useEffect, useState } from 'react';

/** Returns a debounced copy of `value` that updates after `delay` ms of quiet. */
export const useDebouncedValue = <T>(value: T, delay = 400): T => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
};
