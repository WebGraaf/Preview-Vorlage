import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

export type StapelBild = {
  /** Vollständige Bild-URL (z. B. Unsplash) */
  src: string;
  /** Alt-Text für SEO/Accessibility */
  alt: string;
};

interface TextGalerieStapelProps {
  title: string;
  description: string;
  images: StapelBild[];
  imagePosition?: 'left' | 'right';
  className?: string;
  /** Autoplay aktivieren (default: false) */
  autoplay?: boolean;
  /** Autoplay-Intervall in ms (default: 5000) */
  intervalMs?: number;
  /** Abgerundete Eckenstufe (Tailwind-Klasse), z. B. "rounded-3xl" */
  radiusClassName?: string;
}

export const TextGalerieStapel: React.FC<TextGalerieStapelProps> = ({
  title,
  description,
  images,
  imagePosition = 'left',
  className = '',
  autoplay = false,
  intervalMs = 5000,
  radiusClassName = 'rounded-3xl',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = React.useState(0);

  const handleNext = React.useCallback(() => {
    setActive((p) => (images.length ? (p + 1) % images.length : 0));
  }, [images.length]);

  const handlePrev = React.useCallback(() => {
    setActive((p) => (images.length ? (p - 1 + images.length) % images.length : 0));
  }, [images.length]);

  React.useEffect(() => {
    if (!autoplay || images.length <= 1) return;
    const id = setInterval(handleNext, intervalMs);
    return () => clearInterval(id);
  }, [autoplay, intervalMs, handleNext, images.length]);

  // kleine Zufallsrotation für Tiefenwirkung bei inaktiven Karten
  const randRot = React.useCallback(() => Math.floor(Math.random() * 11) - 5, []);

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

      // Gallery slide in from left or right based on position
      const galleryX = imagePosition === 'left' ? -100 : 100;
      tl.fromTo(
        galleryRef.current,
        { opacity: 0, x: galleryX },
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

  if (!images?.length) {
    return (
      <div
        ref={containerRef}
        className={`bg-transparent py-0 px-0 ${className}`}
      >
        <div
          className={`flex flex-col md:flex-row gap-8 ${
            imagePosition === 'right' ? 'md:flex-row-reverse' : ''
          }`}
        >
          <div ref={galleryRef} className="md:w-1/2">
            <div className="border border-dashed rounded-xl p-6 text-center text-text-muted">
              Keine Bilder übergeben. Bitte prop <code>images</code> füllen.
            </div>
          </div>
          <div ref={textRef} className="md:w-1/2 flex flex-col justify-center p-8 text-left">
            <h3 className="text-3xl font-bold text-neutral-900 mb-4">{title}</h3>
            <p className="text-neutral-600 leading-relaxed">{description}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`bg-transparent py-0 px-0 ${className}`}
    >
      <div
        className={`flex flex-col md:flex-row gap-8 ${
          imagePosition === 'right' ? 'md:flex-row-reverse' : ''
        }`}
      >
        <div ref={galleryRef} className="md:w-1/2">
          <div className="flex flex-col items-center">
            {/* Bild-Stapel / Bühne */}
            <div className="relative w-80 h-80 carousel-stage">
              <AnimatePresence>
                {images.map((img, idx) => {
                  const isActive = idx === active;
                  return (
                    <motion.div
                      key={img.src}
                      initial={{
                        opacity: 0,
                        scale: 0.95,
                        z: -100,
                        rotate: randRot(),
                      }}
                      animate={{
                        opacity: isActive ? 1 : 0.75,
                        scale: isActive ? 1 : 0.97,
                        z: isActive ? 0 : -100,
                        rotate: isActive ? 0 : randRot(),
                        zIndex: isActive ? 40 : images.length + 2 - idx,
                        y: isActive ? [0, -60, 0] : 0,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.95,
                        z: 120,
                        rotate: randRot(),
                      }}
                      transition={{ duration: 0.45, ease: 'easeInOut' }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      onDragEnd={(event, info) => {
                        const swipeThreshold = 50;
                        if (info.offset.x > swipeThreshold) {
                          handlePrev();
                        } else if (info.offset.x < -swipeThreshold) {
                          handleNext();
                        }
                      }}
                      className="absolute inset-0 origin-bottom md:pointer-events-none"
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        className={cn('w-full h-full object-cover object-center', radiusClassName)}
                        draggable={false}
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Steuerung & kleine Vorschau/Infos */}
            <div className="flex flex-col items-center py-4 carousel-controls">
              <div className="text-center">
                <div className="text-sm text-text-muted mb-2">Bild {active + 1} / {images.length}</div>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <button
                  type="button"
                  aria-label="Vorheriges Bild"
                  onClick={handlePrev}
                  className="h-9 w-9 rounded-full bg-primary flex items-center justify-center group"
                >
                  <ChevronLeft className="h-5 w-5 text-white transition-transform duration-300 group-hover:-rotate-12" />
                </button>
                <button
                  type="button"
                  aria-label="Nächstes Bild"
                  onClick={handleNext}
                  className="h-9 w-9 rounded-full bg-primary flex items-center justify-center group"
                >
                  <ChevronRight className="h-5 w-5 text-white transition-transform duration-300 group-hover:rotate-12" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div ref={textRef} className="md:w-1/2 flex flex-col justify-center p-8 text-left">
          <h3 className="text-3xl font-bold text-neutral-900 mb-4">{title}</h3>
          <p className="text-neutral-600 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};