import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Section } from '../components/LayoutComponents';
import { TeamBilder } from '../components/TeamBilder';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useConfig } from '../config';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LogoDefault = '/default_images/logo_default.webp';
const PlatzhalterGruppenbildTeam = '/default_images/Platzhalter_Gruppenbild_Team.webp';
const PlatzhalterFahrschule = '/default_images/Platzhalter_Fahrschule.webp';
const PlatzhalterTeammitglied = '/default_images/Platzhalter_Teammitglied.webp';

const SplitMediaTextCopy: React.FC<{
  imageSrc: string;
  imageAlt?: string;
  title: string;
  description: string;
  imagePosition?: 'left' | 'right';
  variant?: 'default' | 'muted' | 'outline';
  className?: string;
}> = ({
  imageSrc,
  imageAlt = '',
  title,
  description,
  imagePosition = 'left',
  variant = 'default',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current,
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const variantClasses = {
    default: 'bg-card-bg border border-card-border',
    muted: 'bg-card-bg border border-card-border',
    outline: 'bg-card-bg border border-card-border',
  };

  return (
    <div
      ref={containerRef}
      className={`rounded-xl overflow-hidden py-0 px-0 ${variantClasses[variant]} ${className}`}
    >
      <div
        className={`flex flex-col md:flex-row gap-8 ${
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
          <p className="text-text-body leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};

const UeberUns: React.FC = () => {
  const { config, bilderConfig } = useConfig();
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { elementRef: teamHeaderRef, isVisible: teamHeaderVisible } = useScrollReveal();

  // Get intro text from config with fallback
  const ueberUnsIntro = config?.texte?.ueberUnsIntro || 'Seit über 20 Jahren sind wir deine Fahrschule des Vertrauens. Mit viel Herz, Erfahrung und modernster Ausstattung begleiten wir dich auf deinem Weg zum Führerschein.\n\nUnser Ziel ist es nicht nur, dir das Fahren beizubringen, sondern dich zu einem sicheren und verantwortungsvollen Verkehrsteilnehmer zu machen.';
  
  // Split intro text by double newline to create paragraphs
  const introParagraphs = ueberUnsIntro.split('\n\n');

  // Get images from bilder-config with fallbacks
  const unsereWerteImage = bilderConfig?.unsereWerte || PlatzhalterFahrschule;
  
  // Get team members from bilder-config with fallbacks
  const teamMembersFromConfig = bilderConfig?.team || [
    { imageSrc: PlatzhalterTeammitglied, name: 'Michael Schmidt', description: 'Geschäftsführer und Fahrlehrer seit 20 Jahren. Mit Leidenschaft und Geduld bringt er jedem das sichere Fahren bei.' },
    { imageSrc: PlatzhalterTeammitglied, name: 'Sarah Müller', description: 'Fahrlehrerin für Klasse B und A. Bekannt für ihre ruhige Art und ihre verständlichen Erklärungen.' },
    { imageSrc: PlatzhalterTeammitglied, name: 'Thomas Weber', description: 'Spezialist für LKW-Führerscheine. Mit über 15 Jahren Erfahrung im Bereich Berufskraftfahrer-Ausbildung.' },
    { imageSrc: PlatzhalterTeammitglied, name: 'Lisa Hoffmann', description: 'Unsere freundliche Büroleiterin. Sie kümmert sich um alle organisatorischen Fragen und Anmeldungen.' }
  ];

  // Convert team members to the format expected by TeamBilder component
  const teamMembers = teamMembersFromConfig.map(member => ({
    imageSrc: member.imageSrc,
    imageAlt: `${member.name}`,
    title: member.name,
    description: member.description || '',
  }));

  // Split team members into rows of 2 for desktop display
  const teamRows: typeof teamMembers[] = [];
  for (let i = 0; i < teamMembers.length; i += 2) {
    teamRows.push(teamMembers.slice(i, i + 2));
  }

  return (
    <div className="bg-page-bg">
      <Helmet>
        <title>Über Uns - Deine Fahrschule</title>
        <meta name="description" content="Lerne das Team und die Geschichte von [Fahrschulname] kennen. Erfahre mehr über unsere Mission, unsere Werte und warum wir die richtige Wahl für deine Fahrausbildung sind." />
        <meta name="keywords" content="Über uns, Fahrschule, Team, Geschichte, Mission, Werte, [Fahrschulname]" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Über Uns - Dein Team für den Führerschein" />
        <meta property="og:description" content="Wir sind [Fahrschulname] – lerne uns und unsere Philosophie kennen." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="[Ihre-Webseiten-URL]/ueber-uns" />
        <meta property="og:image" content="[Ihre-Webseiten-URL]/og-image-ueber-uns.jpg" />
        <link rel="canonical" href="[Ihre-Webseiten-URL]/ueber-uns" />
      </Helmet>
      <section className="py-16">
        <Container>
          <div
            ref={headerRef as React.RefObject<HTMLDivElement>}
            className="text-center max-w-3xl mx-auto"
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
            }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-text-heading mb-6">
              Über uns
            </h1>
            {introParagraphs.map((paragraph, index) => (
              <p
                key={index}
                className={`text-lg text-text-body leading-relaxed ${index < introParagraphs.length - 1 ? 'mb-4' : ''}`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SplitMediaTextCopy
            imageSrc={LogoDefault}
            imageAlt="Unsere Mission"
            title="Unsere Mission"
            description="Wir glauben daran, dass jeder das Recht hat, mobil und unabhängig zu sein. Deshalb setzen wir auf eine individuelle, geduldige und moderne Ausbildung. Egal ob jung oder alt, Anfänger oder Umsteiger - bei uns bist du in guten Händen. Deine Sicherheit und dein Erfolg stehen für uns an erster Stelle."
            imagePosition="left"
            variant="muted"
          />
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SplitMediaTextCopy
            imageSrc={unsereWerteImage}
            imageAlt="Unsere Werte"
            title="Unsere Werte"
            description="Lernen soll Spaß machen! Deshalb gestalten wir unseren Unterricht abwechslungsreich, praxisnah und auf Augenhöhe. Wir nehmen uns Zeit für deine Fragen und gehen auf deine individuellen Bedürfnisse ein. Dein Erfolg ist unser Antrieb - gemeinsam erreichen wir dein Ziel!"
            imagePosition="right"
            variant="outline"
          />
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div
            ref={teamHeaderRef as React.RefObject<HTMLDivElement>}
            className="text-center mb-12"
            style={{
              opacity: teamHeaderVisible ? 1 : 0,
              transform: teamHeaderVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
            }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-heading mb-4">
              Unser Team
            </h2>
            <p className="text-lg text-text-body max-w-2xl mx-auto">
              Lerne die Menschen kennen, die dich auf deinem Weg zum Führerschein begleiten. Unser Team besteht aus erfahrenen, geduldigen und freundlichen Fahrlehrern.
            </p>
          </div>

          <div className="space-y-8">
            {teamRows.map((row, index) => (
              <TeamBilder
                key={index}
                teams={row}
                variant={index % 2 === 0 ? 'default' : 'muted'}
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-text-heading mb-4">
              Werde Teil unserer Familie
            </h2>
            <p className="text-lg text-text-body mb-8">
              Hunderte zufriedene Fahrschüler haben bereits bei uns ihren Führerschein gemacht. Jetzt bist du an der Reihe! Melde dich noch heute an und starte deine Fahrt in die Zukunft.
            </p>
            <a
              href="/anmelden"
              className="inline-block bg-btn-solid-bg text-btn-solid-fg px-8 py-4 rounded-lg font-semibold hover:bg-btn-solid-hover transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Jetzt anmelden
            </a>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default UeberUns;
