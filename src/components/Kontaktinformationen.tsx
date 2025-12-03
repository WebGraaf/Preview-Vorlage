import { Phone, Clock, MapPin, Mail } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

export interface Location {
  label: string;
  address: string;
  phone: string;
  hours: string;
}

export function Kontaktinformationen() {
  const { config, loading } = useConfig();
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const contactRefs = useRef<HTMLDivElement[]>([]);
  const tabsRef = useRef<HTMLButtonElement[]>([]);

  // Get locations from config
  const locations: Location[] = config?.standorte.map(standort => ({
    label: standort.name,
    address: standort.adresse,
    phone: standort.telefon,
    hours: standort.oeffnungszeiten
  })) || [];

  // Get email from config
  const email = config?.fahrschule.kontakt.email || 'info@fahrschule.de';

  const contactItems = locations.length > 0 ? [
    {
      icon: Phone,
      label: 'Telefon',
      value: locations[activeTab]?.phone || '',
      color: 'primary'
    },
    {
      icon: Clock,
      label: 'Öffnungszeiten',
      value: locations[activeTab]?.hours || '',
      color: 'primary'
    },
    {
      icon: MapPin,
      label: 'Adresse',
      value: locations[activeTab]?.address || '',
      color: 'primary'
    },
    {
      icon: Mail,
      label: 'E-Mail',
      value: email,
      color: 'primary'
    }
  ] : [];

  useEffect(() => {
    if (loading || locations.length === 0) return;

    const ctx = gsap.context(() => {
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
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate contact cards with stagger
      gsap.fromTo(contactRefs.current.filter(Boolean),
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Add hover effects for contact cards
      contactRefs.current.filter(Boolean).forEach((card) => {
        const hoverTl = gsap.timeline({ paused: true });

        hoverTl.to(card, {
          y: -5,
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out"
        })
        .to(card.querySelector('.contact-icon'), {
          scale: 1.1,
          rotation: 5,
          duration: 0.3,
          ease: "back.out(2)"
        }, 0)
        .to(card.querySelector('.contact-gradient'), {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out"
        }, 0);

        card.addEventListener('mouseenter', () => hoverTl.play());
        card.addEventListener('mouseleave', () => hoverTl.reverse());
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [loading, locations.length]);

  const handleTabChange = (index: number) => {
    // Animate contact cards transition
    if (contactRefs.current.length > 0) {
      gsap.to(contactRefs.current, {
        opacity: 0,
        scale: 0.95,
        y: 20,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          setActiveTab(index);
          gsap.to(contactRefs.current, {
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
  };

  // Show loading state
  if (loading) {
    return (
      <section className="">
        <div className="max-w-6xl mx-auto px-4 text-center text-text-body">
          Laden...
        </div>
      </section>
    );
  }

  // Show nothing if no locations
  if (locations.length === 0) {
    return null;
  }

  return (
    <section ref={sectionRef} className="">
      <div className="max-w-6xl mx-auto px-4">
        {locations.length > 1 && (
          <div className="flex flex-wrap gap-2 justify-center mb-8 border-b border-border-default">
            {locations.map((location, index) => (
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
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactItems.map((item, index) => {
            const Icon = item.icon;
            const colorClasses = {
              primary: 'from-primary-500 to-primary-600'
            };

            return (
              <div
                key={index}
                ref={(el) => (contactRefs.current[index] = el!)}
                className="contact-card bg-card-bg backdrop-blur-sm border border-card-border rounded-2xl p-6 hover:bg-hover-bg transition-all hover:scale-105"
              >
                <div className="flex items-center mb-4">
                  <div className={`contact-gradient w-10 h-10 rounded-xl bg-gradient-to-br ${colorClasses[item.color as keyof typeof colorClasses]} flex items-center justify-center mr-3`}>
                    <Icon className="contact-icon w-5 h-5 text-white" />
                  </div>
                  <div className="text-lg font-semibold text-text-heading">
                    {item.label}
                  </div>
                </div>
                {item.label === 'Telefon' ? (
                  <a href={`tel:${item.value.replace(/\s/g, '')}`} className="text-base text-text-body hover:text-primary-600 transition-colors">
                    {item.value}
                  </a>
                ) : item.label === 'Adresse' ? (
                  <a href={`https://maps.google.com/?q=${encodeURIComponent(item.value)}`} target="_blank" rel="noopener noreferrer" className="text-base text-text-body hover:text-primary-600 transition-colors">
                    {item.value}
                  </a>
                ) : item.label === 'E-Mail' ? (
                  <a href={`mailto:${item.value}`} className="text-base text-text-body hover:text-primary-600 transition-colors">
                    {item.value}
                  </a>
                ) : (
                  <div className="text-base text-text-body whitespace-pre-line">
                    {item.value}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}