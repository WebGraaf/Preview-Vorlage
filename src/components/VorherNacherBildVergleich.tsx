import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface VorherNacherBildVergleichProps {
  title?: string;
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

const BeforeAfterSlider = React.forwardRef<HTMLDivElement, BeforeAfterSliderProps>(({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
}, ref) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleStart = () => {
    setIsDragging(true);
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('touchend', handleEnd);
      return () => {
        document.removeEventListener('mouseup', handleEnd);
        document.removeEventListener('touchend', handleEnd);
      };
    }
  }, [isDragging]);

  return (
    <div
      ref={(el) => {
        if (ref && typeof ref === 'function') {
          ref(el);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
        }
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
      }}
      className="relative w-full aspect-video overflow-hidden rounded-xl cursor-ew-resize select-none slider-container"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseDown={handleStart}
      onTouchStart={handleStart}
    >
      <div className="absolute inset-0">
        <img src={afterImage} alt={afterLabel} className="w-full h-full object-cover" />
        {afterLabel && (
          <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1.5 rounded-full text-sm font-medium">
            {afterLabel}
          </div>
        )}
      </div>

      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img src={beforeImage} alt={beforeLabel} className="w-full h-full object-cover" />
        {beforeLabel && (
          <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1.5 rounded-full text-sm font-medium">
            {beforeLabel}
          </div>
        )}
      </div>

      <div
        className="slider-handle absolute top-0 bottom-0 w-1 bg-primary shadow-lg"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-primary rounded-full shadow-xl flex items-center justify-center">
          <div className="flex items-center space-x-1">
            <ChevronLeft className="w-5 h-5 text-white" />
            <ChevronRight className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
});

BeforeAfterSlider.displayName = 'BeforeAfterSlider';

const VorherNacherBildVergleich: React.FC<VorherNacherBildVergleichProps> = ({
  title,
  beforeImage,
  afterImage,
  beforeLabel = "Vorher",
  afterLabel = "Nachher",
  className = "",
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title
      gsap.fromTo(".slider-title",
        { opacity: 0, y: -30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate slider container
      gsap.fromTo(sliderRef.current,
        { opacity: 0, scale: 0.9, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Add hover effects for slider
      const slider = sliderRef.current;
      if (slider) {
        const hoverTl = gsap.timeline({ paused: true });

        hoverTl.to(slider, {
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out"
        })
        .to(slider.querySelector('.slider-handle'), {
          scale: 1.1,
          duration: 0.3,
          ease: "back.out(2)"
        }, 0);

        slider.addEventListener('mouseenter', () => hoverTl.play());
        slider.addEventListener('mouseleave', () => hoverTl.reverse());
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={className}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
        {title && <h2 className="slider-title text-3xl font-bold text-neutral-900 mb-8 text-center">{title}</h2>}
        <div className="max-w-4xl mx-auto">
          <BeforeAfterSlider
            ref={sliderRef}
            beforeImage={beforeImage}
            afterImage={afterImage}
            beforeLabel={beforeLabel}
            afterLabel={afterLabel}
          />
        </div>
      </div>
    </section>
  );
};

export default VorherNacherBildVergleich;