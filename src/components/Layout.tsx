import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ConsentBanner } from './ConsentBanner';
import { ConsentSettings } from './ConsentSettings';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
};
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

import { useConsent } from '../hooks/useConsent';

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { consent, updateConsent } = useConsent();
  const [bannerVisible, setBannerVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const consentGiven = localStorage.getItem('consent.v1');
      if (!consentGiven) {
        setBannerVisible(true);
      } else {
        // Check if consent has a valid timestamp (user made a decision)
        try {
          const parsed = JSON.parse(consentGiven);
          if (!parsed.timestamp) {
            setBannerVisible(true);
          }
        } catch {
          setBannerVisible(true);
        }
      }
    }
  }, []);

  const handleAccept = () => {
    updateConsent({ externalMedia: true });
    setBannerVisible(false);
  };

  const handleDecline = () => {
    updateConsent({ externalMedia: false });
    setBannerVisible(false);
  };

  const handleOpenSettings = () => {
    setIsSettingsOpen(true);
  };
  
  const handleCloseSettings = () => {
    setIsSettingsOpen(false);
    // Check if user has made a consent decision
    const consentGiven = localStorage.getItem('consent.v1');
    if (!consentGiven) {
      setBannerVisible(true);
    } else {
      try {
        const parsed = JSON.parse(consentGiven);
        if (!parsed.timestamp) {
          setBannerVisible(true);
        }
      } catch {
        setBannerVisible(true);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-page-bg">
      <Header />
      <main className="flex-grow">{children}</main>
      <footer className="bg-secondary-800 text-white py-12">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">DriveAcademy GmbH</h3>
              <p className="text-sm text-secondary-300">
                Hauptstraße 123<br />
                10115 Berlin<br />
                Germany
              </p>
              <p className="text-sm text-secondary-300">&copy; 2025 DriveAcademy GmbH</p>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Kontakt</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <a href="tel:+493012345678" className="hover:text-primary-300 transition-colors">
                    +49 (0) 30 12345678
                  </a>
                </p>
                <p>
                  <a href="mailto:info@driveacademy.de" className="hover:text-primary-300 transition-colors">
                    info@driveacademy.de
                  </a>
                </p>
                <p>
                  <a href="https://www.driveacademy.de" target="_blank" rel="noopener noreferrer" className="hover:text-primary-300 transition-colors">
                    www.driveacademy.de
                  </a>
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Schnellzugriff</h3>
              <div className="space-y-2 text-sm">
                <Link to="/" className="block hover:text-primary-300 transition-colors">Startseite</Link>
                <Link to="/fuehrerscheine" className="block hover:text-primary-300 transition-colors">Führerscheine</Link>
                <Link to="/ueber-uns" className="block hover:text-primary-300 transition-colors">Über Uns</Link>
                <Link to="/kontakt" className="block hover:text-primary-300 transition-colors">Kontakt</Link>
              </div>
            </div>

            {/* Legal */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Rechtliches</h3>
              <div className="space-y-2 text-sm">
                <Link to="/datenschutz" className="block hover:text-primary-300 transition-colors">Datenschutz</Link>
                <Link to="/impressum" className="block hover:text-primary-300 transition-colors">Impressum</Link>
                <button onClick={() => setIsSettingsOpen(true)} className="block hover:text-primary-300 transition-colors text-left">
                  Privatsphäre
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 pt-8 border-t border-secondary-700 text-center text-sm text-secondary-400">
            <p>Geschäftsführer: Michael Schmidt | Fahrlehrererlaubnis: FL-2024-12345</p>
          </div>
        </Container>
      </footer>
      <ConsentBanner
        isVisible={bannerVisible}
        onAccept={handleAccept}
        onDecline={handleDecline}
        onOpenSettings={handleOpenSettings}
      />
      <ConsentSettings isOpen={isSettingsOpen} onClose={handleCloseSettings} />
    </div>
  );
};

export default Layout;