import React from 'react';
import { Helmet } from 'react-helmet-async';
import { HeroStartseite } from '../components/HeroStartseite';
import { TextGalerieStapel } from '../components/TextGalerieStapel';
import { KlassenUebersichtGridSpotlight } from '../components/KlassenUebersichtGridSpotlight';
import VorherNacherBildVergleich from '../components/VorherNacherBildVergleich';
import { StandorteUebersicht } from '../components/StandorteUebersicht';
import BannerAnmelden from '../components/BannerAnmelden';
import { SplitMediaText } from '../components/SplitMediaText';
import { SplitMediaTextInvert } from '../components/SplitMediaTextInvert';
import { FAQ } from '../components/FAQ';
import { useConfig } from '../config';

const Home: React.FC = () => {
  const { config, loading, getLocationsForDisplay } = useConfig();

  // Get dynamic data from config
  const fahrschuleName = config?.fahrschule.name || 'Fahrschule';
  const logo = config?.fahrschule.logo || '/default_images/logo_default.webp';
  
  // Get locations from config
  const locations = getLocationsForDisplay();

  // Daten für TextGalerieStapel
  const galleryImages = [
    {
      src: '/default_images/Platzhalter_Fahrschule.webp',
      alt: 'Fahrschule Bild 1'
    },
    {
      src: '/default_images/Platzhalter_Furhpark.webp',
      alt: 'Fahrschule Bild 2'
    },
    {
      src: '/default_images/Platzhalter_Gruppenbild_Team.webp',
      alt: 'Fahrschule Bild 3'
    }
  ];

  // Daten für FAQ
  const faqs = [
    {
      question: 'Wie melde ich mich für einen Führerscheinkurs an?',
      answer: 'Du kannst dich ganz einfach online über unsere Website anmelden oder persönlich in einer unserer Filialen vorbeikommen.'
    },
    {
      question: 'Welche Voraussetzungen muss ich erfüllen?',
      answer: 'Du musst mindestens 17 Jahre alt sein und einen gültigen Personalausweis oder Reisepass vorlegen.'
    },
    {
      question: 'Wie lange dauert die Ausbildung?',
      answer: 'Die Dauer hängt von der Führerscheinklasse ab und variiert zwischen 2-6 Monaten, abhängig von deinen Vorkenntnissen und der Verfügbarkeit von Fahrstunden.'
    },
    {
      question: 'Werden Intensivkurse angeboten?',
      answer: 'Ja, wir bieten verschiedene Intensivkurse an, die Ihnen helfen, Ihren Führerschein schneller zu erhalten.'
    }
  ];

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-text-body">Laden...</div>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>{fahrschuleName} - Startseite</title>
        <meta name="description" content={`Willkommen bei ${fahrschuleName}. Wir machen dich mobil! Erfahre mehr über unsere Führerscheinkurse, unseren modernen Fuhrpark und melde dich noch heute an.`} />
        <meta name="keywords" content={`Fahrschule, Führerschein, Fahrausbildung, Auto, Motorrad, LKW, ${fahrschuleName}`} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={`${fahrschuleName} - Sicher zum Führerschein`} />
        <meta property="og:description" content={`Starte deine Fahrausbildung bei ${fahrschuleName}. Moderne Fahrzeuge, erfahrene Fahrlehrer und hohe Erfolgsquoten.`} />
        <meta property="og:type" content="website" />
      </Helmet>
      <HeroStartseite
        title="Wir machen dich Mobil"
        subtitle={fahrschuleName}
        description="Erfahre mehr über unsere moderne Fahrschulausbildung und unsere erfahrenen Fahrlehrer."
        buttonText="Jetzt anmelden"
        buttonLink="/anmelden"
        logoSrc={logo}
        logoAlt={`${fahrschuleName} Logo`}
      />

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <TextGalerieStapel
            title="Unsere Fahrschule"
            description="Erfahre mehr über unsere moderne Fahrschulausbildung und unsere erfahrenen Fahrlehrer."
            images={galleryImages}
            imagePosition="left"
          />
        </div>
      </section>

      <section className="py-16">
        <KlassenUebersichtGridSpotlight />
      </section>

      <section className="py-16">
        <VorherNacherBildVergleich
          beforeImage="/default_images/Platzhalter_Fahrschule.webp"
          afterImage="/default_images/Platzhalter_Furhpark.webp"
          beforeLabel=""
          afterLabel=""
        />
      </section>

      {locations.length > 0 && (
        <section className="py-16">
          <StandorteUebersicht
            title="Unsere Standorte"
            subtitle="Finden Sie den nächstgelegenen Standort"
            locations={locations}
          />
        </section>
      )}

      <section className="py-16 overflow-hidden">
        <BannerAnmelden />
      </section>

      <section className="py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <SplitMediaText
            imageSrc="/default_images/Platzhalter_Fahrschule.webp"
            imageAlt="Fahrschule Ausbildung"
            title="Professionelle Fahrausbildung"
            description="Bei uns erhältst du eine erstklassige Fahrausbildung von zertifizierten Fahrlehrern. Wir legen Wert auf individuelle Betreuung und moderne Lehrmethoden, um dich sicher auf die Straße zu bringen."
            imagePosition="left"
          />
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <SplitMediaTextInvert
            imageSrc="/default_images/Platzhalter_Furhpark.webp"
            imageAlt="Moderner Fuhrpark"
            title="Topmoderner Fuhrpark"
            description="Unser Fahrzeugpark umfasst die neuesten Modelle verschiedener Automarken. Alle Fahrzeuge sind perfekt gewartet und erfüllen höchste Sicherheitsstandards für Ihre optimale Ausbildung."
            imagePosition="right"
          />
        </div>
      </section>

      <section className="py-16">
        <FAQ
          title="Häufig gestellte Fragen"
          faqs={faqs}
        />
      </section>

      <section className="py-16 overflow-hidden">
        <BannerAnmelden />
      </section>
    </div>
  );
};

export default Home;
