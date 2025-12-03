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

  const backgroundClasses = {
    transparent: '',
    white: '',
    gray: '',
    blue: '',
    'page-bg': ''
  };

  return (
    <section className={`${backgroundClasses[background as keyof typeof backgroundClasses]} ${paddingClasses[padding as keyof typeof paddingClasses]} ${className}`}>
      {children}
    </section>
  );
};