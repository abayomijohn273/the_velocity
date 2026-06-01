'use client';

import { Camera, Trash } from '@phosphor-icons/react';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import {
  ACCEPTED_IMAGE_ACCEPT,
  ACCEPTED_IMAGE_TYPES,
  MAX_AVATAR_BYTES,
} from '@/lib/constants/upload';

interface AvatarUploadProps {
  value: File | null;
  existingUrl?: string | null;
  onChange: (file: File | null) => void;
  onRemoveExisting?: () => void;
  label?: string;
  disabled?: boolean;
}

/**
 * Optional profile-photo picker. Holds the selected File locally (no upload
 * happens here) and previews it; the parent uploads on form submit.
 */
const AvatarUpload = ({
  value,
  existingUrl,
  onChange,
  onRemoveExisting,
  label = 'Profile photo',
  disabled,
}: AvatarUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!value) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(value);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [value]);

  const shownUrl = preview ?? existingUrl ?? null;

  const handleFile = (file?: File) => {
    if (!file) return;
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      toast.error('Use a JPG, PNG, or WEBP image.');
      return;
    }
    if (file.size > MAX_AVATAR_BYTES) {
      toast.error('Image is too large. Maximum size is 5MB.');
      return;
    }
    onChange(file);
  };

  const handleRemove = () => {
    if (inputRef.current) inputRef.current.value = '';
    if (value) {
      onChange(null);
    } else if (existingUrl) {
      onRemoveExisting?.();
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-semibold text-black">{label}</span>
      <div className="flex items-center gap-4">
        <div
          className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-primary/10 ring-2 ring-secondary/20"
          style={
            shownUrl
              ? {
                  backgroundImage: `url(${shownUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }
              : undefined
          }
        >
          {!shownUrl && (
            <span className="absolute inset-0 flex items-center justify-center text-gray-400">
              <Camera size={26} />
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={disabled}
              className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-black transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {shownUrl ? 'Change photo' : 'Upload photo'}
            </button>
            {shownUrl && (
              <button
                type="button"
                onClick={handleRemove}
                disabled={disabled}
                aria-label="Remove photo"
                className="flex items-center gap-1.5 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Trash size={16} />
                Remove
              </button>
            )}
          </div>
          <span className="text-xs text-gray-400">JPG, PNG or WEBP. Max 5MB. Optional.</span>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_IMAGE_ACCEPT}
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
        aria-label="Upload profile photo"
        disabled={disabled}
      />
    </div>
  );
};

export default AvatarUpload;
