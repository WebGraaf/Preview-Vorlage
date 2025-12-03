import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={`max-w-7xl mx-auto px-4 ${className}`}>
      {children}
    </div>
  );
};

interface SectionProps {
  children: React.ReactNode;
  background?: string;
  padding?: string;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({
  children,
  background = 'transparent',
  padding = 'md',
  className = ''
}) => {
  const paddingClasses = {
    sm: 'py-16',
    md: 'py-16',
    lg: 'py-16',
    xl: 'py-16'
  };

  const backgroundClasses: Record<string, string> = {
    transparent: 'bg-transparent',
    white: 'bg-white',
    gray: 'bg-secondary-100',
    blue: 'bg-primary-50',
    'page-bg': 'bg-page-bg',
    'card-bg': 'bg-card-bg',
    'card-tint': 'bg-card-tint',
    'elevated-bg': 'bg-elevated-bg'
  };

  const bgClass = backgroundClasses[background] || '';

  return (
    <section className={`${bgClass} ${paddingClasses[padding as keyof typeof paddingClasses]} ${className}`}>
      {children}
    </section>
  );
};