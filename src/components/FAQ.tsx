import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  title?: string;
  faqs: FAQItem[];
  defaultOpenIndex?: number | null;
}

export function FAQ({ title = "Häufig gestellte Fragen", faqs, defaultOpenIndex = null }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);
  const sectionRef = useRef<HTMLElement>(null);
  const faqRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ensure all FAQ items start collapsed
      faqRefs.current.forEach((faqItem) => {
        if (faqItem) {
          const content = faqItem.querySelector('.faq-content') as HTMLElement;
          if (content) {
            gsap.set(content, { height: 0 });
          }
          const chevron = faqItem.querySelector('.faq-chevron') as HTMLElement;
          if (chevron) {
            gsap.set(chevron, { rotation: 0 });
          }
          const arrow = faqItem.querySelector('.faq-arrow') as HTMLElement;
          if (arrow) {
            gsap.set(arrow, { rotation: 0 });
          }
        }
      });

      // Animate title
      gsap.fromTo(".faq-title",
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

      // Animate FAQ items with stagger
      gsap.fromTo(faqRefs.current.filter(Boolean),
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "back.out(1.7)",
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

  const handleToggle = (index: number) => {
    const newOpenIndex = openIndex === index ? null : index;
    setOpenIndex(newOpenIndex);

    // Animate accordion
    const content = faqRefs.current[index]?.querySelector('.faq-content') as HTMLElement;
    const chevron = faqRefs.current[index]?.querySelector('.faq-chevron') as HTMLElement;
    const arrow = faqRefs.current[index]?.querySelector('.faq-arrow') as HTMLElement;

    if (content && chevron && arrow) {
      if (newOpenIndex === index) {
        // Opening animation
        gsap.to(content, {
          height: 'auto',
          duration: 0.4,
          ease: "power2.out"
        });
        gsap.to(chevron, {
          rotation: 180,
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(arrow, {
          rotation: 90,
          duration: 0.3,
          ease: "power2.out"
        });
      } else {
        // Closing animation
        gsap.to(content, {
          height: 0,
          duration: 0.3,
          ease: "power2.in"
        });
        gsap.to(chevron, {
          rotation: 0,
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(arrow, {
          rotation: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    }
  };

  return (
    <section ref={sectionRef} className="">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="faq-title text-4xl font-bold text-heading mb-4">
            {title}
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              ref={(el) => (faqRefs.current[index] = el!)}
              className="faq-item bg-card-bg rounded-xl shadow-md border border-default overflow-hidden"
            >
              <button
                onClick={() => handleToggle(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-hover transition-colors"
              >
                <span className="font-semibold text-heading text-lg">
                  {faq.question}
                </span>
                <div className="flex items-center gap-2">
                  <ChevronRight
                    className="faq-arrow w-4 h-4 text-primary-600 transition-transform duration-300"
                    style={{
                      transform: openIndex === index ? 'rotate(90deg)' : 'rotate(0deg)'
                    }}
                  />
                  <ChevronDown
                    className="faq-chevron w-5 h-5 text-muted transition-transform"
                  />
                </div>
              </button>
              <div className="faq-content overflow-hidden">
                <div className="px-6 pb-5 text-body leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}