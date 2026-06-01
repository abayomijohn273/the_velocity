import Image from 'next/image';

const MediaPanel = () => {
  return (
    <div className="relative hidden overflow-hidden rounded-2xl lg:block">
      <Image
        src="/assets/images/webp/auth_hero.webp"
        alt="The Velocity community members"
        width={1000}
        height={1000}
        sizes="(min-width: 1024px) 50vw, 0px"
        className="object-cover"
        priority
      />
    </div>
  );
};

export default MediaPanel;
