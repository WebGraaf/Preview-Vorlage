import React from 'react';
import { Helmet } from 'react-helmet-async';
import { HeroStartseite } from '../components/HeroStartseite';
import { KlassenUebersichtGridSpotlight } from '../components/KlassenUebersichtGridSpotlight';
import { KlassenUebersicht } from '../components/KlassenUebersicht';
import { AnmeldeFormular } from '../components/AnmeldeFormular';
import VorherNacherBildVergleich from '../components/VorherNacherBildVergleich';
import { FAQ } from '../components/FAQ';
import { StandorteUebersicht } from '../components/StandorteUebersicht';
import { BilderGallerie } from '../components/BilderGallerie';
import Bewertungen from '../components/Bewertungen';
import BannerAnmelden from '../components/BannerAnmelden';
import { Kontaktinformationen } from '../components/Kontaktinformationen';
import { Preisliste } from '../components/Preisliste';
import { DemoTextAnimationHero } from '../components/TextAnimationHero';
import { OverlayMediaText } from '../components/OverlayMediaText';
import { SplitMediaText } from '../components/SplitMediaText';
import { SplitMediaTextInvert } from '../components/SplitMediaTextInvert';
import { SplitMediaText1zu1 } from '../components/SplitMediaText1zu1';
import { SplitMediaText1zu1invert } from '../components/SplitMediaText1zu1invert';
import { TeamBilder } from '../components/TeamBilder';
import BannerMitIcons from '../components/BannerMitIcons';
import BilderGallerieStapel from '../components/BilderGallerieStapel';
import { TextGalerieStapel } from '../components/TextGalerieStapel';
import KartenSpotlight from '../components/KartenSpotlight';
import { Car, Shield, Users, Award, Clock, CheckCircle } from 'lucide-react';

const Platzhalter_Teammitglied = '/default_images/Platzhalter_Teammitglied.webp';
const Klasse_B_Default = '/default_images/Klasse_B_Default.webp';
const Klasse_A_Default = '/default_images/Klasse_A_Default.webp';
const Klasse_A1_Default = '/default_images/Klasse_A1_Default.webp';
const Klasse_A2_Default = '/default_images/Klasse_A2_Default.webp';
const Klasse_AM_Default = '/default_images/Klasse_AM_Default.webp';
const Klasse_C_Default = '/default_images/Klasse_C_Default.webp';
const Klasse_D_Default = '/default_images/Klasse_D_Default.webp';
const Klasse_L_Default = '/default_images/Klasse_L_Default.webp';
const Klasse_T_Default = '/default_images/Klasse_T_Default.webp';
const LogoDefault = '/default_images/logo_default.webp';
import Lottie from 'lottie-react';
import searchAnimation from '../lottie/Search.json';
import notificationAnimation from '../lottie/Notification.json';

