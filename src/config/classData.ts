import { Bike, Car, Truck, Bus, Tractor } from 'lucide-react';
import { HauptklasseCode } from './types';

// Static data for license classes - this doesn't change between customers
// Only the active/inactive status comes from the config

export interface SubclassInfo {
  code: string;
  description: string;
}

export interface MainClassInfo {
  code: HauptklasseCode;
  label: string;
  title: string;
  description: string;
  icon: typeof Bike;
  route: string;
  subclasses: SubclassInfo[];
}

// Detailed subclass content for individual class pages
export interface SubclassDetailInfo {
  title: string;
  description: string;
  restrictions: string[];
  imageAlt: string;
  imagePath: string;
  infoCards: {
    iconName: string;
    title: string;
    description: string;
  }[];
  variant: 'default' | 'muted' | 'outline';
  imagePosition: 'left' | 'right';
  cardBgClass: string;
  cardBorderClass: string;
}

// All possible subclasses with their detail content for class pages
export const SUBCLASS_DETAILS: Record<string, SubclassDetailInfo> = {
  // Class A subclasses
  'AM': {
    title: 'Klasse AM',
    description: 'Der Einstieg in die Welt der Zweiräder! Mit der Klasse AM darfst du Kleinkrafträder und Roller bis 50 ccm und 45 km/h fahren. Perfekt für junge Fahrer ab 15 Jahren, die erste Erfahrungen sammeln möchten.',
    restrictions: [
      'Mindestalter: 15 Jahre',
      'Maximale Geschwindigkeit: 45 km/h',
      'Hubraum: bis 50 ccm',
      'Fahrzeugtypen: Kleinkrafträder, Roller, Mopeds',
      'Keine Probezeit erforderlich'
    ],
    imageAlt: 'Klasse AM - Kleinkrafträder und Roller',
    imagePath: '/default_images/Klasse_AM_Default.webp',
    infoCards: [
      { iconName: 'Calendar', title: 'Mindestalter', description: 'Ab 15 Jahren' },
      { iconName: 'Gauge', title: 'Geschwindigkeit', description: 'Bis 45 km/h' },
      { iconName: 'Bike', title: 'Hubraum', description: 'Bis 50 ccm' },
      { iconName: 'Users', title: 'Fahrzeugtyp', description: 'Roller & Mopeds' }
    ],
    variant: 'default',
    imagePosition: 'left',
    cardBgClass: 'bg-card-bg',
    cardBorderClass: 'border border-card-border'
  },
  'A1': {
    title: 'Klasse A1',
    description: 'Mehr Leistung, mehr Möglichkeiten! Die Klasse A1 berechtigt zum Fahren von Leichtkrafträdern bis 125 ccm und 15 PS. Ab 16 Jahren kannst du mit dieser Klasse bereits richtige Motorräder erleben.',
    restrictions: [
      'Mindestalter: 16 Jahre',
      'Maximale Leistung: 15 PS (11 kW)',
      'Hubraum: bis 125 ccm',
      'Leistungsgewicht: max. 0,1 kW/kg',
      'Fahrzeugtypen: Leichtkrafträder'
    ],
    imageAlt: 'Klasse A1 - Leichtkrafträder',
    imagePath: '/default_images/Klasse_A1_Default.webp',
    infoCards: [
      { iconName: 'Calendar', title: 'Mindestalter', description: 'Ab 16 Jahren' },
      { iconName: 'Gauge', title: 'Leistung', description: 'Bis 15 PS (11 kW)' },
      { iconName: 'Bike', title: 'Hubraum', description: 'Bis 125 ccm' },
      { iconName: 'Users', title: 'Fahrzeugtyp', description: 'Leichtkrafträder' }
    ],
    variant: 'default',
    imagePosition: 'left',
    cardBgClass: 'bg-card-bg',
    cardBorderClass: 'border border-card-border'
  },
  'A2': {
    title: 'Klasse A2',
    description: 'Der perfekte Mittelweg! Mit der Klasse A2 steuerst du Motorräder bis 48 PS. Diese Klasse bietet dir echtes Motorradfeeling und ist der ideale Schritt auf dem Weg zur vollen Motorradlizenz. Ab 18 Jahren möglich.',
    restrictions: [
      'Mindestalter: 18 Jahre',
      'Maximale Leistung: 48 PS (35 kW)',
      'Leistungsgewicht: max. 0,2 kW/kg',
      'Hubraum: unbegrenzt',
      'Fahrzeugtypen: Mittelklasse-Motorräder'
    ],
    imageAlt: 'Klasse A2 - Mittelklasse Motorräder',
    imagePath: '/default_images/Klasse_A2_Default.webp',
    infoCards: [
      { iconName: 'Calendar', title: 'Mindestalter', description: 'Ab 18 Jahren' },
      { iconName: 'Gauge', title: 'Leistung', description: 'Bis 48 PS (35 kW)' },
      { iconName: 'Bike', title: 'Hubraum', description: 'Unbegrenzt' },
      { iconName: 'Users', title: 'Fahrzeugtyp', description: 'Mittelklasse Bikes' }
    ],
    variant: 'default',
    imagePosition: 'left',
    cardBgClass: 'bg-card-bg',
    cardBorderClass: 'border border-card-border'
  },
  'A': {
    title: 'Klasse A',
    description: 'Die Königsklasse! Mit der Klasse A darfst du alle Motorräder ohne Leistungsbeschränkung fahren. Volle Freiheit, maximale Power – für echte Motorradfans ab 24 Jahren oder nach 2 Jahren Vorbesitz der Klasse A2.',
    restrictions: [
      'Mindestalter: 24 Jahre (Direkteinstieg) oder 20 Jahre (mit A2)',
      'Leistung: unbegrenzt',
      'Hubraum: unbegrenzt',
      'Fahrzeugtypen: Alle Motorräder',
      'Inkludiert: Klassen AM, A1 und A2'
    ],
    imageAlt: 'Klasse A - Unbegrenzte Motorräder',
    imagePath: '/default_images/Klasse_A_Default.webp',
    infoCards: [
      { iconName: 'Calendar', title: 'Mindestalter', description: 'Ab 24 / 20 Jahren' },
      { iconName: 'Gauge', title: 'Leistung', description: 'Unbegrenzt' },
      { iconName: 'Bike', title: 'Hubraum', description: 'Unbegrenzt' },
      { iconName: 'Users', title: 'Fahrzeugtyp', description: 'Alle Motorräder' }
    ],
    variant: 'default',
    imagePosition: 'left',
    cardBgClass: 'bg-card-bg',
    cardBorderClass: 'border border-card-border'
  },
  // Class B subclasses
  'B': {
    title: 'Klasse B',
    description: 'Der Standard-Pkw-Führerschein. Du darfst Pkw und leichte Transporter bis 3.500 kg zGG fahren – mit bis zu 8 Sitzplätzen zusätzlich zum Fahrer. Ideal für Alltag, Job und Urlaub.',
    restrictions: [
      'Fahrzeug: Kfz bis 3.500 kg zGG',
      'Anhänger: bis 750 kg zGG; darüber, wenn Zuggesamtmasse ≤ 3.500 kg',
      'Sitzplätze: maximal 8 plus Fahrersitz',
      'Erste Fahrerlaubnis: Probezeit'
    ],
    imageAlt: 'Klasse B - Standard-Pkw-Führerschein',
    imagePath: '/default_images/Klasse_B_Default.webp',
    infoCards: [
      { iconName: 'Car', title: 'Fahrzeugklasse', description: 'Pkw bis 3.500 kg zGG' },
      { iconName: 'Scale', title: 'Gesamtmasse', description: 'Zuggesamtmasse max. 3.500 kg' },
      { iconName: 'Users', title: 'Sitzplätze', description: '8 Mitfahrer + Fahrer' },
      { iconName: 'Truck', title: 'Anhänger klein', description: 'Bis 750 kg ohne Zusatz' }
    ],
    variant: 'default',
    imagePosition: 'left',
    cardBgClass: 'bg-card-bg',
    cardBorderClass: 'border border-card-border'
  },
  'BE': {
    title: 'Klasse BE',
    description: 'Erweiterung zu B für große Anhänger. Ideal für Wohnwagen, Pferde- oder schwere Kastenanhänger.',
    restrictions: [
      'Zugfahrzeug: Klasse-B-Fahrzeug (bis 3.500 kg zGG)',
      'Anhänger: über 750 kg bis 3.500 kg zGG',
      'Kombination: praktisch bis rund 7.000 kg möglich',
      'Prüfung: praktische Prüfung, keine Theorie'
    ],
    imageAlt: 'Klasse BE - Erweiterung für große Anhänger',
    imagePath: '/default_images/Klasse_BE_Default.webp',
    infoCards: [
      { iconName: 'Truck', title: 'Anhängelast', description: 'Anhänger bis 3.500 kg zGG' },
      { iconName: 'Link', title: 'Deichsel/Kupplung', description: 'Gespanne für Wohnwagen' },
      { iconName: 'CheckCircle', title: 'Prüfung', description: 'Nur praktische Prüfung' },
      { iconName: 'Scale', title: 'Kombination', description: 'Zug bis ca. 7 t möglich' }
    ],
    variant: 'default',
    imagePosition: 'left',
    cardBgClass: 'bg-card-bg',
    cardBorderClass: 'border border-card-border'
  },
  'BF17': {
    title: 'Klasse BF17 (Begleitetes Fahren ab 17)',
    description: 'Wie Klasse B – nur ab 17. Du fährst mit eingetragenen Begleitpersonen und sammelst sichere Praxis bis zum 18. Geburtstag.',
    restrictions: [
      'Mindestalter: 17 Jahre',
      'Fahrzeug: wie Klasse B',
      'Fahren nur mit eingetragener Begleitperson',
      'Null Promille für Fahranfänger'
    ],
    imageAlt: 'Klasse BF17 - Begleitetes Fahren ab 17',
    imagePath: '/default_images/Klasse_BF17_Default.webp',
    infoCards: [
      { iconName: 'Car', title: 'Fahrzeug', description: 'Pkw bis 3.500 kg zGG' },
      { iconName: 'User', title: 'Begleitung', description: 'Mit Begleitperson' },
      { iconName: 'FileText', title: 'Begleitschein', description: 'Muss mitgeführt werden' },
      { iconName: 'Calendar', title: 'Alter', description: 'Start ab 17 Jahren' }
    ],
    variant: 'default',
    imagePosition: 'left',
    cardBgClass: 'bg-card-bg',
    cardBorderClass: 'border border-card-border'
  },
  'B96': {
    title: 'Klasse B96',
    description: 'Die Zwischenstufe für mehr Anhängelast ohne Prüfung. Perfekt, wenn der Wohnwagen das B-Limit knapp überschreitet.',
    restrictions: [
      'Kombination: Pkw + Anhänger über 750 kg',
      'Zuggesamtmasse: über 3.500 kg bis 4.250 kg',
      'Erwerb: Fahrschul-Schulung, keine Prüfung',
      'Eintrag: Schlüsselzahl 96 zu Klasse B'
    ],
    imageAlt: 'Klasse B96 - Zwischenstufe für mehr Anhängelast',
    imagePath: '/default_images/Klasse_B96_Default.webp',
    infoCards: [
      { iconName: 'Car', title: 'Gespann', description: 'Pkw mit schwerem Anhänger' },
      { iconName: 'Scale', title: 'Gesamtgewicht', description: 'Kombination bis 4.250 kg' },
      { iconName: 'BookOpen', title: 'Schulung', description: 'Erwerb durch Fahrschulung' },
      { iconName: 'Key', title: 'Schlüsselzahl', description: 'Eintrag „96"' }
    ],
    variant: 'default',
    imagePosition: 'left',
    cardBgClass: 'bg-card-bg',
    cardBorderClass: 'border border-card-border'
  },
  'B197': {
    title: 'Klasse B197',
    description: 'Flexible B-Variante: Prüfung auf Automatik, trotzdem Schalt- und Automatikfahrzeuge fahren – nach zusätzlicher Schalt-Schulung.',
    restrictions: [
      'Praktische Prüfung auf Automatikfahrzeug',
      'Schaltkompetenz: Fahrschul-Schulung + Testfahrt',
      'Fahrberechtigung: Schalt- und Automatik-Pkw',
      'Eintrag: Schlüsselzahl 197 (EU-weit nutzbar)'
    ],
    imageAlt: 'Klasse B197 - Flexible B-Variante',
    imagePath: '/default_images/Klasse_B197_Default.webp',
    infoCards: [
      { iconName: 'Settings', title: 'Automatik-Prüfung', description: 'Prüfung auf Automatik' },
      { iconName: 'Cog', title: 'Schalten erlaubt', description: 'Nach Schulung auch Schaltwagen' },
      { iconName: 'CheckCircle', title: 'Nachweis', description: 'Schaltkompetenz bestätigt' },
      { iconName: 'Key', title: 'Schlüsselzahl', description: 'Eintrag „197"' }
    ],
    variant: 'default',
    imagePosition: 'left',
    cardBgClass: 'bg-card-bg',
    cardBorderClass: 'border border-card-border'
  },
  // Class C subclasses
  'C': {
    title: 'Klasse C',
    description: 'Schwere Lkw-Fahrerlaubnis für Güterverkehr. Du darfst Lastkraftwagen über 3.500 kg zGG fahren – ohne großen Anhänger.',
    restrictions: [
      'Fahrzeug: Lkw über 3.500 kg zGG',
      'Anhänger: bis 750 kg zGG',
      'Personen: keine Personenbeförderung',
      'Vorbesitz: Klasse B erforderlich'
    ],
    imageAlt: 'Klasse C - Schwere Lkw-Fahrerlaubnis',
    imagePath: '/default_images/Klasse_C_Default.webp',
    infoCards: [
      { iconName: 'Truck', title: 'Fahrzeugklasse', description: 'Lkw > 3.500 kg zGG' },
      { iconName: 'Truck', title: 'Anhänger', description: 'Bis 750 kg zGG' },
      { iconName: 'Package', title: 'Einsatz', description: 'Gütertransport' },
      { iconName: 'FileText', title: 'Vorbesitz', description: 'Klasse B nötig' }
    ],
    variant: 'default',
    imagePosition: 'left',
    cardBgClass: 'bg-card-bg',
    cardBorderClass: 'border border-card-border'
  },
  'C1': {
    title: 'Klasse C1',
    description: 'Leichte Lkw-Fahrerlaubnis. Ideal für Transporter und kleine Lkw zwischen Pkw und schwerem Lkw.',
    restrictions: [
      'Fahrzeug: über 3.500 kg bis 7.500 kg zGG',
      'Anhänger: bis 750 kg zGG',
      'Personen: keine Busbeförderung',
      'Vorbesitz: Klasse B erforderlich'
    ],
    imageAlt: 'Klasse C1 - Leichte Lkw-Fahrerlaubnis',
    imagePath: '/default_images/Klasse_C1_Default.webp',
    infoCards: [
      { iconName: 'Truck', title: 'Gewichtsbereich', description: '3,5–7,5 t zGG' },
      { iconName: 'Truck', title: 'Anhänger', description: 'Bis 750 kg zGG' },
      { iconName: 'Scale', title: 'Limit', description: 'Obergrenze 7.500 kg' },
      { iconName: 'FileText', title: 'Vorbesitz', description: 'Klasse B nötig' }
    ],
    variant: 'default',
    imagePosition: 'left',
    cardBgClass: 'bg-card-bg',
    cardBorderClass: 'border border-card-border'
  },
  'C1E': {
    title: 'Klasse C1E',
    description: 'Kombinationen mit leichtem Lkw (C1) und schwerem Anhänger. Perfekt für größere Transportaufgaben.',
    restrictions: [
      'Zugfahrzeug: Klasse C1 (3,5–7,5 t zGG)',
      'Anhänger: über 750 kg zGG',
      'Kombination: bis 12.000 kg zGG',
      'Vorbesitz: C1 erforderlich'
    ],
    imageAlt: 'Klasse C1E - Kombinationen mit leichtem Lkw',
    imagePath: '/default_images/Klasse_C1E_Default.webp',
    infoCards: [
      { iconName: 'Truck', title: 'Gespann', description: 'C1-Zug + >750 kg Anhänger' },
      { iconName: 'Scale', title: 'Gesamtgewicht', description: 'Kombination bis 12 t' },
      { iconName: 'Link', title: 'Deichsel', description: 'Tandemanhänger erlaubt' },
      { iconName: 'FileText', title: 'Vorbesitz', description: 'Klasse C1 nötig' }
    ],
    variant: 'default',
    imagePosition: 'left',
    cardBgClass: 'bg-card-bg',
    cardBorderClass: 'border border-card-border'
  },
  'CE': {
    title: 'Klasse CE',
    description: 'Schwerlast-Kombinationen: Sattelzug oder Lkw mit großem Anhänger. Für professionelle Transporte.',
    restrictions: [
      'Zugfahrzeug: Klasse C (Lkw > 3.500 kg zGG)',
      'Anhänger/Sattelauflieger: über 750 kg zGG',
      'Kombination: keine Obergrenze',
      'Vorbesitz: C erforderlich'
    ],
    imageAlt: 'Klasse CE - Schwerlast-Kombinationen',
    imagePath: '/default_images/Klasse_CE_Default.webp',
    infoCards: [
      { iconName: 'Truck', title: 'Fahrzeugart', description: 'Sattelzug oder Gliederzug' },
      { iconName: 'Truck', title: 'Anhänger', description: '>750 kg, auch Auflieger' },
      { iconName: 'Scale', title: 'Grenzen', description: 'Durch Technik begrenzt' },
      { iconName: 'FileText', title: 'Vorbesitz', description: 'Klasse C nötig' }
    ],
    variant: 'default',
    imagePosition: 'left',
    cardBgClass: 'bg-card-bg',
    cardBorderClass: 'border border-card-border'
  },
  // Class D subclasses
  'D': {
    title: 'Klasse D',
    description: 'Bus-Fahrerlaubnis für Linien- und Reisebusse. Du darfst Kraftomnibusse mit mehr als 8 Sitzplätzen führen.',
    restrictions: [
      'Fahrzeug: Bus mit mehr als 8 Fahrgastsitzen',
      'Anhänger: bis 750 kg zGG',
      'Keine Güterfahrzeuge (dafür C/CE)',
      'Vorbesitz: Klasse B erforderlich'
    ],
    imageAlt: 'Klasse D - Bus-Fahrerlaubnis',
    imagePath: '/default_images/Klasse_D_Default.webp',
    infoCards: [
      { iconName: 'Car', title: 'Fahrzeugklasse', description: 'Omnibus > 8 Sitzplätze' },
      { iconName: 'Users', title: 'Fahrgastplätze', description: 'Mehr als 8 + Fahrer' },
      { iconName: 'Truck', title: 'Anhänger', description: 'Bis 750 kg zGG' },
      { iconName: 'FileText', title: 'Vorbesitz', description: 'Klasse B nötig' }
    ],
    variant: 'default',
    imagePosition: 'left',
    cardBgClass: 'bg-card-bg',
    cardBorderClass: 'border border-card-border'
  },
  'D1': {
    title: 'Klasse D1',
    description: 'Die Minibus-Variante. Du darfst kompakte Omnibusse mit bis zu 16 Fahrgastsitzen fahren.',
    restrictions: [
      'Fahrzeug: Bus mit 9 bis 16 Fahrgastsitzen',
      'Länge: maximal 8 Meter',
      'Anhänger: bis 750 kg zGG',
      'Vorbesitz: Klasse B erforderlich'
    ],
    imageAlt: 'Klasse D1 - Minibus-Variante',
    imagePath: '/default_images/Klasse_D1_Default.webp',
    infoCards: [
      { iconName: 'Car', title: 'Fahrzeuggröße', description: 'Bis 16 Sitzplätze' },
      { iconName: 'Ruler', title: 'Länge', description: 'Maximal 8 Meter' },
      { iconName: 'Truck', title: 'Anhänger', description: 'Bis 750 kg zGG' },
      { iconName: 'FileText', title: 'Vorbesitz', description: 'Klasse B nötig' }
    ],
    variant: 'default',
    imagePosition: 'left',
    cardBgClass: 'bg-card-bg',
    cardBorderClass: 'border border-card-border'
  },
  'D1E': {
    title: 'Klasse D1E',
    description: 'Kombinationen mit Minibus (D1) und großem Anhänger – z. B. für Gepäck- oder Technikanhänger.',
    restrictions: [
      'Zugfahrzeug: Klasse D1 (≤ 8 m, bis 16 Sitzplätze)',
      'Anhänger: über 750 kg zGG',
      'Kombination: bis 12.000 kg zGG gesamt',
      'Personenbeförderung im Anhänger: nicht zulässig'
    ],
    imageAlt: 'Klasse D1E - Kombinationen mit Minibus',
    imagePath: '/default_images/Klasse_D1E_Default.webp',
    infoCards: [
      { iconName: 'Car', title: 'Gespann', description: 'D1-Bus mit >750-kg-Anhänger' },
      { iconName: 'Scale', title: 'Gesamtgewicht', description: 'Kombination bis 12 t' },
      { iconName: 'Ban', title: 'Anhänger', description: 'Keine Personen im Anhänger' },
      { iconName: 'Link', title: 'Einsatz', description: 'Gepäckanhänger möglich' }
    ],
    variant: 'default',
    imagePosition: 'left',
    cardBgClass: 'bg-card-bg',
    cardBorderClass: 'border border-card-border'
  },
  'DE': {
    title: 'Klasse DE',
    description: 'Schwere Bus-Kombinationen: großer Reise- oder Linienbus mit Anhänger über 750 kg.',
    restrictions: [
      'Zugfahrzeug: Klasse D (Omnibus > 8 Sitzplätze)',
      'Anhänger: über 750 kg zGG',
      'Kombination: keine Obergrenze',
      'Personenbeförderung im Anhänger: nicht zulässig'
    ],
    imageAlt: 'Klasse DE - Schwere Bus-Kombinationen',
    imagePath: '/default_images/Klasse_DE_Default.webp',
    infoCards: [
      { iconName: 'Car', title: 'Fahrzeugart', description: 'Bus + Anhänger > 750 kg' },
      { iconName: 'Scale', title: 'Grenzen', description: 'Durch Technik begrenzt' },
      { iconName: 'Ban', title: 'Anhänger', description: 'Keine Personenbeförderung' },
      { iconName: 'FileText', title: 'Erweiterung', description: 'Aufbauend auf Klasse D' }
    ],
    variant: 'default',
    imagePosition: 'left',
    cardBgClass: 'bg-card-bg',
    cardBorderClass: 'border border-card-border'
  },
  // Class L
  'L': {
    title: 'Klasse L',
    description: 'Basisklasse für Land- und Forstwirtschaft. Du darfst langsame Traktoren sowie bestimmte Arbeitsmaschinen im Straßenverkehr bewegen.',
    restrictions: [
      'Fahrzeug: land-/forstwirtschaftliche Zugmaschinen bis 40 km/h',
      'Mit Anhänger: Kombination bis 25 km/h',
      'Selbstfahrende Arbeitsmaschinen: bis 25 km/h',
      'Einsatz: nur land-/forstwirtschaftliche Zwecke'
    ],
    imageAlt: 'Klasse L - Basisklasse für Land- und Forstwirtschaft',
    imagePath: '/default_images/Klasse_L_Default.webp',
    infoCards: [
      { iconName: 'Truck', title: 'Fahrzeugtyp', description: 'Traktoren bis 40 km/h' },
      { iconName: 'Truck', title: 'Anhänger', description: 'Mit Anhänger max. 25 km/h' },
      { iconName: 'Cog', title: 'Arbeitsmaschinen', description: 'Stapler bis 25 km/h' },
      { iconName: 'Leaf', title: 'Einsatzbereich', description: 'Nur land-/forstwirtschaftlich' }
    ],
    variant: 'default',
    imagePosition: 'left',
    cardBgClass: 'bg-card-bg',
    cardBorderClass: 'border border-card-border'
  },
  // Class T
  'T': {
    title: 'Klasse T',
    description: 'Für schnelle Land- und Forstwirtschaft. Du darfst leistungsstarke Traktoren bis 60 km/h sowie bestimmte Erntemaschinen führen.',
    restrictions: [
      'Zugmaschinen: land-/forstwirtschaftliche Traktoren bis 60 km/h',
      'Anhänger: erlaubt; Gespanne im lof-Einsatz',
      'Selbstfahrende Arbeits-/Erntemaschinen: bis 40 km/h',
      'Einsatz: ausschließlich für land-/forstwirtschaftliche Zwecke'
    ],
    imageAlt: 'Klasse T - Für schnelle Land- und Forstwirtschaft',
    imagePath: '/default_images/Klasse_T_Default.webp',
    infoCards: [
      { iconName: 'Truck', title: 'Fahrzeugtyp', description: 'Traktoren im lof-Einsatz' },
      { iconName: 'Gauge', title: 'Höchstgeschwindigkeit', description: 'Traktoren bis 60 km/h' },
      { iconName: 'Truck', title: 'Gespann', description: 'Traktor mit Anhänger' },
      { iconName: 'Leaf', title: 'Zweckbindung', description: 'Nur land-/forstwirtschaftlich' }
    ],
    variant: 'default',
    imagePosition: 'left',
    cardBgClass: 'bg-card-bg',
    cardBorderClass: 'border border-card-border'
  }
};

