import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Team {
  imageSrc: string;
  imageAlt?: string;
  title: string;
  description: string;
}

interface TeamBilderProps {
  teams: Team[];
  variant?: 'default' | 'muted' | 'outline';
  className?: string;
}

export const TeamBilder: React.FC<TeamBilderProps> = ({
  teams,
  variant = 'default',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Container fade in
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Staggered card reveals
      gsap.fromTo(
        cardRefs.current.filter(Boolean),
        { opacity: 0, y: 60, scale: 0.8, rotationY: 15 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 0.8,
          stagger: 0.3,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Add hover effects to cards
      cardRefs.current.filter(Boolean).forEach((card) => {
        if (card) {
          const image = card.querySelector('img');
          const text = card.querySelector('.p-4');

          card.addEventListener('mouseenter', () => {
            gsap.to(card, { y: -10, duration: 0.3, ease: 'power2.out' });
            if (image) {
              gsap.to(image, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
            }
            if (text) {
              gsap.to(text, { y: -5, duration: 0.3, ease: 'power2.out' });
            }
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out' });
            if (image) {
              gsap.to(image, { scale: 1, duration: 0.3, ease: 'power2.out' });
            }
            if (text) {
              gsap.to(text, { y: 0, duration: 0.3, ease: 'power2.out' });
            }
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [teams]);

  const variantClasses = {
    default: 'bg-card-bg border border-card-border',
    muted: 'bg-card-bg border border-card-border',
    outline: 'bg-card-bg border border-card-border',
  };

  return (
    <div
      ref={containerRef}
      className={`flex flex-col md:flex-row gap-8 justify-center ${className}`}
    >
      {teams.slice(0, 2).map((team, index) => (
        <div
          key={index}
          ref={(el) => (cardRefs.current[index] = el)}
          className={`md:w-1/2 rounded-xl overflow-hidden ${variantClasses[variant]} max-w-sm mx-auto md:mx-0 cursor-pointer`}
        >
          <div className="grid grid-rows-[2fr 1fr] gap-0">
            <div className="h-full overflow-hidden">
              <img
                src={team.imageSrc}
                alt={team.imageAlt || ''}
                className="w-full h-full object-cover aspect-[2/3] transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <div className="p-4 flex flex-col justify-center">
              <h3 className="text-lg font-bold text-neutral-900 mb-2">{team.title}</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">{team.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};