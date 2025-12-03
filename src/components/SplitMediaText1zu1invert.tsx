import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SplitMediaText1zu1invertProps {
  imageSrc: string;
  imageAlt?: string;
  title: string;
  description: string;
  imagePosition?: 'left' | 'right';
  variant?: 'default' | 'muted' | 'outline';
  className?: string;
}

export const SplitMediaText1zu1invert: React.FC<SplitMediaText1zu1invertProps> = ({
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

      // Container fade in with rotation effect
      tl.fromTo(
        containerRef.current,
        { opacity: 0, y: 60, rotationX: -10 },
        { opacity: 1, y: 0, rotationX: 0, duration: 0.8, ease: 'power2.out' }
      );

      // Image slide in from right or left based on position with scale effect
      const imageX = imagePosition === 'left' ? -120 : 120;
      tl.fromTo(
        imageRef.current,
        { opacity: 0, x: imageX, scale: 0.8, rotationZ: imagePosition === 'left' ? 5 : -5 },
        { opacity: 1, x: 0, scale: 1, rotationZ: 0, duration: 0.8, ease: 'back.out(1.7)' },
        '-=0.5'
      );

      // Text content staggered reveal with wave effect
      tl.fromTo(
        textRef.current?.children || [],
        { opacity: 0, x: -40, skewX: 5 },
        {
          opacity: 1,
          x: 0,
          skewX: 0,
          duration: 0.7,
          stagger: 0.2,
          ease: 'power3.out',
        },
        '-=0.5'
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
    <div
      ref={containerRef}
      className={`rounded-xl overflow-hidden py-0 px-0 ${variantClasses[variant]} ${className}`}
    >
      <div
        className={`flex flex-col md:flex-row gap-8 ${
          imagePosition === 'right' ? 'md:flex-row-reverse' : ''
        }`}
      >
        <div ref={imageRef} className="md:w-1/2 aspect-square">
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
  );
};