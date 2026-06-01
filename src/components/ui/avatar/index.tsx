import Image from 'next/image';

interface AvatarProps {
  src?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  size?: number;
  className?: string;
}

/** Circular avatar; falls back to the member's initials when no image is set. */
const Avatar = ({ src, firstName, lastName, size = 96, className }: AvatarProps) => {
  const initials = `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase() || '?';
  const name = `${firstName ?? ''} ${lastName ?? ''}`.trim() || 'Member';

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-full bg-primary/10 ${className ?? ''}`}
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image
          src={src}
          alt={name}
          width={1000}
          height={1000}
          quality={100}
          sizes={`${size}px`}
          className="object-cover"
        />
      ) : (
        <span className="font-semibold text-primary" style={{ fontSize: size * 0.34 }}>
          {initials}
        </span>
      )}
    </div>
  );
};

export default Avatar;
