import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SplitMediaTextInvertProps {
  imageSrc: string;
  imageAlt?: string;
  title: string;
  description: string;
  imagePosition?: 'left' | 'right';
  variant?: 'default' | 'muted' | 'outline';
  className?: string;
}

export const SplitMediaTextInvert: React.FC<SplitMediaTextInvertProps> = ({
  imageSrc,
  imageAlt = '',
  title,
  description,
  imagePosition = 'right',
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

      // Container slide in from bottom with perspective
      tl.fromTo(
        containerRef.current,
        { opacity: 0, y: 80, rotationY: 20 },
        { opacity: 1, y: 0, rotationY: 0, duration: 0.8, ease: 'power2.out' }
      );

      // Image slide in from right or left with blur effect
      const imageX = imagePosition === 'left' ? -150 : 150;
      tl.fromTo(
        imageRef.current,
        { opacity: 0, x: imageX, filter: 'blur(10px)' },
        { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out' },
        '-=0.6'
      );

      // Text content staggered reveal with typewriter effect
      tl.fromTo(
        textRef.current?.children || [],
        { opacity: 0, x: 50, scaleX: 0 },
        {
          opacity: 1,
          x: 0,
          scaleX: 1,
          duration: 0.6,
          stagger: 0.25,
          ease: 'power3.out',
          transformOrigin: 'left center',
        },
        '-=0.6'
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