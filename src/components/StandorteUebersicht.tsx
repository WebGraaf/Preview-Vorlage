import { useState, useRef, useEffect } from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { GoogleMaps } from './GoogleMaps';

export interface Location {
  label: string;
  address: string;
  phone: string;
  hours: string;
  mapSrc: string;
}

export interface StandorteUebersichtProps {
  title?: string;
  subtitle?: string;
  locations: Location[];
}

export function StandorteUebersicht({
  title = "Unsere Standorte",
  subtitle = "Finde den nächstgelegenen Standort",
  locations
}: StandorteUebersichtProps) {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const tabsRef = useRef<HTMLButtonElement[]>([]);
  const infoCardsRef = useRef<HTMLDivElement[]>([]);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title and subtitle
      gsap.fromTo(".locations-title",
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

      gsap.fromTo(".locations-subtitle",
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate tabs
      gsap.fromTo(tabsRef.current.filter(Boolean),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate info cards
      gsap.fromTo(infoCardsRef.current.filter(Boolean),
        { opacity: 0, y: 40, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate map container
      gsap.fromTo(mapRef.current,
        { opacity: 0, scale: 0.95, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleTabChange = (index: number) => {
    // Animate info cards transition
    if (infoCardsRef.current.length > 0) {
      gsap.to(infoCardsRef.current, {
        opacity: 0,
        scale: 0.95,
        y: 20,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          setActiveTab(index);
          gsap.to(infoCardsRef.current, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.4,
            ease: "back.out(1.7)"
          });
        }
      });
    } else {
      setActiveTab(index);
    }

    // Animate map transition
    if (mapRef.current) {
      gsap.to(mapRef.current, {
        opacity: 0,
        scale: 0.98,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          // Update map src after a brief delay
          setTimeout(() => {
            gsap.to(mapRef.current, {
              opacity: 1,
              scale: 1,
              duration: 0.4,
              ease: "back.out(1.7)"
            });
          }, 100);
        }
      });
    }
  };

  return (
    <section ref={sectionRef} className="">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="locations-title text-4xl font-bold text-text-heading mb-4">
            {title}
          </h2>
          <p className="locations-subtitle text-lg text-text-body">
            {subtitle}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-8 border-b border-border-default">
          {locations.map((location, index) => {
            return (
              <button
                key={index}
                ref={(el) => (tabsRef.current[index] = el!)}
                onClick={() => handleTabChange(index)}
                className={`location-tab flex items-center gap-2 px-6 py-3 font-semibold transition-all relative ${
                  activeTab === index
                    ? 'text-primary-600'
                    : 'text-text-body hover:text-text-heading'
                }`}
              >
                {location.label}
                {activeTab === index && (
                  <div className="tab-indicator absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600"></div>
                )}
              </button>
            );
          })}
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div ref={(el) => el && (infoCardsRef.current[0] = el)} className="info-card bg-card-bg backdrop-blur-sm rounded-lg p-4 border border-card-border">
            <h4 className="font-semibold text-text-heading mb-2 text-lg flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary-600" />
              Adresse
            </h4>
            <a href={`https://maps.google.com/?q=${encodeURIComponent(locations[activeTab].address)}`} target="_blank" rel="noopener noreferrer" className="text-text-body text-base hover:text-text-link transition-colors">
              {locations[activeTab].address}
            </a>
          </div>
          <div ref={(el) => el && (infoCardsRef.current[1] = el)} className="info-card bg-card-bg backdrop-blur-sm rounded-lg p-4 border border-card-border">
            <h4 className="font-semibold text-text-heading mb-2 text-lg flex items-center gap-2">
              <Phone className="w-5 h-5 text-primary-600" />
              Telefon
            </h4>
            <a href={`tel:${locations[activeTab].phone.replace(/\s/g, '')}`} className="text-text-body text-lg font-medium hover:text-primary-600 transition-colors">
              {locations[activeTab].phone}
            </a>
          </div>
          <div ref={(el) => el && (infoCardsRef.current[2] = el)} className="info-card bg-card-bg backdrop-blur-sm rounded-lg p-4 border border-card-border">
            <h4 className="font-semibold text-text-heading mb-2 text-lg flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary-600" />
              Öffnungszeiten
            </h4>
            <p className="text-text-body text-base whitespace-pre-line">{locations[activeTab].hours}</p>
          </div>
        </div>

        {/* Google Maps Integration */}
        <div ref={mapRef} className="map-container bg-card-bg rounded-2xl shadow-xl overflow-hidden border border-card-border">
          <GoogleMaps
            src={locations[activeTab].mapSrc}
            height="400px"
          />
        </div>
      </div>
    </section>
  );
}