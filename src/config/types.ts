// TypeScript interfaces for Fahrschule configuration

export interface FahrschuleKontakt {
  telefon: string;
  email: string;
}

export interface Fahrschule {
  name: string;
  logo?: string;
  kontakt: FahrschuleKontakt;
}

export interface Texte {
  heroDescription: string;
  unserefaehrschuleDescription: string;
  ueberUnsIntro: string;
}

// Image configuration types
export interface GalleryImage {
  src: string;
  alt: string;
}

export interface TeamMember {
  imageSrc: string;
  name: string;
  description?: string;
}

export interface ImageConfig {
  // Startseite - Bilderstapel (1-n images)
  gallerieStapel: GalleryImage[];
  
  // Startseite - Vorher/Nachher Bildvergleich
  bildVergleich: {
    leftImage: string;
    rightImage: string;
  };
  
  // Startseite - Professionelle Fahrausbildung
  professionelleFahrausbildung: string;
  
  // Startseite - Topmoderner Fuhrpark
  topmodernerFuhrpark: string;
  
  // Über uns - Unsere Werte
  unsereWerte: string;
  
  // Über uns - Team (1-n members with name tags)
  team: TeamMember[];
}

export interface Standort {
  id: string;
  name: string;
  adresse: string;
  telefon: string;
  email?: string;
  oeffnungszeiten: string;
  googleMapsUrl: string;
  istHauptstandort?: boolean;
}

// Main license class codes
export type HauptklasseCode = 'A' | 'B' | 'C' | 'D' | 'L' | 'T';

// Subclass types for each main class
export type UnterklasseA = 'AM' | 'A1' | 'A2' | 'A';
export type UnterklasseB = 'BF17' | 'B' | 'B96' | 'BE' | 'B196' | 'B197';
export type UnterklasseC = 'C1' | 'C1E' | 'C' | 'CE';
export type UnterklasseD = 'D1' | 'D1E' | 'D' | 'DE';
export type UnterklasseL = 'L';
export type UnterklasseT = 'T';

export type Unterklasse = UnterklasseA | UnterklasseB | UnterklasseC | UnterklasseD | UnterklasseL | UnterklasseT;

export interface Fuehrerscheinklasse {
  aktiv: boolean;
  unterklassen: string[];
}

export interface Fuehrerscheinklassen {
  A: Fuehrerscheinklasse;
  B: Fuehrerscheinklasse;
  C: Fuehrerscheinklasse;
  D: Fuehrerscheinklasse;
  L: Fuehrerscheinklasse;
  T: Fuehrerscheinklasse;
}

export interface FahrschuleConfig {
  fahrschule: Fahrschule;
  texte?: Texte;
  standorte: Standort[];
  fuehrerscheinklassen: Fuehrerscheinklassen;
}

// Helper type for location display (used by components)
export interface LocationDisplay {
  label: string;
  address: string;
  phone: string;
  hours: string;
  mapSrc: string;
}

// Convert Standort to LocationDisplay format
export function standortToLocationDisplay(standort: Standort): LocationDisplay {
  return {
    label: standort.name,
    address: standort.adresse,
    phone: standort.telefon,
    hours: standort.oeffnungszeiten,
    mapSrc: standort.googleMapsUrl
  };
}

// All possible subclasses for each main class (for validation/reference)
export const ALLE_UNTERKLASSEN: Record<HauptklasseCode, string[]> = {
  A: ['AM', 'A1', 'A2', 'A'],
  B: ['BF17', 'B', 'B96', 'BE', 'B196', 'B197'],
  C: ['C1', 'C1E', 'C', 'CE'],
  D: ['D1', 'D1E', 'D', 'DE'],
  L: ['L'],
  T: ['T']
};

// Route paths for each main class
export const KLASSEN_ROUTES: Record<HauptklasseCode, string> = {
  A: '/fuehrerscheine/klasse-a',
  B: '/fuehrerscheine/klasse-b',
  C: '/fuehrerscheine/klasse-c',
  D: '/fuehrerscheine/klasse-d',
  L: '/fuehrerscheine/klasse-l',
  T: '/fuehrerscheine/klasse-t'
};

// Display names for each main class
export const KLASSEN_NAMEN: Record<HauptklasseCode, string> = {
  A: 'Klasse A',
  B: 'Klasse B',
  C: 'Klasse C',
  D: 'Klasse D',
  L: 'Klasse L',
  T: 'Klasse T'
};