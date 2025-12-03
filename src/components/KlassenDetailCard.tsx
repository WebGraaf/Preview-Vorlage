import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Check } from 'lucide-react';

interface KlassenDetailCardProps {
  imageSrc: string;
  imageAlt?: string;
  title: string;
  description: string;
  restrictions: string[];
  imagePosition?: 'left' | 'right';
  variant?: 'default' | 'muted' | 'outline';
  className?: string;
}

export const KlassenDetailCard: React.FC<KlassenDetailCardProps> = ({
  imageSrc,
  imageAlt = '',
  title,
  description,
  restrictions,
  imagePosition = 'left',
  variant = 'default',
  className = '',
}) => {
  const { elementRef, isVisible } = useScrollReveal();

  const variantClasses = {
    default: 'bg-card-bg border border-card-border',
    muted: 'bg-card-bg border border-card-border',
    outline: 'bg-card-bg border border-card-border',
  };

  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={`rounded-xl overflow-hidden py-0 px-0 ${variantClasses[variant]} ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
      }}
    >
      <div
        className={`flex flex-col md:flex-row gap-0 ${
          imagePosition === 'right' ? 'md:flex-row-reverse' : ''
        }`}
      >
        <div className="md:w-1/2">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="md:w-1/2 flex flex-col justify-center p-8 text-left">
          <h3 className="text-3xl font-bold text-text-heading mb-4">{title}</h3>
          <p className="text-text-body leading-relaxed mb-6">{description}</p>

          <div className="mb-6">
            <h4 className="text-lg font-semibold text-text-heading mb-3">Voraussetzungen & Restriktionen:</h4>
            <ul className="space-y-2">
              {restrictions.map((restriction, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-text-body">{restriction}</span>
                </li>
              ))}
            </ul>
          </div>

          <a
            href="/anmelden"
            className="inline-block bg-btn-solid-bg text-btn-solid-fg px-6 py-3 rounded-lg font-semibold hover:bg-btn-solid-hover transition-colors duration-300 text-center"
          >
            Jetzt zur Klasse {title.split(' ')[1]} anmelden
          </a>
        </div>
      </div>
    </div>
  );
};
