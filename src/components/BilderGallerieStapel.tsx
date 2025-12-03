"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export type StapelBild = {
  /** Vollständige Bild-URL (z. B. Unsplash) */
  src: string;
  /** Alt-Text für SEO/Accessibility */
  alt: string;
};

export interface BilderGallerieStapelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Liste der Bilder, die als Stapel/Carousel angezeigt werden */
  images: StapelBild[];
  /** Autoplay aktivieren (default: false) */
  autoplay?: boolean;
  /** Autoplay-Intervall in ms (default: 5000) */
  intervalMs?: number;
  /** Abgerundete Eckenstufe (Tailwind-Klasse), z. B. "rounded-3xl" */
  radiusClassName?: string;
}

export default function BilderGallerieStapel({
  images,
  autoplay = false,
  intervalMs = 5000,
  radiusClassName = "rounded-3xl",
  className,
  ...rest
}: BilderGallerieStapelProps) {
  const [active, setActive] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const controlsRef = React.useRef<HTMLDivElement>(null);

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

  React.useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate container entrance
      gsap.fromTo(containerRef.current,
        { opacity: 0, scale: 0.9, y: 50 },
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

      // Animate controls
      gsap.fromTo(controlsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Add hover effects for control buttons
      const buttons = controlsRef.current?.querySelectorAll('button');
      buttons?.forEach((button) => {
        const hoverTl = gsap.timeline({ paused: true });

        hoverTl.to(button, {
          scale: 1.1,
          duration: 0.2,
          ease: "back.out(2)"
        });

        button.addEventListener('mouseenter', () => hoverTl.play());
        button.addEventListener('mouseleave', () => hoverTl.reverse());
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // kleine Zufallsrotation für Tiefenwirkung bei inaktiven Karten
  const randRot = React.useCallback(() => Math.floor(Math.random() * 11) - 5, []);

  if (!images?.length) {
    return (
      <div
        className={cn(
          "w-full max-w-5xl mx-auto px-4 md:px-8 lg:px-12 py-10",
          className
        )}
        {...rest}
      >
        <div className="border border-dashed rounded-xl p-6 text-center text-text-muted">
          Keine Bilder übergeben. Bitte prop <code>images</code> füllen.
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full max-w-5xl mx-auto px-4 md:px-8 lg:px-12 py-10",
        className
      )}
      {...rest}
    >
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
                  transition={{ duration: 0.45, ease: "easeInOut" }}
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
                    className={cn("w-full h-full object-cover object-center", radiusClassName)}
                    draggable={false}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Steuerung & kleine Vorschau/Infos */}
        <div ref={controlsRef} className="flex flex-col items-center py-4 carousel-controls">
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
  );
}