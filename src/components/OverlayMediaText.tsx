import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface OverlayMediaTextProps {
  imageSrc: string;
  imageAlt?: string;
  title: string;
  description: string;
  overlayOpacity?: number;
  textPosition?: 'center' | 'bottom' | 'top';
  variant?: 'default' | 'blur';
  className?: string;
}

export const OverlayMediaText: React.FC<OverlayMediaTextProps> = ({
  imageSrc,
  imageAlt = '',
  title,
  description,
  overlayOpacity = 0.6,
  textPosition = 'center',
  variant = 'default',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate container
      gsap.fromTo(containerRef.current,
        { opacity: 0, scale: 0.95, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate title
      gsap.fromTo(".overlay-title",
        { opacity: 0, x: -50, y: 20 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate description
      gsap.fromTo(".overlay-description",
        { opacity: 0, x: -30, y: 15 },
        {
          opacity: 1,
          x: 0,
          y: 15,
          duration: 0.8,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const positionClasses = {
    center: 'items-center justify-center',
    bottom: 'items-end justify-center pb-8',
    top: 'items-start justify-center pt-8',
  };

  return (
    <div
      ref={containerRef}
      className={`relative rounded-xl overflow-hidden min-h-[400px] py-12 px-4 ${className}`}
    >
      <img
        src={imageSrc}
        alt={imageAlt}
        className={`absolute inset-0 w-full h-full object-cover ${
          variant === 'blur' ? 'filter blur-sm' : ''
        }`}
        loading="lazy"
      />
      <div
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity }}
      />
      <div className={`relative z-10 h-full flex flex-col ${positionClasses[textPosition]} px-8`}>
        <h3 className="overlay-title text-4xl font-bold text-white mb-4 max-w-2xl mx-auto text-center">{title}</h3>
        <p className="overlay-description text-white/90 text-lg max-w-2xl mx-auto text-center leading-relaxed">{description}</p>
      </div>
    </div>
  );
};