// Page header content for each main class
export interface ClassPageHeader {
  title: string;
  description1: string;
  description2: string;
}

export const CLASS_PAGE_HEADERS: Record<HauptklasseCode, ClassPageHeader> = {
  'A': {
    title: 'Motorrad-Führerscheine',
    description1: 'Entdecke die Freiheit auf zwei Rädern! Bei uns erhältst du eine professionelle Ausbildung für alle Motorradklassen – vom kleinen Roller bis zum kraftvollen Bike.',
    description2: 'Wir begleiten dich auf deinem Weg zum Führerschein mit erfahrenen Fahrlehrern, modernster Ausstattung und individueller Betreuung.'
  },
  'B': {
    title: 'Pkw-Führerscheine',
    description1: 'Entdecke die Freiheit auf vier Rädern! Bei uns erhältst du eine professionelle Ausbildung für alle Pkw-Klassen – vom Standard-Führerschein bis zu speziellen Varianten.',
    description2: 'Wir begleiten dich auf deinem Weg zum Führerschein mit erfahrenen Fahrlehrern, modernster Ausstattung und individueller Betreuung.'
  },
  'C': {
    title: 'Lkw-Führerscheine',
    description1: 'Entdecke die Welt des Gütertransports! Bei uns erhältst du eine professionelle Ausbildung für alle Lkw-Klassen – vom leichten Transporter bis zum schweren Lastzug.',
    description2: 'Wir begleiten dich auf deinem Weg zum Führerschein mit erfahrenen Fahrlehrern, modernster Ausstattung und individueller Betreuung.'
  },
  'D': {
    title: 'Bus-Führerscheine',
    description1: 'Entdecke die Welt der Personenbeförderung! Bei uns erhältst du eine professionelle Ausbildung für alle Bus-Klassen – vom Minibus bis zum Reisebus.',
    description2: 'Wir begleiten dich auf deinem Weg zum Führerschein mit erfahrenen Fahrlehrern, modernster Ausstattung und individueller Betreuung.'
  },
  'L': {
    title: 'Land- und Forstwirtschaftliche Führerscheine',
    description1: 'Entdecke die Welt der Land- und Forstwirtschaft! Bei uns erhältst du eine professionelle Ausbildung für land- und forstwirtschaftliche Fahrzeuge.',
    description2: 'Wir begleiten dich auf deinem Weg zum Führerschein mit erfahrenen Fahrlehrern, modernster Ausstattung und individueller Betreuung.'
  },
  'T': {
    title: 'Land- und Forstwirtschaftliche Führerscheine',
    description1: 'Entdecke die Welt der Land- und Forstwirtschaft! Bei uns erhältst du eine professionelle Ausbildung für land- und forstwirtschaftliche Fahrzeuge.',
    description2: 'Wir begleiten dich auf deinem Weg zum Führerschein mit erfahrenen Fahrlehrern, modernster Ausstattung und individueller Betreuung.'
  }
};

