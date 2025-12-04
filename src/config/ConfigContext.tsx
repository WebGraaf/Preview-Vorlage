import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  FahrschuleConfig,
  ImageConfig,
  HauptklasseCode,
  Standort,
  standortToLocationDisplay,
  LocationDisplay,
  KLASSEN_ROUTES,
  KLASSEN_NAMEN
} from './types';

interface ConfigContextType {
  config: FahrschuleConfig | null;
  bilderConfig: ImageConfig | null;
  loading: boolean;
  error: string | null;
  // Helper functions
  isClassActive: (hauptklasse: HauptklasseCode) => boolean;
  isSubclassActive: (hauptklasse: HauptklasseCode, unterklasse: string) => boolean;
  getActiveClasses: () => HauptklasseCode[];
  getActiveSubclasses: (hauptklasse: HauptklasseCode) => string[];
  getPrimaryLocation: () => Standort | undefined;
  getLocationsForDisplay: () => LocationDisplay[];
  getNavigationItems: () => { name: string; path: string }[];
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

interface ConfigProviderProps {
  children: ReactNode;
}

export const ConfigProvider: React.FC<ConfigProviderProps> = ({ children }) => {
  const [config, setConfig] = useState<FahrschuleConfig | null>(null);
  const [bilderConfig, setBilderConfig] = useState<ImageConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load both config files in parallel
    Promise.all([
      fetch('/fahrschule-config.json').then(res => {
        if (!res.ok) {
          throw new Error(`Failed to load fahrschule-config: ${res.status}`);
        }
        return res.json();
      }),
      fetch('/bilder-config.json').then(res => {
        if (!res.ok) {
          throw new Error(`Failed to load bilder-config: ${res.status}`);
        }
        return res.json();
      })
    ])
      .then(([fahrschuleData, bilderData]: [FahrschuleConfig, ImageConfig]) => {
        setConfig(fahrschuleData);
        setBilderConfig(bilderData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading config files:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const isClassActive = (hauptklasse: HauptklasseCode): boolean => {
    return config?.fuehrerscheinklassen[hauptklasse]?.aktiv ?? false;
  };

  const isSubclassActive = (hauptklasse: HauptklasseCode, unterklasse: string): boolean => {
    const klasse = config?.fuehrerscheinklassen[hauptklasse];
    if (!klasse?.aktiv) return false;
    return klasse.unterklassen.includes(unterklasse);
  };

  const getActiveClasses = (): HauptklasseCode[] => {
    if (!config) return [];
    return (['A', 'B', 'C', 'D', 'L', 'T'] as HauptklasseCode[])
      .filter(k => config.fuehrerscheinklassen[k]?.aktiv);
  };

  const getActiveSubclasses = (hauptklasse: HauptklasseCode): string[] => {
    if (!config) return [];
    const klasse = config.fuehrerscheinklassen[hauptklasse];
    if (!klasse?.aktiv) return [];
    return klasse.unterklassen;
  };

  const getPrimaryLocation = (): Standort | undefined => {
    if (!config) return undefined;
    return config.standorte.find(s => s.istHauptstandort) ?? config.standorte[0];
  };

  const getLocationsForDisplay = (): LocationDisplay[] => {
    if (!config) return [];
    return config.standorte.map(standortToLocationDisplay);
  };

  const getNavigationItems = (): { name: string; path: string }[] => {
    const activeClasses = getActiveClasses();
    return activeClasses.map(klasse => ({
      name: KLASSEN_NAMEN[klasse],
      path: KLASSEN_ROUTES[klasse]
    }));
  };

  const value: ConfigContextType = {
    config,
    bilderConfig,
    loading,
    error,
    isClassActive,
    isSubclassActive,
    getActiveClasses,
    getActiveSubclasses,
    getPrimaryLocation,
    getLocationsForDisplay,
    getNavigationItems
  };

  return (
    <ConfigContext.Provider value={value}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = (): ConfigContextType => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};

// Export the context for testing purposes
export { ConfigContext };