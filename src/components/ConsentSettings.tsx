import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useConsent } from '../hooks/useConsent';
import { Switch } from './ui/Switch';

type ConsentSettingsProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const ConsentSettings = ({ isOpen, onClose }: ConsentSettingsProps) => {
  const { consent, updateConsent } = useConsent();
  const [localConsent, setLocalConsent] = useState(consent.externalMedia);

  useEffect(() => {
    setLocalConsent(consent.externalMedia);
  }, [consent.externalMedia, isOpen]);

  const handleSave = () => {
    updateConsent({ externalMedia: localConsent });
    onClose();
  };

  const handleAcceptAll = () => {
    updateConsent({ externalMedia: true });
    onClose();
  };

  const handleDeclineAll = () => {
    updateConsent({ externalMedia: false });
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div
        className="bg-card-bg rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="consent-settings-title"
      >
        {/* Header */}
        <div className="sticky top-0 bg-card-bg border-b border-border-divider px-5 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <h2 id="consent-settings-title" className="text-lg sm:text-xl font-bold text-text-heading flex items-center gap-2">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Datenschutzeinstellungen
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-secondary-100 transition-colors"
              aria-label="Schließen"
            >
              <svg className="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-5 py-4 sm:px-6 space-y-5">
          {/* Introduction */}
          <div className="text-sm text-text-body leading-relaxed">
            <p>
              Hier können Sie detailliert festlegen, welche Dienste wir auf dieser Website verwenden dürfen.
              Ihre Einstellungen werden gespeichert und können jederzeit geändert werden.
            </p>
          </div>

          {/* Essential Cookies - Always enabled */}
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold text-text-heading text-sm sm:text-base">Essenzielle Cookies</span>
                  <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded-full">Immer aktiv</span>
                </div>
                <p className="text-xs sm:text-sm text-text-muted">
                  Diese Cookies sind für die Grundfunktionen der Website erforderlich (z.B. Speicherung Ihrer Datenschutzeinstellungen).
                  Sie können nicht deaktiviert werden.
                </p>
              </div>
            </div>
          </div>

          {/* External Media / Google Maps */}
          <div className="bg-secondary-50 rounded-lg p-4 border border-secondary-200">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <label htmlFor="google-maps-toggle" className="font-semibold text-text-heading text-sm sm:text-base cursor-pointer">
                    Google Maps
                  </label>
                </div>
                <p className="text-xs sm:text-sm text-text-muted mb-3">
                  Ermöglicht die Anzeige interaktiver Karten zur Darstellung unserer Standorte.
                  Bei Aktivierung werden Daten an Google LLC (USA) übertragen.
                </p>
                <div className="text-xs text-text-muted bg-white/50 rounded p-2 border border-secondary-200">
                  <p className="font-medium mb-1">Übertragene Daten:</p>
                  <ul className="list-disc list-inside space-y-0.5">
                    <li>IP-Adresse</li>
                    <li>Standortdaten (falls freigegeben)</li>
                    <li>Geräteinformationen</li>
                  </ul>
                </div>
              </div>
              <div className="flex-shrink-0 pt-1">
                <Switch
                  id="google-maps-toggle"
                  checked={localConsent}
                  onCheckedChange={setLocalConsent}
                />
              </div>
            </div>
          </div>

          {/* Legal Links */}
          <div className="text-xs sm:text-sm text-text-muted border-t border-border-divider pt-4">
            <p>
              Weitere Informationen zur Datenverarbeitung finden Sie in unserer{' '}
              <Link to="/datenschutz" className="text-primary-600 hover:text-primary-700 underline" onClick={onClose}>
                Datenschutzerklärung
              </Link>
              . Angaben zum Verantwortlichen finden Sie im{' '}
              <Link to="/impressum" className="text-primary-600 hover:text-primary-700 underline" onClick={onClose}>
                Impressum
              </Link>
              .
            </p>
          </div>

          {/* Consent timestamp info */}
          {consent.timestamp && (
            <div className="text-xs text-text-muted bg-secondary-50 rounded p-3 border border-secondary-200">
              <p>
                <span className="font-medium">Letzte Einwilligung:</span>{' '}
                {new Date(consent.timestamp).toLocaleString('de-DE', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })} Uhr
              </p>
            </div>
          )}
        </div>

        {/* Footer with buttons - GDPR compliant: equal visual weight */}
        <div className="sticky bottom-0 bg-card-bg border-t border-border-divider px-5 py-4 sm:px-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleDeclineAll}
              className="w-full sm:w-auto order-2 sm:order-1 px-4 py-2.5 rounded-lg text-sm font-medium
                         bg-secondary-800 text-white hover:bg-secondary-700
                         border border-secondary-800 transition-colors duration-200
                         focus:outline-none focus:ring-2 focus:ring-secondary-400 focus:ring-offset-2"
            >
              Alle ablehnen
            </button>
            <button
              onClick={handleSave}
              className="w-full sm:w-auto order-3 sm:order-2 px-4 py-2.5 rounded-lg text-sm font-medium
                         bg-white text-secondary-800 border border-secondary-300
                         hover:bg-secondary-50 transition-colors duration-200
                         focus:outline-none focus:ring-2 focus:ring-secondary-400 focus:ring-offset-2"
            >
              Auswahl speichern
            </button>
            <button
              onClick={handleAcceptAll}
              className="w-full sm:w-auto sm:ml-auto order-1 sm:order-3 px-4 py-2.5 rounded-lg text-sm font-medium
                         bg-secondary-800 text-white hover:bg-secondary-700
                         border border-secondary-800 transition-colors duration-200
                         focus:outline-none focus:ring-2 focus:ring-secondary-400 focus:ring-offset-2"
            >
              Alle akzeptieren
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};