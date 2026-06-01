import Header from '@/components/layouts/header';
import Button from '@/components/ui/button';

const TopSection = () => {
  return (
    <main className="relative bg-primary min-h-screen">
      <Header />

      {/* Hero Section */}
      <div className="px-4 md:px-8 pt-20 pb-16 lg:pb-24 xl:pb-28 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl lg:leading-17 text-white font-bold mb-6">
            Join The <span className="text-secondary">Velocity</span> <br />
            <span className="text-4xl xl:text-5xl">Circle of Excellence</span>
          </h1>
          <p className="text-base md:text-lg mb-6 text-white">
            Be a part of the most exclusive global community of high-achieving professionals.{' '}
            <br className="hidden md:block" />
            Rising Stars Collaborating and Moving Together to Achieve Big Things
          </p>
          <div className="mt-12 mb-16 flex justify-center">
            <Button href="/signup" title="GET STARTED" />
          </div>
        </div>

        {/* Virtual Classroom UI Mockup */}
        <div className="relative max-w-5xl mx-auto rounded-2xl border-2 border-secondary/50 bg-[#DEDEDE]/10 overflow-hidden ">
          {/* Browser-like control dots */}
          <div className="absolute top-5 left-5 flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-[#FD5C5C]"></div>
            <div className="w-3 h-3 rounded-full bg-[#FBDB68]"></div>
            <div className="w-3 h-3 rounded-full bg-[#12D10E]"></div>
          </div>

          {/* Class title */}
          <div className="pt-12 pl-6 pb-6 bg-transparent text-white">
            <h2 className="text-base md:text-lg lg:text-xl font-semibold">
              Be a part of the Velocitiers!
            </h2>
          </div>

          {/* Main class area */}
          <div className="px-6">
            <div className="bg-[#DEDEDE]/5 h-[22rem] md:h-[28rem] rounded-xl">
              <iframe
                className="w-full h-full rounded-xl"
                src="https://www.youtube.com/embed/5atkOu7kciU?si=WkdAvkXKA6hmvjOf&controls=0&rel=0&showinfo=0&modestbranding=1&playsinline=1&disablekb=1"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture;web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>

          {/* Controls bar */}
          <div className="bg-transparent px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-6">
              <div className="w-6 h-6 bg-white/20 rounded-full"></div>
              <div className="w-6 h-6 bg-white/20 rounded-full"></div>{' '}
              <div className="w-6 h-6 bg-white/20 rounded-full"></div>
            </div>
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>{' '}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TopSection;
