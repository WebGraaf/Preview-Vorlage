import React, { useRef, useEffect } from 'react';
import { Container, Section } from './LayoutComponents';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface IconItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface BannerMitIconsProps {
  items: IconItem[];
  background?: string;
  padding?: string;
}

const BannerMitIcons: React.FC<BannerMitIconsProps> = ({
  items,
  background = "page-bg",
  padding = "sm"
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate container
      gsap.fromTo(sectionRef.current,
        { opacity: 0, y: 40 },
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

      // Animate icon cards with stagger
      gsap.fromTo(cardRefs.current.filter(Boolean),
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Add hover effects for icon cards
      cardRefs.current.filter(Boolean).forEach((card) => {
        const hoverTl = gsap.timeline({ paused: true });

        hoverTl.to(card, {
          y: -8,
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out"
        })
        .to(card.querySelector('.icon-bg'), {
          scale: 1.1,
          duration: 0.3,
          ease: "back.out(2)"
        }, 0);

        card.addEventListener('mouseenter', () => hoverTl.play());
        card.addEventListener('mouseleave', () => hoverTl.reverse());
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section background={background} padding={padding}>
      <Container>
        <div ref={sectionRef} className="bg-card-bg rounded-xl p-8 border border-card-border">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((item, index) => (
              <InfoCard
                key={index}
                ref={(el) => (cardRefs.current[index] = el!)}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const InfoCard = React.forwardRef<HTMLDivElement, InfoCardProps>(({ icon, title, description }, ref) => {
  return (
    <div
      ref={ref}
      className="icon-card flex flex-col items-center text-center p-4"
    >
      <div className="icon-bg mb-3">{icon}</div>
      <h4 className="text-lg font-semibold text-text-heading mb-2">{title}</h4>
      <p className="text-text-body text-sm">{description}</p>
    </div>
  );
});

InfoCard.displayName = 'InfoCard';

export default BannerMitIcons;