const ComponentsTest: React.FC = () => {
  return (
    <div>
      <Helmet>
        <title>Component Test Page</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <HeroStartseite
        title="Wir machen dich mobil!"
        subtitle="Deine Fahrschule"
        description="Erfahren Sie mehr über unsere Kurse und starten Sie Ihre Fahrausbildung mit uns."
        buttonText="Jetzt anmelden"
        buttonLink="/anmelden"
        logoSrc={LogoDefault}
        logoAlt="Fahrschule Logo"
      />
      <KlassenUebersichtGridSpotlight />
      <AnmeldeFormular />
      <VorherNacherBildVergleich
        beforeImage={Klasse_A_Default}
        afterImage={Klasse_B_Default}
        beforeLabel=""
        afterLabel=""
      />
      <KlassenUebersicht
        tabs={[
          {
            label: 'Klasse A',
            title: 'Führerschein Klasse A',
            content: 'Die Klasse A berechtigt zum Führen von Krafträdern mit einem Hubraum von mehr als 50 cm³ und einer bauartbedingten Höchstgeschwindigkeit von mehr als 45 km/h. Dazu gehören Motorräder, Motorroller und dreirädrige Kraftfahrzeuge.',
            link: '/fuehrerscheine/klasse-a',
            subclasses: [
              { code: 'AM', description: 'Kleinkrafträder / Mofas bis 45 km/h' },
              { code: 'A1', description: 'Leichtkrafträder bis 125 ccm / 11 kW' },
              { code: 'A2', description: 'Motorräder bis 35 kW / 0,2 kW/kg' },
              { code: 'A', description: 'Alle Motorräder ohne Leistungsbeschränkung' }
            ]
          },
          {
            label: 'Klasse B',
            title: 'Führerschein Klasse B',
            content: 'Die Klasse B berechtigt zum Führen von Kraftfahrzeugen mit einer zulässigen Gesamtmasse von nicht mehr als 3.500 kg und nicht mehr als 8 Sitzplätzen außer dem Fahrersitz. Dazu gehören PKW, Wohnmobile und leichte LKW.',
            link: '/fuehrerscheine/klasse-b',
            subclasses: [
              { code: 'BF17', description: 'Begleitetes Fahren ab 17 (Klasse B unter Aufsicht bis 18 J.)' },
              { code: 'B', description: 'Pkw bis 3,5 t zGG / max. 8 Sitzplätze + Anhänger ≤ 750 kg' },
              { code: 'B96', description: 'Pkw-Kombi bis 4,25 t zGG (ohne Prüfung, nur Schulung)' },
              { code: 'BE', description: 'Pkw + Anhänger > 750 kg (bis 3,5 t Anhänger)' },
              { code: 'B196', description: 'Erweiterung B: Motorräder bis 125 ccm (A1); nur D-Land' },
              { code: 'B197', description: 'Automatikprüfung mit Schaltkompetenz (gilt EU-weit)' }
            ]
          },
          {
            label: 'Klasse C',
            title: 'Führerschein Klasse C',
            content: 'Die Klasse C berechtigt zum Führen von Lastkraftwagen mit einer zulässigen Gesamtmasse von mehr als 3.500 kg. Dazu gehören LKW, Sattelzugmaschinen und andere schwere Nutzfahrzeuge.',
            link: '/fuehrerscheine/klasse-c',
            subclasses: [
              { code: 'C1', description: '3,5 – 7,5 t zGG, Anhänger ≤ 750 kg' },
              { code: 'C1E', description: 'C1 + Anhänger > 750 kg (bis 12 t Gesamt)' },
              { code: 'C', description: '> 3,5 t zGG, Anhänger ≤ 750 kg' },
              { code: 'CE', description: 'C + Anhänger > 750 kg' }
            ]
          },
          {
            label: 'Klasse D',
            title: 'Führerschein Klasse D',
            content: 'Die Klasse D berechtigt zum Führen von Kraftomnibussen mit mehr als 8 Fahrgastplätzen. Dazu gehören Reisebusse, Linienbusse und andere Omnibusse für den Personentransport.',
            link: '/fuehrerscheine/klasse-d',
            subclasses: [
              { code: 'D1', description: '9–16 Sitzplätze, max. 8 m Länge' },
              { code: 'D1E', description: 'D1 + Anhänger > 750 kg' },
              { code: 'D', description: 'Bus mit mehr als 8 Sitzplätzen' },
              { code: 'DE', description: 'D + Anhänger > 750 kg' }
            ]
          },
          {
            label: 'Klasse L',
            title: 'Führerschein Klasse L',
            content: 'Die Klasse L berechtigt zum Führen von land- und forstwirtschaftlichen Zugmaschinen bis 40 km/h und bestimmten Arbeitsmaschinen bis 25 km/h, nur zu LoF-Zwecken.',
            link: '/fuehrerscheine/klasse-l',
            subclasses: [
              { code: 'L', description: 'Zugmaschinen bis 40 km/h bbH (mit Anhänger max. 25 km/h)' }
            ]
          },
          {
            label: 'Klasse T',
            title: 'Führerschein Klasse T',
            content: 'Die Klasse T berechtigt zum Führen von Zugmaschinen bis 60 km/h und selbstfahrenden Arbeitsmaschinen bis 40 km/h, nur für land- und forstwirtschaftliche Zwecke.',
            link: '/fuehrerscheine/klasse-t',
            subclasses: [
              { code: 'T', description: 'Zugmaschinen bis 60 km/h bbH (nur für land- und forstwirtschaftliche Zwecke)' }
            ]
          }
        ]}
      />
      <FAQ
        faqs={[
          {
            question: 'Wie melde ich mich an und welche Unterlagen brauche ich?',
            answer: 'Personalausweis/Reisepass, biometrisches Passfoto, Sehtest (üblich: nicht älter als 2 Jahre), Erste-Hilfe-Kurs (9 UE). Unter 18 zusätzlich Einverständniserklärung der Erziehungsberechtigten; bei BF17 die Daten der Begleitpersonen. Den amtlichen Antrag stellen Sie bei der Fahrerlaubnisbehörde (die Fahrschule hilft dabei).'
          },
          {
            question: 'Wie lange dauert der Führerschein (Klasse B) durchschnittlich?',
            answer: 'Typisch 6–12 Wochen – abhängig von Kursstart, Terminverfügbarkeit, Lernfortschritt und Saison. Intensivkurse sind möglich, wenn Unterlagen/Anträge und Theorie zügig erledigt werden.'
          },
          {
            question: 'Wie viele Theorie- und Praxisstunden sind nötig?',
            answer: 'Klasse B: 14 Doppelstunden Theorie (12 Grundstoff + 2 klassenspezifisch B). In der Praxis so viele Übungsstunden wie erforderlich plus 12 Sonderfahrten: 5 Überland, 4 Autobahn, 3 Nacht.'
          },
          {
            question: 'Was kostet der Führerschein und woraus setzen sich die Kosten zusammen?',
            answer: 'Kosten variieren regional; als grober Richtwert für B: ca. 1.800–3.000 €. Bestandteile: Grundgebühr, Lernmaterial/App, Übungsfahrten (à 45 min), Sonderfahrten, Prüfungsgebühren (TÜV/Dekra) und Vorstellungsentgelte für Theorie & Praxis. Ein transparenter Kostenvoranschlag klärt die Details.'
          },
          {
            question: 'Was ist „Begleitetes Fahren ab 17" (BF17) und wer darf begleiten?',
            answer: 'Ab 17 darf mit eingetragenen Begleitpersonen gefahren werden. Voraussetzungen für Begleitpersonen: mind. 30 Jahre alt, seit mind. 5 Jahren Klasse B, maximal 1 Punkt im Fahreignungsregister. BF17 gilt in der Regel nur in Deutschland; ab 18 entfällt die Begleitauflage.'
          }
        ]}
      />

      <StandorteUebersicht
        locations={[
          {
            label: 'Köln',
            address: 'Domkloster 4, 50667 Köln',
            phone: '+49 221 12345678',
            hours: 'Mo-Fr: 9:00-18:00\nSa: 10:00-16:00\nSo: geschlossen',
            mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2514.381238421374!2d6.955932615749427!3d50.941278979546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bf25a8d8ee0685%3A0x40dabd2a4b6d3e0!2sK%C3%B6lner%20Dom!5e0!3m2!1sde!2sde!4v1620000000000!5m2!1sde!2sde'
          },
          {
            label: 'Stuttgart',
            address: 'Königstraße 1, 70173 Stuttgart',
            phone: '+49 711 98765432',
            hours: 'Mo-Fr: 9:00-18:00\nSa: 10:00-16:00\nSo: geschlossen',
            mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2625.0000000000005!2d9.175!3d48.775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4799db4387474307%3A0x43a7daf5f6567a49!2sK%C3%B6nigstra%C3%9Fe%201%2C%2070173%20Stuttgart!5e0!3m2!1sde!2sde!4v1620000000000!5m2!1sde!2sde'
          },
          {
            label: 'Düsseldorf',
            address: 'Schadowstraße 1, 40212 Düsseldorf',
            phone: '+49 211 11223344',
            hours: 'Mo-Fr: 9:00-18:00\nSa: 10:00-16:00\nSo: geschlossen',
            mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2490.0000000000005!2d6.7833333!3d51.2166667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b8ca12a4e8a4c3%3A0x6d2c3b8e3a0b4d1!2sSchadowstra%C3%9Fe%201%2C%2040212%20D%C3%BCsseldorf!5e0!3m2!1sde!2sde!4v1620000000000!5m2!1sde!2sde'
          }
        ]}
      />

      <section className="py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">Bilder Gallerie</h2>
          <BilderGallerie
            images={[
              Klasse_A_Default,
              Klasse_A1_Default,
              Klasse_A2_Default,
              Klasse_B_Default,
              Klasse_C_Default,
              Klasse_D_Default,
              Klasse_L_Default,
              Klasse_T_Default,
            ]}
          />
        </div>
      </section>

      <Bewertungen />
      <BannerAnmelden />
      <Kontaktinformationen />
      <Preisliste />
      <DemoTextAnimationHero />

      <section className="py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">Overlay Media Text</h2>
          <OverlayMediaText
            imageSrc={Klasse_L_Default}
            imageAlt="Sample Image"
            title="Overlay Media Text Component"
            description="This component displays text overlaid on an image with customizable opacity and positioning."
            overlayOpacity={0.5}
            textPosition="center"
            variant="default"
          />
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">Split Media Text</h2>
          <SplitMediaText
            imageSrc={Klasse_A_Default}
            imageAlt="Sample Image"
            title="Split Media Text Component"
            description="This component displays an image alongside text in a split layout, with options for image position and styling variants."
            imagePosition="left"
            variant="default"
          />
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">Split Media Text Invert</h2>
          <SplitMediaTextInvert
            imageSrc={Klasse_B_Default}
            imageAlt="Sample Image"
            title="Split Media Text Invert Component"
            description="This component displays an image on the right alongside text on the left in a split layout."
            variant="default"
          />
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">Split Media Text 1zu1</h2>
          <SplitMediaText1zu1
            imageSrc={Klasse_C_Default}
            imageAlt="Sample Image"
            title="Split Media Text 1zu1 Component"
            description="This component displays an image and text in a 50/50 split layout."
            variant="default"
          />
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">Split Media Text 1zu1 Invert</h2>
          <SplitMediaText1zu1invert
            imageSrc={Klasse_D_Default}
            imageAlt="Sample Image"
            title="Split Media Text 1zu1 Invert Component"
            description="This component displays an image on the right and text on the left in a 50/50 split layout."
            variant="default"
          />
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">Team Bilder</h2>
          <TeamBilder
            teams={[
              {
                imageSrc: Platzhalter_Teammitglied,
                imageAlt: "Team Member 1",
                title: "Max Mustermann",
                description: "Max ist ein erfahrener Fahrlehrer mit über 15 Jahren Erfahrung in der Fahrausbildung. Er hat tausende von Schülern sicher durch ihre Führerscheinprüfung gebracht und legt besonderen Wert auf eine individuelle Betreuung. Seine Leidenschaft für das Fahren und seine pädagogischen Fähigkeiten machen ihn zu einem unverzichtbaren Teil unseres Teams."
              },
              {
                imageSrc: Platzhalter_Teammitglied,
                imageAlt: "Team Member 2",
                title: "Anna Schmidt",
                description: "Anna ist unsere Expertin für Theorieunterricht und Prüfungsvorbereitung. Mit ihrem fundierten Wissen in Verkehrsrecht und Fahrsicherheit hilft sie Schülern, die theoretischen Grundlagen zu meistern. Sie verwendet moderne Lehrmethoden und interaktive Materialien, um den Lernprozess effektiv und unterhaltsam zu gestalten."
              }
            ]}
            variant="default"
          />
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">Banner Mit Icons</h2>
          <BannerMitIcons
            items={[
              {
                icon: <Car className="w-12 h-12 text-primary-500" />,
                title: "Moderne Fahrzeuge",
                description: "Unsere Fahrzeugflotte besteht aus modernen, sicheren Autos für Ihre Ausbildung."
              },
              {
                icon: <Shield className="w-12 h-12 text-primary-500" />,
                title: "Sicherheit zuerst",
                description: "Wir legen größten Wert auf Ihre Sicherheit und die Ihrer Mitfahrer."
              },
              {
                icon: <Users className="w-12 h-12 text-primary-500" />,
                title: "Erfahrene Fahrlehrer",
                description: "Unser Team besteht aus qualifizierten und erfahrenen Fahrlehrern."
              },
              {
                icon: <Award className="w-12 h-12 text-primary-500" />,
                title: "Hohe Erfolgsquote",
                description: "Über 95% unserer Schüler bestehen die Prüfung beim ersten Versuch."
              }
            ]}
          />
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">BilderGallerieStapel (Demo)</h2>
          <BilderGallerieStapel
            images={[
              {
                src: Klasse_A_Default,
                alt: "Klasse A Fahrzeug",
              },
              {
                src: Klasse_A1_Default,
                alt: "Klasse A1 Fahrzeug",
              },
              {
                src: Klasse_A2_Default,
                alt: "Klasse A2 Fahrzeug",
              },
              {
                src: Klasse_AM_Default,
                alt: "Klasse AM Fahrzeug",
              },
              {
                src: Klasse_B_Default,
                alt: "Klasse B Fahrzeug",
              },
            ]}
          />
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">Karten Spotlight</h2>
          <KartenSpotlight className="custom-spotlight-card" spotlightColor="primary">
            <h3 className="text-2xl font-bold text-card-foreground mb-4">Spotlight Card Demo</h3>
            <p className="text-muted-foreground">
              This is a demo of the KartenSpotlight component. Hover over the card to see the spotlight effect.
              The spotlight follows your mouse movement and creates an interactive lighting effect.
            </p>
          </KartenSpotlight>
        </div>
      </section>


      <KlassenUebersichtGridSpotlight />

      <section className="py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">Lottie Search Animation</h2>
          <div className="flex justify-center">
            <Lottie animationData={searchAnimation} loop={true} style={{ width: '600px', height: '100px' }} />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">Lottie Notification Animation</h2>
          <div className="flex justify-center">
            <Lottie animationData={notificationAnimation} loop={true} style={{ width: '600px', height: '100px' }} />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">Text Galerie Stapel</h2>
          <TextGalerieStapel
            title="Entdecken Sie unsere Fahrschule"
            description="Erleben Sie unsere moderne Fahrschule mit erfahrenen Fahrlehrern und einer Vielzahl von Fahrzeugen. Wir bieten Ihnen eine umfassende Ausbildung für alle Führerscheinklassen."
            images={[
              {
                src: Klasse_A_Default,
                alt: "Klasse A Fahrzeug",
              },
              {
                src: Klasse_B_Default,
                alt: "Klasse B Fahrzeug",
              },
              {
                src: Klasse_C_Default,
                alt: "Klasse C Fahrzeug",
              },
              {
                src: Klasse_D_Default,
                alt: "Klasse D Fahrzeug",
              },
              {
                src: Klasse_L_Default,
                alt: "Klasse L Fahrzeug",
              },
              {
                src: Klasse_T_Default,
                alt: "Klasse T Fahrzeug",
              },
            ]}
            imagePosition="right"
          />
        </div>
      </section>
    </div>
  );
};

export default ComponentsTest;