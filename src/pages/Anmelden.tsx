import React, { useEffect } from 'react';
import { Container, Section } from '../components/LayoutComponents';
import { AnmeldeFormular } from '../components/AnmeldeFormular';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Anmelden: React.FC = () => {
  useEffect(() => {
    document.title = 'Anmeldung - Fahrschule Ralf Brauer';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Melde dich jetzt für deine Fahrschulausbildung an. Fülle das Formular aus und wir kontaktieren dich zeitnah. Flexible Termine und professionelle Ausbildung warten auf dich.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Melde dich jetzt für deine Fahrschulausbildung an. Fülle das Formular aus und wir kontaktieren dich zeitnah. Flexible Termine und professionelle Ausbildung warten auf dich.';
      document.head.appendChild(meta);
    }
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'Anmeldung, Fahrschule, Führerschein, Ralf Brauer, Leverkusen, Fahrausbildung');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = 'Anmeldung, Fahrschule, Führerschein, Ralf Brauer, Leverkusen, Fahrausbildung';
      document.head.appendChild(meta);
    }
  }, []);

  const { elementRef: headerRef, isVisible: headerVisible } = useScrollReveal();

  return (
    <div className="bg-page-bg">
      <Section background="card-bg" padding="sm">
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
              Deine Anmeldung
            </h1>
            <p className="text-lg text-text-body leading-relaxed mb-4">
              Herzlich willkommen! Wir freuen uns, dass du dich für eine Ausbildung bei uns entschieden hast.
            </p>
            <p className="text-lg text-text-body leading-relaxed">
              Fülle einfach das folgende Formular aus und wir melden uns zeitnah bei dir, um alles Weitere zu besprechen. Dein Weg zum Führerschein beginnt hier!
            </p>
          </div>
        </Container>
      </Section>

      <AnmeldeFormular />
    </div>
  );
};

export default Anmelden;
