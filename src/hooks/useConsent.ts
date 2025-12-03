import { useState, useEffect, useCallback } from 'react';

const CONSENT_STORAGE_KEY = 'consent.v1';

type ConsentState = {
  externalMedia: boolean;
  timestamp: string | null;
  version: string;
};

const CONSENT_VERSION = '1.0';

const getInitialState = (): ConsentState => {
  if (typeof window === 'undefined') {
    return { externalMedia: false, timestamp: null, version: CONSENT_VERSION };
  }
  try {
    const storedState = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (storedState) {
      const parsed = JSON.parse(storedState);
      // Ensure version compatibility
      if (parsed.version === CONSENT_VERSION) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Error reading consent state from localStorage', error);
  }
  return { externalMedia: false, timestamp: null, version: CONSENT_VERSION };
};

export const useConsent = () => {
  const [consent, setConsent] = useState<ConsentState>(getInitialState);

  useEffect(() => {
    setConsent(getInitialState());
  }, []);

  const updateConsent = useCallback((newState: Partial<Omit<ConsentState, 'timestamp' | 'version'>>) => {
    setConsent(prevState => {
      const updatedState: ConsentState = {
        ...prevState,
        ...newState,
        timestamp: new Date().toISOString(),
        version: CONSENT_VERSION
      };
      try {
        window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(updatedState));
      } catch (error) {
        console.error('Error writing consent state to localStorage', error);
      }
      return updatedState;
    });
  }, []);

  const hasConsentDecision = useCallback(() => {
    return consent.timestamp !== null;
  }, [consent.timestamp]);

  const revokeConsent = useCallback(() => {
    try {
      window.localStorage.removeItem(CONSENT_STORAGE_KEY);
      setConsent({ externalMedia: false, timestamp: null, version: CONSENT_VERSION });
    } catch (error) {
      console.error('Error revoking consent', error);
    }
  }, []);

  return { consent, updateConsent, hasConsentDecision, revokeConsent };
};