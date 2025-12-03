import React from 'react';
import { Helmet } from 'react-helmet-async';
import { KlassenUebersicht } from '../components/KlassenUebersicht';
import { useConfig, CLASS_DATA, HauptklasseCode, filterSubclasses } from '../config';

const Fuehrerscheine: React.FC = () => {
  const { config, loading, getActiveClasses, getActiveSubclasses } = useConfig();

  const fahrschuleName = config?.fahrschule.name || 'Fahrschule';

  // Generate tabs from active classes
  const tabs = getActiveClasses().map((classCode: HauptklasseCode) => {
    const classInfo = CLASS_DATA[classCode];
    const activeSubclasses = getActiveSubclasses(classCode);
    const filteredSubclasses = filterSubclasses(classCode, activeSubclasses);

    return {
      label: classInfo.label,
      title: classInfo.title,
      content: classInfo.description,
      link: classInfo.route,
      subclasses: filteredSubclasses
    };
  });

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-text-body">Laden...</div>
      </div>
    );
  }

  // Show message if no classes are active
  if (tabs.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-text-body">
          <h1 className="text-2xl font-bold mb-4">Keine Führerscheinklassen verfügbar</h1>
          <p>Bitte kontaktieren Sie uns für weitere Informationen.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>Führerscheinklassen - {fahrschuleName}</title>
        <meta name="description" content={`Informiere dich über alle Führerscheinklassen, die wir anbieten. Von Auto (Klasse B) über Motorrad (Klasse A) bis LKW (Klasse C) – finde die passende Ausbildung bei ${fahrschuleName}.`} />
        <meta name="keywords" content={`Führerscheinklassen, Fahrschule, Klasse A, Klasse B, Klasse C, Klasse D, LKW-Führerschein, Motorradführerschein, ${fahrschuleName}`} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={`Führerscheinklassen - ${fahrschuleName}`} />
        <meta property="og:description" content={`Entdecke alle Führerscheinklassen bei ${fahrschuleName} und starte deine Ausbildung.`} />
        <meta property="og:type" content="website" />
      </Helmet>
      <KlassenUebersicht tabs={tabs} />
    </div>
  );
};

export default Fuehrerscheine;