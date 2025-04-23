import Image, { StaticImageData } from 'next/image';

const ImageBox = ({
  width,
  height,
  mobileHeight,
  mobileWidth,
  image,
}: {
  width: string;
  height: string;
  mobileHeight: string;
  mobileWidth?: string;
  image?: StaticImageData;
}) => {
  return (
    <div
      className="rounded-2xl bg-transparent flex-shrink-0 flex items-center justify-center"
      style={{
        width: mobileWidth ? `clamp(${mobileWidth}, calc(${mobileWidth} + 15vw), ${width})` : width,
        height: `clamp(${mobileHeight}, calc(${mobileHeight} + 5vw), ${height})`,
      }}
    >
      {image && (
        <Image src={image} alt="Image" className="w-full h-full object-cover rounded-2xl" />
      )}
    </div>
  );
};

export default ImageBox;
