'use client';

import { useMutation } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api/client';

/** Uploads an avatar file to ImageKit (via our API) and resolves the public URL. */
export const useUploadAvatar = () =>
  useMutation({
    mutationFn: (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      return apiFetch<{ url: string }>('/api/upload/avatar', {
        method: 'POST',
        body: formData,
      });
    },
  });