// CTA content for each main class
export interface ClassCTA {
  title: string;
  description: string;
  buttonText: string;
}

export const CLASS_CTA: Record<HauptklasseCode, ClassCTA> = {
  'A': {
    title: 'Bereit durchzustarten?',
    description: 'Egal für welche Klasse du dich entscheidest – wir sind für dich da! Melde dich noch heute an und starte deine Motorrad-Ausbildung bei uns.',
    buttonText: 'Jetzt anmelden'
  },
  'B': {
    title: 'Bereit durchzustarten?',
    description: 'Egal für welche Klasse du dich entscheidest – wir sind für dich da! Melde dich noch heute an und starte deine Pkw-Ausbildung bei uns.',
    buttonText: 'Jetzt anmelden'
  },
  'C': {
    title: 'Bereit durchzustarten?',
    description: 'Egal für welche Klasse du dich entscheidest – wir sind für dich da! Melde dich noch heute an und starte deine Lkw-Ausbildung bei uns.',
    buttonText: 'Jetzt anmelden'
  },
  'D': {
    title: 'Bereit durchzustarten?',
    description: 'Egal für welche Klasse du dich entscheidest – wir sind für dich da! Melde dich noch heute an und starte deine Bus-Ausbildung bei uns.',
    buttonText: 'Jetzt anmelden'
  },
  'L': {
    title: 'Bereit durchzustarten?',
    description: 'Egal für welche Klasse du dich entscheidest – wir sind für dich da! Melde dich noch heute an und starte deine land- und forstwirtschaftliche Ausbildung bei uns.',
    buttonText: 'Jetzt anmelden'
  },
  'T': {
    title: 'Bereit durchzustarten?',
    description: 'Egal für welche Klasse du dich entscheidest – wir sind für dich da! Melde dich noch heute an und starte deine land- und forstwirtschaftliche Ausbildung bei uns.',
    buttonText: 'Jetzt anmelden'
  }
};

