import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Section } from './LayoutComponents';
import { useTrail, animated } from '@react-spring/web';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTextProps {
  text?: string;
  className?: string;
  delay?: number;
  animationFrom?: object;
  animationTo?: object;
  easing?: string;
  threshold?: number;
  rootMargin?: string;
  textAlign?: 'left' | 'right' | 'center' | 'justify';
  tag?: keyof JSX.IntrinsicElements;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text = '',
  className = '',
  delay = 20,
  animationFrom = { opacity: 0, transform: 'translate3d(0,40px,0)' },
  animationTo = { opacity: 1, transform: 'translate3d(0,0,0)' },
  easing = 'easeOutCubic',
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  tag: Tag = 'p',
}) => {
  const words = text.split(' ').map(word => word.split(''));
  const letters = words.flat();
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);
  const animatedCount = useRef(0);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(currentRef);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  const trail = useTrail(letters.length, {
    from: animationFrom,
    to: inView ? animationTo : animationFrom,
    delay: (i: number) => 1000 + i * delay,
    config: { duration: 40 },
    onRest: () => {
      animatedCount.current += 1;
    }
  });

  const textStyle: React.CSSProperties = {
    textAlign,
    whiteSpace: 'pre-line',
    wordWrap: 'break-word',
    lineHeight: '1.2',
  };

  const Component = Tag as React.ElementType;

  return React.createElement(
    Tag,
    {
      ref,
      className: `split-parent inline ${className}`,
      style: textStyle,
    },
    words.map((word, wordIndex) => (
      React.createElement('span', { key: wordIndex, style: { display: 'inline-block', whiteSpace: 'nowrap' } },
        word.map((letter, letterIndex) => {
          const index = words
            .slice(0, wordIndex)
            .reduce((acc, w) => acc + w.length, 0) + letterIndex;

          return letter === '\n' ? (
            React.createElement('br', { key: index })
          ) : (
            React.createElement(animated.span, {
              key: index,
              style: trail[index],
              className: "inline-block transform transition-opacity will-change-transform"
            }, letter)
          );
        }),
        wordIndex < words.length - 1 && React.createElement('span', { style: { display: 'inline-block', width: '0.3em' } }, ' ')
      )
    ))
  );
};

interface HeroStartseiteProps {
  title: string;
  subtitle?: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  logoSrc: string;
  logoAlt: string;
  background?: 'transparent' | 'white' | 'neutral' | 'gradient' | 'blue' | 'page-bg';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const HeroStartseite: React.FC<HeroStartseiteProps> = ({
  title,
  subtitle,
  description,
  buttonText,
  buttonLink,
  logoSrc,
  logoAlt,
  background = 'transparent',
  padding = 'xl',
  className = '',
}) => {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(imageRef.current,
        {
          opacity: 0,
          scale: 0.3,
          rotation: -45,
          y: 80,
          filter: "blur(10px)"
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          y: 0,
          filter: "blur(0px)",
          duration: 1.5,
          delay: 0.5,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <Section background={background} padding={padding} className={className}>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-7 gap-8 items-center">
          <div className="col-span-1 md:col-span-5 text-left order-2 md:order-1">
            <div className="flex flex-col justify-start items-start">
              <AnimatedText
                text={title}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-left max-w-2xl text-heading"
                textAlign="left"
                delay={30}
                animationFrom={{ opacity: 0, transform: 'translate3d(0,30px,0)' }}
                animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                easing="easeOutCubic"
                threshold={0.3}
                rootMargin="-100px"
                tag="h1"
              />
              {subtitle && (
                <AnimatedText
                  text={subtitle}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-left max-w-2xl text-primary-500"
                  textAlign="left"
                  delay={30}
                  animationFrom={{ opacity: 0, transform: 'translate3d(0,30px,0)' }}
                  animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                  easing="easeOutCubic"
                  threshold={0.3}
                  rootMargin="-100px"
                />
              )}
            </div>
            <p className="text-lg md:text-xl text-body mb-8 animate-in fade-in slide-in-from-bottom-6 duration-900">
              {description}
            </p>
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <Link
                to={buttonLink}
                className="px-6 md:px-8 py-3 md:py-4 bg-primary-500 text-white border border-primary-500 rounded-lg font-semibold hover:bg-transparent hover:text-primary-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 inline-block text-sm md:text-base"
              >
                {buttonText}
              </Link>
            </div>
          </div>
          <div className="col-span-1 md:col-span-2 flex items-center md:justify-center order-1 md:order-2">
            <img
              ref={imageRef}
              src={logoSrc}
              alt={logoAlt}
              className="h-auto max-w-xs md:max-w-sm"
              style={{
                opacity: 0,
                transform: 'scale(0.3) rotate(-45deg) translateY(80px)',
                filter: 'blur(10px)'
              }}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
};