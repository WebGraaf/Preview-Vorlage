import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import KartenSpotlight from './KartenSpotlight';
import { useConfig } from '../config';
import { CLASS_DATA, HauptklasseCode } from '../config';

gsap.registerPlugin(ScrollTrigger);

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  link: string;
  spotlightColor?: 'primary' | 'secondary' | 'brand-500' | 'status-success' | 'status-warning' | 'status-error' | 'status-info';
}

interface KlassenUebersichtGridSpotlightProps {
  title?: string;
  features?: Feature[];
}

export const KlassenUebersichtGridSpotlight: React.FC<KlassenUebersichtGridSpotlightProps> = ({
  title = "Unsere Führerscheinklassen",
  features: propFeatures,
}) => {
  const { getActiveClasses, loading } = useConfig();
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Generate features from config if not provided via props
  const features: Feature[] = propFeatures || (() => {
    const activeClasses = getActiveClasses();
    return activeClasses.map((classCode: HauptklasseCode) => {
      const classInfo = CLASS_DATA[classCode];
      return {
        icon: classInfo.icon,
        title: classInfo.label,
        description: classInfo.description.substring(0, 100),
        link: classInfo.route,
        spotlightColor: 'primary' as const,
      };
    });
  })();

  useEffect(() => {
    if (loading || features.length === 0) return;

    const ctx = gsap.context(() => {
      // Animate title words with stagger
      gsap.fromTo(".title-word-spotlight",
        { opacity: 0, y: -20, rotationX: -90 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // Animate cards with stagger - use wrapper div for scroll animation
      cardsRef.current.filter(Boolean).forEach((card, index) => {
        if (!card) return;
        
        gsap.fromTo(card,
          {
            opacity: 0,
            y: 60,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none none"
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [loading, features.length]);

  // Show nothing while loading or if no features
  if (loading) {
    return (
      <section className="">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
          <h2 className="text-3xl font-bold text-heading mb-8 text-center">{title}</h2>
          <div className="text-center text-text-body">Laden...</div>
        </div>
      </section>
    );
  }

  if (features.length === 0) {
    return null;
  }

  // Determine grid layout based on number of features
  const featureCount = features.length;

  // Get grid classes based on feature count
  const getGridClasses = () => {
    switch (featureCount) {
      case 1:
        return 'flex justify-center';
      case 2:
        return 'grid grid-cols-1 md:grid-cols-2 gap-8';
      case 3:
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8';
      case 4:
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8';
      case 5:
        return ''; // Special layout handled separately
      case 6:
      default:
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8';
    }
  };

  // Render card component
  const renderCard = (feature: Feature, index: number, customWidth?: string) => (
    <div
      key={index}
      ref={(el) => (cardsRef.current[index] = el)}
      className={`${customWidth || ''} transform transition-transform duration-300 ease-out hover:-translate-y-2 hover:scale-105`}
    >
      <KartenSpotlight
        className="hover:bg-primary-50 hover:border-primary-500 transition-all duration-300 group flex flex-col h-full p-6"
        spotlightColor={feature.spotlightColor || 'primary'}
      >
        <div className="flex-grow">
          <div className="card-icon bg-primary-50 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-primary-200">
            <feature.icon className="w-7 h-7 text-primary-600" />
          </div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="card-title text-xl font-bold text-heading group-hover:text-primary-600 transition-colors">{feature.title}</h3>
          </div>
          <p className="text-text-body mb-4">{feature.description}</p>
        </div>
        <Link
          to={feature.link}
          className="inline-block w-full px-4 py-2 bg-card text-primary-600 rounded-lg hover:bg-primary-500 hover:text-white hover:border-transparent border border-primary-500 transition-colors font-semibold mt-auto text-center"
        >
          Mehr erfahren
        </Link>
      </KartenSpotlight>
    </div>
  );

  // Render grid based on feature count
  const renderGrid = () => {
    if (featureCount === 1) {
      // Single item: centered, 40% width on desktop
      return (
        <div className="flex justify-center">
          <div className="w-full md:w-[40%]">
            {renderCard(features[0], 0)}
          </div>
        </div>
      );
    }

    if (featureCount === 5) {
      // Special layout: 3 on top, 2 centered below
      const topRow = features.slice(0, 3);
      const bottomRow = features.slice(3, 5);

      return (
        <div className="flex flex-col gap-8">
          {/* Top row: 3 items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topRow.map((feature, index) => renderCard(feature, index))}
          </div>
          {/* Bottom row: 2 items centered with same width as top items */}
          <div className="flex justify-center gap-8">
            <div className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.333rem)]">
              {renderCard(features[3], 3)}
            </div>
            <div className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.333rem)]">
              {renderCard(features[4], 4)}
            </div>
          </div>
        </div>
      );
    }

    // Default grid layout for 2, 3, 4, 6 items
    return (
      <div className={getGridClasses()}>
        {features.map((feature, index) => renderCard(feature, index))}
      </div>
    );
  };

  return (
    <section ref={sectionRef} className="">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
        <h2 className="text-3xl font-bold text-heading mb-8 text-center">
          {title.split(' ').map((word, index) => (
            <span key={index} className="title-word-spotlight inline-block mr-2">
              {word}
            </span>
          ))}
        </h2>
        {renderGrid()}
      </div>
    </section>
  );
};