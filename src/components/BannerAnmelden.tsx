import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const LogoDefault = '/default_images/logo_default.webp';

gsap.registerPlugin(ScrollTrigger);

const BannerAnmelden: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate banner container
      gsap.fromTo(sectionRef.current,
        { opacity: 0, scale: 0.95, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate logo with special effect
      gsap.fromTo(logoRef.current,
        {
          opacity: 0,
          scale: 0.5,
          rotation: -180,
          filter: "blur(5px)"
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate text content
      gsap.fromTo(".banner-title",
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(".banner-text",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate CTA button
      gsap.fromTo(".banner-button",
        { opacity: 0, scale: 0.8, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
        <div className="bg-card-bg rounded-2xl p-8 md:p-12 text-card-fg">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 lg:w-7/10 text-center">
              <h2 className="banner-title text-3xl md:text-4xl font-bold mb-4">Bereit für deinen Führerschein?</h2>
              <p className="banner-text text-lg text-text-body mb-8">Starte jetzt deine Fahrschulausbildung bei uns. Professionelle Ausbildung, flexible Termine und erfahrene Fahrlehrer. Wir warten auf dich!</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/anmelden"
                  className="banner-button px-8 py-4 bg-btn-solid-bg text-btn-solid-fg rounded-lg font-semibold hover:bg-btn-solid-hover transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 inline-block text-center"
                >
                  Jetzt Anmelden
                </Link>
              </div>
            </div>
            <div className="flex-shrink-0 lg:w-3/10 flex justify-center">
              <img
                ref={logoRef}
                src={LogoDefault}
                alt="Logo"
                className="max-w-full h-auto max-h-32"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerAnmelden;