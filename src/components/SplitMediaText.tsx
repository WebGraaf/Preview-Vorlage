import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SplitMediaTextProps {
  imageSrc: string;
  imageAlt?: string;
  title: string;
  description: string;
  imagePosition?: 'left' | 'right';
  variant?: 'default' | 'muted' | 'outline';
  className?: string;
}

export const SplitMediaText: React.FC<SplitMediaTextProps> = ({
  imageSrc,
  imageAlt = '',
  title,
  description,
  imagePosition = 'left',
  variant = 'default',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      });

      // Container fade in
      tl.fromTo(
        containerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      );

      // Image slide in from left or right based on position
      const imageX = imagePosition === 'left' ? -100 : 100;
      tl.fromTo(
        imageRef.current,
        { opacity: 0, x: imageX },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.4'
      );

      // Text content staggered reveal
      tl.fromTo(
        textRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: 'power2.out',
        },
        '-=0.4'
      );
    }, containerRef);

    return () => ctx.revert();
  }, [imagePosition]);

  const variantClasses = {
    default: 'bg-card-bg border border-card-border',
    muted: 'bg-card-tint border border-card-border',
    outline: 'bg-transparent border-2 border-primary-500',
  };

  return (
    <section ref={containerRef} className="">
      <div
        className={`rounded-xl overflow-hidden ${variantClasses[variant]} ${className}`}
      >
        <div
          className={`flex flex-col md:flex-row gap-8 ${
            imagePosition === 'right' ? 'md:flex-row-reverse' : ''
          }`}
        >
          <div ref={imageRef} className="md:w-1/2">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div ref={textRef} className="md:w-1/2 flex flex-col justify-center p-8 text-left">
            <h3 className="text-3xl font-bold text-neutral-900 mb-4">{title}</h3>
            <p className="text-neutral-600 leading-relaxed">{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
