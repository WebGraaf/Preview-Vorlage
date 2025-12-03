import React from 'react';
import { Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Container, Section } from './LayoutComponents';
import { KlassenDetailCard } from './KlassenDetailCard';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useConfig } from '../config';
import {
  SUBCLASS_DETAILS,
  CLASS_PAGE_HEADERS,
  CLASS_CTA,
  MAIN_CLASS_SUBCLASSES,
  SubclassDetailInfo
} from '../config/classData';
import { HauptklasseCode } from '../config/types';
import {
  Calendar, Gauge, Bike, Users, Car, Scale, Truck, Link, CheckCircle,
  User, FileText, BookOpen, Key, Settings, Cog, Package, Ruler, Ban, Leaf
} from 'lucide-react';

// Icon mapping for dynamic icon rendering
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Calendar, Gauge, Bike, Users, Car, Scale, Truck, Link, CheckCircle,
  User, FileText, BookOpen, Key, Settings, Cog, Package, Ruler, Ban, Leaf
};

const getIcon = (iconName: string, className: string = "w-8 h-8 text-primary-500"): React.ReactNode => {
  const IconComponent = ICON_MAP[iconName];
  if (IconComponent) {
    return <IconComponent className={className} />;
  }
  return null;
};

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, description }) => {
  const { elementRef, isVisible } = useScrollReveal();

  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className="flex flex-col items-center text-center p-4"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
      }}
    >
      <div className="mb-3">{icon}</div>
      <h4 className="text-lg font-semibold text-text-heading mb-2">{title}</h4>
      <p className="text-text-body text-sm">{description}</p>
    </div>
  );
};

interface SubclassSectionProps {
  subclassCode: string;
  details: SubclassDetailInfo;
  isAlternate: boolean;
}

const SubclassSection: React.FC<SubclassSectionProps> = ({ subclassCode, details, isAlternate }) => {
  const iconColorClass = isAlternate ? "text-primary-600" : "text-primary-500";
  
  return (
    <>
      <Section background="page-bg" padding="lg">
        <Container>
          <KlassenDetailCard
            imageSrc={details.imagePath}
            imageAlt={details.imageAlt}
            title={details.title}
            description={details.description}
            restrictions={details.restrictions}
            imagePosition={details.imagePosition}
            variant={details.variant}
          />
        </Container>
      </Section>

      <Section background="page-bg" padding="sm">
        <Container>
          <div className={`${details.cardBgClass} rounded-xl p-8 ${details.cardBorderClass}`}>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {details.infoCards.map((card, index) => (
                <InfoCard
                  key={`${subclassCode}-info-${index}`}
                  icon={getIcon(card.iconName, `w-8 h-8 ${iconColorClass}`)}
                  title={card.title}
                  description={card.description}
                />
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
};

interface KlassenDetailPageProps {
  classCode: HauptklasseCode;
}

export const KlassenDetailPage: React.FC<KlassenDetailPageProps> = ({ classCode }) => {
  const { isClassActive, getActiveSubclasses, config, loading } = useConfig();
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollReveal();

  // Show loading state
  if (loading) {
    return (
      <div className="bg-page-bg min-h-screen flex items-center justify-center">
        <div className="text-text-body">Laden...</div>
      </div>
    );
  }

  // Redirect to 404 if class is not active
  if (!isClassActive(classCode)) {
    return <Navigate to="/404" replace />;
  }

  const pageHeader = CLASS_PAGE_HEADERS[classCode];
  const cta = CLASS_CTA[classCode];
  const allSubclasses = MAIN_CLASS_SUBCLASSES[classCode];
  const activeSubclasses = getActiveSubclasses(classCode);
  
  // Filter to only show active subclasses in the correct order
  const displaySubclasses = allSubclasses.filter(sub => activeSubclasses.includes(sub));

  const fahrschuleName = config?.fahrschule?.name || 'Deine Fahrschule';

  return (
    <div className="bg-page-bg">
      <Helmet>
        <title>{pageHeader.title} - {fahrschuleName}</title>
        <meta name="description" content={pageHeader.description1} />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <Section background="card-bg" padding="xl" className="pb-0">
        <Container>
          <div
            ref={headerRef as React.RefObject<HTMLDivElement>}
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
            }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-text-heading text-center mb-6">
              {pageHeader.title}
            </h1>
            <p className="text-lg text-text-body text-center max-w-3xl mx-auto leading-relaxed mb-4">
              {pageHeader.description1}
            </p>
            <p className="text-lg text-text-body text-center max-w-3xl mx-auto leading-relaxed">
              {pageHeader.description2}
            </p>
          </div>
        </Container>
      </Section>

      {displaySubclasses.map((subclassCode, index) => {
        const details = SUBCLASS_DETAILS[subclassCode];
        if (!details) return null;
        
        return (
          <SubclassSection
            key={subclassCode}
            subclassCode={subclassCode}
            details={details}
            isAlternate={index % 2 === 1}
          />
        );
      })}

      <Section background="card-bg" padding="lg">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-text-heading mb-4">
              {cta.title}
            </h2>
            <p className="text-lg text-text-body mb-8">
              {cta.description}
            </p>
            <a
              href="/anmelden"
              className="inline-block bg-btn-solid-bg text-btn-solid-fg px-8 py-4 rounded-lg font-semibold hover:bg-btn-solid-hover transition-colors duration-300"
            >
              {cta.buttonText}
            </a>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default KlassenDetailPage;