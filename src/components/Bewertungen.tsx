import React, { useRef, useEffect } from 'react';
import { Star } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  name: string;
  role: string;
  initials: string;
  rating: number;
  text: string;
}

interface BewertungenProps {
  testimonials?: Testimonial[];
  title?: string;
}

const Bewertungen: React.FC<BewertungenProps> = ({
  testimonials = [
    {
      name: 'Alexandra Mueller',
      role: 'Product Manager',
      initials: 'AM',
      rating: 5,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident.',
    },
    {
      name: 'Marcus Schmidt',
      role: 'Tech Lead',
      initials: 'MS',
      rating: 5,
      text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
    },
    {
      name: 'Sarah Johnson',
      role: 'Designer',
      initials: 'SJ',
      rating: 4,
      text: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.',
    },
  ],
  title = 'Bewertungen'
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const testimonialRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title
      gsap.fromTo(".reviews-title",
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

      // Animate testimonial cards with stagger
      gsap.fromTo(testimonialRefs.current.filter(Boolean),
        { opacity: 0, y: 50, scale: 0.9, rotationY: -10 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Add hover effects for testimonial cards
      testimonialRefs.current.filter(Boolean).forEach((card) => {
        const hoverTl = gsap.timeline({ paused: true });

        hoverTl.to(card, {
          y: -8,
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out"
        })
        .to(card.querySelector('.testimonial-avatar'), {
          scale: 1.1,
          duration: 0.3,
          ease: "back.out(2)"
        }, 0)
        .to(card.querySelectorAll('.star-icon'), {
          scale: 1.2,
          duration: 0.2,
          stagger: 0.05,
          ease: "back.out(2)"
        }, 0);

        card.addEventListener('mouseenter', () => hoverTl.play());
        card.addEventListener('mouseleave', () => hoverTl.reverse());
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-12">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
        <h2 className="reviews-title text-3xl font-bold text-heading mb-8 text-center">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              ref={(el) => (testimonialRefs.current[index] = el!)}
              className="testimonial-card border border-default rounded-xl p-8 hover:shadow-lg transition-all duration-300 bg-card-bg"
            >
              <div className="flex items-center mb-4">
                <div className="testimonial-avatar w-12 h-12 rounded-full bg-secondary-200 flex items-center justify-center text-secondary-600 font-semibold mr-4">
                  {testimonial.initials}
                </div>
                <div>
                  <h4 className="font-semibold text-heading">{testimonial.name}</h4>
                  <p className="text-sm text-body">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`star-icon w-4 h-4 ${
                      i < testimonial.rating ? 'text-primary-500 fill-primary-500' : 'text-muted'
                    }`}
                  />
                ))}
              </div>
              <p className="text-body">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Bewertungen;