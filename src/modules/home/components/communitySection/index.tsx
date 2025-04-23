'use client';
import Image1 from '../../../../../public/assets/images/webp/groups/image1.webp';
import Image10 from '../../../../../public/assets/images/webp/groups/image10.webp';
import Image11 from '../../../../../public/assets/images/webp/groups/image11.webp';
import Image12 from '../../../../../public/assets/images/webp/groups/image12.webp';
import Image13 from '../../../../../public/assets/images/webp/groups/image13.webp';
import Image2 from '../../../../../public/assets/images/webp/groups/image2.webp';
import Image3 from '../../../../../public/assets/images/webp/groups/image3.webp';
import Image4 from '../../../../../public/assets/images/webp/groups/image4.webp';
import Image5 from '../../../../../public/assets/images/webp/groups/image5.webp';
import Image6 from '../../../../../public/assets/images/webp/groups/image6.webp';
import Image7 from '../../../../../public/assets/images/webp/groups/image7.webp';
import Image8 from '../../../../../public/assets/images/webp/groups/image8.webp';
import Image9 from '../../../../../public/assets/images/webp/groups/image9.webp';

import ArrowBox from './arrowBox';
import MarqueeRow from './marqueeRow';

const CommunitySection = () => {
  return (
    <section className="relative w-full pt-[6rem] md:pt-[8rem] lg:pt-[10rem] xl:pt-[11rem] pb-20 lg:pb-24 bg-[#03311C]">
      <div className="absolute top-0 right-0 md:right-8 lg:right-10 px-5 sm:px-6 lg:px-8 -translate-y-10 md:-translate-y-12 lg:-translate-y-16 xl:-translate-y-20 z-10">
        <ArrowBox />
      </div>

      {/* Header content area */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 mb-12 md:mb-16 lg:mb-20">
        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl xl:leading-17 text-[#c8fe41] font-bold mb-6 md:mb-8 max-w-4xl leading-tight">
          The Velocity is a powerful circle of people, most driven professionals, founders,
          creatives, and changemakers.
        </h1>
        <p className="text-base md:text-lg text-white opacity-90 w-full md:w-8/12 lg:w-7/12 xl:w-6/12">
          Whether you’re building a startup, climbing the corporate ladder, or shaping your craft,
          The Velocity gives you the fuel, network, and spotlight to grow fast and go far.
        </p>
      </div>

      <div className="max-w-full mx-auto">
        {/* First row - mostly wide boxes */}
        <MarqueeRow
          direction="left"
          speed={0.8}
          boxes={[
            {
              width: '480px',
              height: '240px',
              mobileHeight: '140px',
              mobileWidth: '260px',
              image: Image1,
            },
            {
              width: '360px',
              height: '240px',
              mobileHeight: '140px',
              mobileWidth: '220px',
              image: Image2,
            },
            {
              width: '520px',
              height: '240px',
              mobileHeight: '140px',
              mobileWidth: '280px',
              image: Image3,
            },
            {
              width: '420px',
              height: '240px',
              mobileHeight: '140px',
              mobileWidth: '240px',
              image: Image4,
            },
            {
              width: '380px',
              height: '240px',
              mobileHeight: '140px',
              mobileWidth: '230px',
              image: Image5,
            },
          ]}
        />

        {/* Second row - mixed sizes */}
        <MarqueeRow
          direction="right"
          speed={1}
          boxes={[
            {
              width: '420px',
              height: '220px',
              mobileHeight: '130px',
              mobileWidth: '240px',
              image: Image6,
            },
            {
              width: '320px',
              height: '220px',
              mobileHeight: '130px',
              mobileWidth: '200px',
              image: Image7,
            },
            {
              width: '380px',
              height: '220px',
              mobileHeight: '130px',
              mobileWidth: '230px',
              image: Image8,
            },
            {
              width: '500px',
              height: '220px',
              mobileHeight: '130px',
              mobileWidth: '270px',
              image: Image9,
            },
            {
              width: '360px',
              height: '220px',
              mobileHeight: '130px',
              mobileWidth: '220px',
              image: Image10,
            },
          ]}
        />

        {/* Third row - smaller boxes */}
        <MarqueeRow
          direction="left"
          speed={0.9}
          boxes={[
            {
              width: '340px',
              height: '190px',
              mobileHeight: '120px',
              mobileWidth: '210px',
              image: Image11,
            },
            {
              width: '380px',
              height: '190px',
              mobileHeight: '120px',
              mobileWidth: '230px',
              image: Image12,
            },
            {
              width: '420px',
              height: '190px',
              mobileHeight: '120px',
              mobileWidth: '240px',
              image: Image13,
            },
            {
              width: '300px',
              height: '190px',
              mobileHeight: '120px',
              mobileWidth: '190px',
              image: Image4,
            },
            {
              width: '390px',
              height: '190px',
              mobileHeight: '120px',
              mobileWidth: '235px',
              image: Image5,
            },
          ]}
        />
      </div>
    </section>
  );
};

export default CommunitySection;
