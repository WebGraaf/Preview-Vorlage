import { useTrail, animated } from '@react-spring/web';
import { useEffect, useRef, useState } from 'react';

interface TextAnimationHeroProps {
  text?: string;
  className?: string;
  delay?: number;
  animationFrom?: object;
  animationTo?: object;
  easing?: string;
  threshold?: number;
  rootMargin?: string;
  textAlign?: 'left' | 'right' | 'center' | 'justify';
  onLetterAnimationComplete?: () => void;
}

export const TextAnimationHero = ({
  text = '',
  className = '',
  delay = 20,
  animationFrom = { opacity: 0, transform: 'translate3d(0,40px,0)' },
  animationTo = { opacity: 1, transform: 'translate3d(0,0,0)' },
  easing = 'easeOutCubic',
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  onLetterAnimationComplete,
}: TextAnimationHeroProps) => {
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
    delay: (i: number) => i * delay,
    config: { duration: 40 },
    onRest: () => {
      animatedCount.current += 1;
      if (animatedCount.current === letters.length && onLetterAnimationComplete) {
        onLetterAnimationComplete();
      }
    }
  });

  const textStyle: React.CSSProperties = {
    textAlign,
    whiteSpace: 'pre-line',
    wordWrap: 'break-word',
    lineHeight: '1.2',
  };

  return (
    <p
      ref={ref}
      className={`split-parent inline ${className}`}
      style={textStyle}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {word.map((letter, letterIndex) => {

            const index = words
              .slice(0, wordIndex)
              .reduce((acc, w) => acc + w.length, 0) + letterIndex;

            return letter === '\n' ? (
              <br key={index} />
            ) : (
              <animated.span
                key={index}
                style={trail[index]}
                className="inline-block transform transition-opacity will-change-transform"
              >
                {letter}
              </animated.span>
            );
          })}
          {}
          {wordIndex < words.length - 1 && (
             <span style={{ display: 'inline-block', width: '0.3em' }}> </span>
          )}
        </span>
      ))}
    </p>
  );
};

const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

const DemoTextAnimationHero = () => {
  return (
    <div className="flex flex-col justify-center items-center" style={{ padding: '50px' }}>
      <TextAnimationHero
        text="Wir machen dich Mobil"
        className="text-2xl md:text-3xl lg:text-4xl font-bold text-center max-w-2xl mb-4 text-heading"
        delay={30}
        animationFrom={{ opacity: 0, transform: 'translate3d(0, 30px, 0)' }}
        animationTo={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }}
        easing="easeOutCubic"
        threshold={0.3}
        rootMargin="-100px"
        onLetterAnimationComplete={handleAnimationComplete}
      />
      <TextAnimationHero
        text="Platzhalter Fahrschule"
        className="text-2xl md:text-3xl lg:text-4xl font-bold text-center max-w-2xl text-primary"
        delay={30}
        animationFrom={{ opacity: 0, transform: 'translate3d(0, 30px, 0)' }}
        animationTo={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }}
        easing="easeOutCubic"
        threshold={0.3}
        rootMargin="-100px"
      />
    </div>
  );
};

export { DemoTextAnimationHero };