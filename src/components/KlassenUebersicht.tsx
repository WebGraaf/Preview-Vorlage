import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Subclass {
  code: string;
  description: string;
}

interface Tab {
  label: string;
  title: string;
  content: string;
  link: string;
  subclasses: Subclass[];
}

interface KlassenUebersichtProps {
  title?: string;
  subtitle?: string;
  tabs?: Tab[];
  buttonText?: string;
}

export function KlassenUebersicht({
  title = "Führerschein Klassen",
  subtitle = "Erfahren Sie mehr über die verschiedenen Führerschein-Klassen",
  buttonText = "Mehr erfahren",
  tabs = []
}: KlassenUebersichtProps) {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLButtonElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title and subtitle
      gsap.fromTo(".overview-title",
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

      gsap.fromTo(".overview-subtitle",
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

      // Animate content container
      gsap.fromTo(contentRef.current,
        { opacity: 0, scale: 0.95, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleTabChange = (index: number) => {
    // Animate content transition
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 0,
        scale: 0.98,
        y: 10,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          setActiveTab(index);
          gsap.to(contentRef.current, {
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

  if (tabs.length === 0) {
    return null;
  }

  return (
    <section ref={sectionRef} className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="overview-title text-4xl font-bold text-text-heading mb-4">
            {title}
          </h2>
          <p className="overview-subtitle text-lg text-text-body">
            {subtitle}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-8 border-b border-border-default">
          {tabs.map((tab, index) => {
            return (
              <button
                key={index}
                ref={(el) => (tabsRef.current[index] = el!)}
                onClick={() => handleTabChange(index)}
                className={`tab-button flex items-center gap-2 px-6 py-3 font-semibold transition-all relative ${
                  activeTab === index
                    ? 'text-primary-600'
                    : 'text-text-body hover:text-text-heading'
                }`}
              >
                {tab.label}
                {activeTab === index && (
                  <div className="tab-indicator absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600"></div>
                )}
              </button>
            );
          })}
        </div>

        <div ref={contentRef} className="content-container bg-card-bg rounded-2xl p-4 md:p-12 min-h-[300px] shadow-lg">
          <h3 className="text-3xl font-bold text-text-heading mb-4">
            {tabs[activeTab].title}
          </h3>
          <p className="text-lg text-text-body leading-relaxed mb-6">
            {tabs[activeTab].content}
          </p>
          <div className="space-y-3">
            {tabs[activeTab].subclasses.map((subclass, index) => (
              <div key={index}>
                {/* Desktop layout: inline */}
                <div className="hidden sm:flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0" />
                  <span className="font-bold text-text-heading">{subclass.code}</span>
                  <span className="text-text-body">- {subclass.description}</span>
                </div>
                {/* Mobile layout: stacked */}
                <div className="flex flex-col gap-3 sm:hidden">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0" />
                    <span className="font-bold text-text-heading">{subclass.code}</span>
                  </div>
                  <span className="text-text-body">- {subclass.description}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Link
              to={tabs[activeTab].link}
              className="inline-block px-6 py-3 bg-white text-primary-600 border-2 border-primary-600 rounded-lg hover:bg-primary-600 hover:text-white transition-colors font-semibold"
            >
              {buttonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}