// Define which subclasses belong to which main class (in display order)
export const MAIN_CLASS_SUBCLASSES: Record<HauptklasseCode, string[]> = {
  'A': ['AM', 'A1', 'A2', 'A'],
  'B': ['B', 'BE', 'BF17', 'B96', 'B197'],
  'C': ['C', 'C1', 'C1E', 'CE'],
  'D': ['D', 'D1', 'D1E', 'DE'],
  'L': ['L'],
  'T': ['T']
};

// Complete class data with all possible subclasses
export const CLASS_DATA: Record<HauptklasseCode, MainClassInfo> = {
  A: {
    code: 'A',
    label: 'Klasse A',
    title: 'Führerschein Klasse A',
    description: 'Lerne Motorräder über 50 cm³ sicher zu fahren und genieße volle Freiheit auf zwei Rädern.',
    icon: Bike,
    route: '/fuehrerscheine/klasse-a',
    subclasses: [
      { code: 'AM', description: 'Kleinkrafträder / Mofas bis 45 km/h' },
      { code: 'A1', description: 'Leichtkrafträder bis 125 ccm / 11 kW' },
      { code: 'A2', description: 'Motorräder bis 35 kW / 0,2 kW/kg' },
      { code: 'A', description: 'Alle Motorräder ohne Leistungsbeschränkung' }
    ]
  },
  B: {
    code: 'B',
    label: 'Klasse B',
    title: 'Führerschein Klasse B',
    description: 'Erhalte deinen Pkw-Schein für Fahrzeuge bis 3,5 t und starte mobil in Alltag und Freizeit.',
    icon: Car,
    route: '/fuehrerscheine/klasse-b',
    subclasses: [
      { code: 'BF17', description: 'Begleitetes Fahren ab 17 (Klasse B unter Aufsicht bis 18 J.)' },
      { code: 'B', description: 'Pkw bis 3,5 t zGG / max. 8 Sitzplätze + Anhänger ≤ 750 kg' },
      { code: 'B96', description: 'Pkw-Kombi bis 4,25 t zGG (ohne Prüfung, nur Schulung)' },
      { code: 'BE', description: 'Pkw + Anhänger > 750 kg (bis 3,5 t Anhänger)' },
      { code: 'B196', description: 'Erweiterung B: Motorräder bis 125 ccm (A1); nur D-Land' },
      { code: 'B197', description: 'Automatikprüfung mit Schaltkompetenz (gilt EU-weit)' }
    ]
  },
  C: {
    code: 'C',
    label: 'Klasse C',
    title: 'Führerschein Klasse C',
    description: 'Fahre Lkw über 3,5 t sicher und professionell – ideal für den Einstieg in die Berufswelt.',
    icon: Truck,
    route: '/fuehrerscheine/klasse-c',
    subclasses: [
      { code: 'C1', description: '3,5 – 7,5 t zGG, Anhänger ≤ 750 kg' },
      { code: 'C1E', description: 'C1 + Anhänger > 750 kg (bis 12 t Gesamt)' },
      { code: 'C', description: '> 3,5 t zGG, Anhänger ≤ 750 kg' },
      { code: 'CE', description: 'C + Anhänger > 750 kg' }
    ]
  },
  D: {
    code: 'D',
    label: 'Klasse D',
    title: 'Führerschein Klasse D',
    description: 'Werde Busfahrer*in und transportiere mehr als 8 Fahrgäste sicher und verantwortungsvoll.',
    icon: Bus,
    route: '/fuehrerscheine/klasse-d',
    subclasses: [
      { code: 'D1', description: '9–16 Sitzplätze, max. 8 m Länge' },
      { code: 'D1E', description: 'D1 + Anhänger > 750 kg' },
      { code: 'D', description: 'Bus mit mehr als 8 Sitzplätzen' },
      { code: 'DE', description: 'D + Anhänger > 750 kg' }
    ]
  },
  L: {
    code: 'L',
    label: 'Klasse L',
    title: 'Führerschein Klasse L',
    description: 'Fahre landwirtschaftliche Zugmaschinen bis 40 km/h – perfekt für Hof und Feldarbeit.',
    icon: Tractor,
    route: '/fuehrerscheine/klasse-l',
    subclasses: [
      { code: 'L', description: 'Zugmaschinen bis 40 km/h bbH (mit Anhänger max. 25 km/h)' }
    ]
  },
  T: {
    code: 'T',
    label: 'Klasse T',
    title: 'Führerschein Klasse T',
    description: 'Steuere starke Zugmaschinen bis 60 km/h sicher und effizient in Landwirtschaft & Forst.',
    icon: Tractor,
    route: '/fuehrerscheine/klasse-t',
    subclasses: [
      { code: 'T', description: 'Zugmaschinen bis 60 km/h bbH (nur für land- und forstwirtschaftliche Zwecke)' }
    ]
  }
};

// Get class info by code
export function getClassInfo(code: HauptklasseCode): MainClassInfo {
  return CLASS_DATA[code];
}

// Get all class codes in order
export function getAllClassCodes(): HauptklasseCode[] {
  return ['A', 'B', 'C', 'D', 'L', 'T'];
}

// Filter subclasses based on active list
export function filterSubclasses(
  classCode: HauptklasseCode, 
  activeSubclasses: string[]
): SubclassInfo[] {
  const classInfo = CLASS_DATA[classCode];
  return classInfo.subclasses.filter(sub => activeSubclasses.includes(sub.code));
}

// Get spotlight color for class cards
export function getSpotlightColor(): 'primary' | 'secondary' {
  return 'primary';
}