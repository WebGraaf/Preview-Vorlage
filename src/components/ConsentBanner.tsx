import { useState } from 'react';
import { Link } from 'react-router-dom';

type ConsentBannerProps = {
  isVisible: boolean;
  onAccept: () => void;
  onDecline: () => void;
  onOpenSettings: () => void;
};

export const ConsentBanner = ({ isVisible, onAccept, onDecline, onOpenSettings }: ConsentBannerProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isVisible) {
    return null;
  }

  // Compact view - minimal screen space
  if (!isExpanded) {
    return (
      <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-md z-50 bg-card-bg shadow-2xl rounded-xl border border-card-border">
        <div className="p-4">
          {/* Compact header with cookie icon */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-heading">
                Wir nutzen Cookies
              </p>
              <p className="text-xs text-text-muted mt-0.5">
                Für Google Maps & bessere Nutzererfahrung.{' '}
                <button
                  onClick={() => setIsExpanded(true)}
                  className="text-primary-600 hover:text-primary-700 underline"
                >
                  Mehr erfahren
                </button>
              </p>
            </div>
          </div>

          {/* Compact buttons - GDPR compliant: equal visual weight */}
          <div className="flex gap-2 mt-3">
            <button
              onClick={onDecline}
              className="flex-1 px-3 py-2 rounded-lg text-xs font-medium
                         bg-secondary-800 text-white hover:bg-secondary-700
                         border border-secondary-800 transition-colors duration-200"
            >
              Ablehnen
            </button>
            <button
              onClick={onOpenSettings}
              className="flex-1 px-3 py-2 rounded-lg text-xs font-medium
                         bg-white text-secondary-800 border border-secondary-300
                         hover:bg-secondary-50 transition-colors duration-200"
            >
              Anpassen
            </button>
            <button
              onClick={onAccept}
              className="flex-1 px-3 py-2 rounded-lg text-xs font-medium
                         bg-secondary-800 text-white hover:bg-secondary-700
                         border border-secondary-800 transition-colors duration-200"
            >
              Akzeptieren
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Expanded view - full details
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card-bg shadow-2xl border-t border-card-border">
      <div className="container mx-auto px-4 py-4 sm:px-6 sm:py-5">
        {/* Header with collapse button */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base sm:text-lg font-semibold text-text-heading flex items-center gap-2">
            <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Datenschutzeinstellungen
          </h2>
          <button
            onClick={() => setIsExpanded(false)}
            className="p-1.5 rounded-lg hover:bg-secondary-100 transition-colors"
            aria-label="Minimieren"
          >
            <svg className="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Description text - GDPR compliant */}
        <div className="text-sm text-text-body leading-relaxed mb-3">
          <p>
            Wir nutzen Cookies und ähnliche Technologien. Bei „Alle akzeptieren" werden Daten (z.B. IP-Adresse)
            an Google LLC (USA) übertragen.{' '}
            <Link to="/datenschutz" className="text-primary-600 hover:text-primary-700 underline">
              Datenschutzerklärung
            </Link>
            {' '}·{' '}
            <Link to="/impressum" className="text-primary-600 hover:text-primary-700 underline">
              Impressum
            </Link>
          </p>
        </div>

        {/* Buttons - GDPR compliant: equal visual weight for accept/decline */}
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={onDecline}
            className="w-full sm:w-auto order-2 sm:order-1 px-4 py-2 rounded-lg text-sm font-medium
                       bg-primary-600 text-white hover:bg-primary-700
                       border border-primary-600 transition-colors duration-200"
          >
            Nur Essenzielle
          </button>
          <button
            onClick={onOpenSettings}
            className="w-full sm:w-auto order-3 sm:order-2 px-4 py-2 rounded-lg text-sm font-medium
                       bg-white text-secondary-800 border border-secondary-300
                       hover:bg-secondary-50 transition-colors duration-200"
          >
            Einstellungen
          </button>
          <button
            onClick={onAccept}
            className="w-full sm:w-auto sm:ml-auto order-1 sm:order-3 px-4 py-2 rounded-lg text-sm font-medium
                       bg-primary-600 text-white hover:bg-primary-700
                       border border-primary-600 transition-colors duration-200"
          >
            Alle akzeptieren
          </button>
        </div>

        {/* Legal note */}
        <p className="text-xs text-text-muted mt-2">
          Einwilligung jederzeit widerrufbar über „Privatsphäre" im Footer.
        </p>
      </div>
    </div>
  );
};