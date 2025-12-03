import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Section } from '../components/LayoutComponents';

const Impressum: React.FC = () => {
  return (
    <div className="bg-page-bg">
      <Helmet>
        <title>Impressum - Deine Fahrschule</title>
        <meta name="description" content="Impressum und rechtliche Hinweise für [Fahrschulname]. Hier finden Sie unsere Kontaktdaten, Angaben zum Unternehmen und weitere rechtliche Informationen." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="[Ihre-Webseiten-URL]/impressum" />
      </Helmet>
      <Section background="card-bg" padding="xl">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-text-heading mb-8">Impressum</h1>

            <div className="space-y-8 text-text-body">
              <div>
                <h2 className="text-2xl font-semibold text-text-heading mb-3">
                  Angaben gemäß § 5 TMG
                </h2>
                <p className="mb-2">Fahrschule DriveAcademy GmbH</p>
                <p className="mb-2">Hauptstraße 123</p>
                <p className="mb-2">10115 Berlin</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-text-heading mb-3">
                  Vertreten durch
                </h2>
                <p>Geschäftsführer: Michael Schmidt</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-text-heading mb-3">
                  Kontakt
                </h2>
                <p className="mb-2">Telefon: +49 (0) 30 12345678</p>
                <p className="mb-2">E-Mail: info@driveacademy.de</p>
                <p className="mb-2">Website: www.driveacademy.de</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-text-heading mb-3">
                  Registereintrag
                </h2>
                <p className="mb-2">Eintragung im Handelsregister</p>
                <p className="mb-2">Registergericht: Amtsgericht Berlin-Charlottenburg</p>
                <p className="mb-2">Registernummer: HRB 123456 B</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-text-heading mb-3">
                  Umsatzsteuer-ID
                </h2>
                <p className="mb-2">
                  Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
                </p>
                <p>DE123456789</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-text-heading mb-3">
                  Aufsichtsbehörde
                </h2>
                <p className="mb-2">Senatsverwaltung für Bildung, Jugend und Familie</p>
                <p className="mb-2">Bernhard-Weiß-Straße 6</p>
                <p className="mb-2">10178 Berlin</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-text-heading mb-3">
                  Fahrlehrererlaubnis
                </h2>
                <p className="mb-2">
                  Fahrlehrererlaubnis erteilt durch: Senatsverwaltung für Bildung, Jugend und Familie Berlin
                </p>
                <p>Erlaubnisnummer: FL-2024-12345</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-text-heading mb-3">
                  Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
                </h2>
                <p className="mb-2">Michael Schmidt</p>
                <p className="mb-2">Hauptstraße 123</p>
                <p>10115 Berlin</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-text-heading mb-3">
                  Haftungsausschluss
                </h2>

                <h3 className="text-xl font-semibold text-text-heading mb-2 mt-4">
                  Haftung für Inhalte
                </h3>
                <p className="mb-4 leading-relaxed">
                  Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den
                  allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
                  verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen
                  zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                </p>

                <h3 className="text-xl font-semibold text-text-heading mb-2 mt-4">
                  Haftung für Links
                </h3>
                <p className="mb-4 leading-relaxed">
                  Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
                  Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
                  verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                </p>

                <h3 className="text-xl font-semibold text-text-heading mb-2 mt-4">
                  Urheberrecht
                </h3>
                <p className="leading-relaxed">
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
                  Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
                  Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                </p>
              </div>

              <div className="pt-8 border-t border-border-divider">
                <p className="text-sm text-text-muted">
                  Stand: Oktober 2025
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default Impressum;
