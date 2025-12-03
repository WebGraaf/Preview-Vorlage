import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Section } from '../components/LayoutComponents';

const Datenschutz: React.FC = () => {
  return (
    <div className="bg-page-bg">
      <Helmet>
        <title>Datenschutz - DriveAcademy</title>
        <meta name="description" content="Datenschutzhinweise für DriveAcademy GmbH." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="[Ihre-Webseiten-URL]/datenschutz" />
      </Helmet>
      <Section background="card-bg" padding="xl">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-text-heading mb-8">Datenschutz</h1>

            <div className="space-y-8 text-text-body">
              {/* Datenschutz-Inhalte werden hier eingefügt */}
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default Datenschutz;