'use client';
import { StaticImageData } from 'next/image';
import { useEffect, useRef } from 'react';
import ImageBox from './imageBox';
interface MarqueeRowProps {
  direction: 'left' | 'right';
  speed?: number;
  boxes: Array<{
    width: string;
    height: string;
    mobileHeight: string;
    mobileWidth?: string;
    image?: StaticImageData;
  }>;
}

// MarqueeRow component that creates the scrolling images
const MarqueeRow = ({ direction = 'left', speed = 1, boxes }: MarqueeRowProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const firstGroupRef = useRef<HTMLDivElement>(null);
  const marqueeId = useRef(`marquee-${Math.random().toString(36).substring(2, 9)}`).current;

  useEffect(() => {
    const content = contentRef.current;
    const firstGroup = firstGroupRef.current;
    if (!content || !firstGroup) return;

    // Function to update animation
    const updateAnimation = () => {
      // Calculate exact width of the first group of items
      const contentWidth = firstGroup.offsetWidth;

      // Get the gap size from the CSS (gap-4 in Tailwind is 1rem = 16px)
      const gap = 16;

      // Calculate duration based on speed and width
      // Including the gap in the calculation to maintain consistent speed
      const duration = (contentWidth + gap) / (50 * speed);

      // Create unique keyframes for this instance
      const styleSheet = document.createElement('style');
      styleSheet.id = `${marqueeId}-style`;

      // Direction-specific keyframes with consistent gap
      if (direction === 'left') {
        styleSheet.textContent = `
          @keyframes ${marqueeId}-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-${contentWidth}px); }
          }
        `;
      } else {
        styleSheet.textContent = `
          @keyframes ${marqueeId}-scroll {
            0% { transform: translateX(-${contentWidth}px); }
            100% { transform: translateX(0); }
          }
        `;
      }

      // Remove any existing style sheet
      const existingStyle = document.getElementById(`${marqueeId}-style`);
      if (existingStyle) {
        existingStyle.remove();
      }

      document.head.appendChild(styleSheet);

      // Apply the animation
      content.style.animation = `${marqueeId}-scroll ${duration}s linear infinite`;
      content.style.animationFillMode = 'forwards';
      content.style.willChange = 'transform';
    };

    // Initial setup
    updateAnimation();

    // Update on window resize with debounce
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        updateAnimation();
      }, 100);
    };

    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
      const sheet = document.getElementById(`${marqueeId}-style`);
      if (sheet) {
        sheet.remove();
      }
    };
  }, [direction, speed, marqueeId]);

  return (
    <div className="overflow-hidden py-2">
      <div className="relative">
        <div
          ref={contentRef}
          className="flex whitespace-nowrap"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* First set of images with consistent gap */}
          <div ref={firstGroupRef} className="flex">
            {boxes.map((box, index) => (
              <div
                key={`row1-${index}`}
                className="pr-4"
                style={index === 0 ? { paddingLeft: '0' } : {}}
              >
                <ImageBox
                  width={box.width}
                  height={box.height}
                  mobileHeight={box.mobileHeight}
                  mobileWidth={box.mobileWidth}
                  image={box.image}
                />
              </div>
            ))}
          </div>

          {/* Duplicate set with exact same structure and gap */}
          <div className="flex pl-4">
            {' '}
            {/* Added gap before the second set */}
            {boxes.map((box, index) => (
              <div
                key={`row2-${index}`}
                className="pr-4"
                style={index === boxes.length - 1 ? { paddingRight: '0' } : {}}
              >
                <ImageBox
                  width={box.width}
                  height={box.height}
                  mobileHeight={box.mobileHeight}
                  mobileWidth={box.mobileWidth}
                  image={box.image}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarqueeRow;
