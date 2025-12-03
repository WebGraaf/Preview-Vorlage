import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container } from './LayoutComponents';
import { useConfig } from '../config';

const Header: React.FC = () => {
  const { config, loading, getNavigationItems, getPrimaryLocation } = useConfig();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  // Get dynamic data from config
  const logo = config?.fahrschule.logo || '/default_images/logo_default.webp';
  const telefon = config?.fahrschule.kontakt.telefon || '';
  const email = config?.fahrschule.kontakt.email || '';
  const primaryLocation = getPrimaryLocation();
  const locationName = primaryLocation?.name || '';
  
  // Get navigation items based on active classes
  const fuehrerscheineSubpages = getNavigationItems();

  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsHeaderVisible(true);
      return; // Do not add scroll listener when menu is open
    }

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.innerWidth >= 768) return; // Nur auf Mobile anwenden

      const currentScrollY = window.scrollY;
      const scrollDifference = currentScrollY - lastScrollY;

      // Ignoriere kleine Scroll-Bewegungen, um "Hängen" zu vermeiden
      if (Math.abs(scrollDifference) < 10) return;

      if (scrollDifference > 0 && currentScrollY > 100) {
        setIsHeaderVisible(false);
      } else if (scrollDifference < 0) {
        setIsHeaderVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  };

  // Show loading state or minimal header while config loads
  if (loading) {
    return (
      <header className="sticky top-0 z-50 pt-0 pb-0 border-b-4 border-primary-500 relative shadow-lg">
        <div className="bg-primary-500 py-3 md:py-2">
          <div className="px-4 text-center text-white">Laden...</div>
        </div>
      </header>
    );
  }

  return (
    <header className={`sticky top-0 z-50 pt-0 pb-0 border-b-4 border-primary-500 relative shadow-lg ${isHeaderVisible ? '' : '-translate-y-full'} transition-transform duration-300`}>
      <div className="relative">
        {/* White Bar on the left side */}
        <div className="absolute left-0 top-0 w-[30%] md:w-1/5 bg-white z-10 h-[110%]" style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0 100%)', boxShadow: '4px 4px 10px rgba(0,0,0,0.1)' }}>
          <Link to="/" onClick={closeMenus} className="absolute inset-0 flex items-center justify-center py-1">
            <img src={logo} alt="Führerschein Website" className="w-full h-full object-contain" />
          </Link>
        </div>
        {/* Top Bar - Contact Information */}
        <div className="bg-primary-500 py-3 md:py-2 pl-[30%] md:pl-[22%] md:pr-[300px]">
          <div className="px-4">
            <div className="flex items-center justify-between md:justify-center md:pr-[100px]">
              <div className="flex items-center">
                <div className="flex md:hidden items-center space-x-2 text-header-text text-xs font-medium">
                  <div className="flex items-center space-x-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                    </svg>
                    <span>{telefon}</span>
                  </div>
                  <Link to="/anmelden" className="bg-white text-primary-500 px-2 py-1 rounded text-xs hover:bg-primary-600 hover:text-white transition-colors">
                    Online Anmelden
                  </Link>
                  <div className="hidden sm:flex items-center space-x-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                    </svg>
                    <span>{email}</span>
                  </div>
                </div>
                <div className="hidden md:flex items-center space-x-4 text-header-text text-sm font-semibold">
                  <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                    </svg>
                    <span>{telefon}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                    </svg>
                    <span>{email}</span>
                  </div>
                  {locationName && (
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                      </svg>
                      <span>{locationName}</span>
                    </div>
                  )}
                </div>
              </div>
              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden text-white hover:opacity-75 font-bold p-1 rounded transition-opacity"
              >
                <svg className={`w-6 h-6 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Navigation */}
        <div className="bg-secondary-500 py-4 hidden md:block pl-[22%] pr-[300px]">
          <div className="px-4">
            <div className="relative flex items-center justify-between">
              {/* Desktop Navigation */}
              <nav className="hidden md:flex flex-1 justify-center space-x-6 text-white font-bold">
                <Link to="/" className="hover:text-primary-500 transition-colors font-bold" onClick={closeMenus}>
                  Home
                </Link>

                <Link to="/ueber-uns" className="hover:text-primary-500 transition-colors font-bold" onClick={closeMenus}>
                  Über Uns
                </Link>

                {/* Führerscheine Dropdown */}
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="hover:text-primary-500 transition-colors flex items-center font-bold"
                  >
                    Führerscheine
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className={`absolute top-full left-0 mt-2 w-48 bg-secondary-500 border border-secondary-700 rounded-md shadow-lg z-10 transition-all duration-300 ease-in-out ${isDropdownOpen ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95'}`}>
                    <Link
                      to="/fuehrerscheine"
                      className="block px-4 py-2 text-white hover:bg-secondary-700 hover:text-primary-500"
                      onClick={closeMenus}
                    >
                      Übersicht
                    </Link>
                    {fuehrerscheineSubpages.map((page) => (
                      <Link
                        key={page.path}
                        to={page.path}
                        className="block px-4 py-2 text-white hover:bg-secondary-700 hover:text-primary-500"
                        onClick={closeMenus}
                      >
                        {page.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <Link to="/kontakt" className="hover:text-primary-500 transition-colors font-bold" onClick={closeMenus}>
                  Kontakt
                </Link>
              </nav>

              {/* CTA Button */}
              <Link
                to="/anmelden"
                className="hidden md:block bg-primary-500 text-white px-4 py-2 rounded-md transition-colors ml-auto font-bold"
                onClick={closeMenus}
              >
                anmelden
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Navigation */}
      <div className={`md:hidden bg-secondary-500 z-60 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 max-h-screen' : 'opacity-0 max-h-0 overflow-hidden'}`}>
          <Container>
            <div className="pb-4 border-t border-secondary-700">
                <nav className="flex flex-col space-y-2 text-white">
                  <Link to="/" className="hover:text-primary-500 py-2 font-bold" onClick={closeMenus}>
                    Home
                  </Link>

                  <Link to="/ueber-uns" className="hover:text-primary-500 py-2 font-bold" onClick={closeMenus}>
                    Über Uns
                  </Link>

                  {/* Mobile Führerscheine Section */}
                  <div>
                    <button
                      onClick={toggleDropdown}
                      className="hover:text-primary-500 py-2 flex items-center w-full text-left font-bold"
                    >
                      Führerscheine
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isDropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                      </svg>
                    </button>
                    {isDropdownOpen && (
                      <div className="ml-4 space-y-1">
                        <Link
                          to="/fuehrerscheine"
                          className="block text-gray-300 hover:text-primary-500 py-1 font-semibold"
                          onClick={closeMenus}
                        >
                          Übersicht
                        </Link>
                        {fuehrerscheineSubpages.map((page) => (
                          <Link
                            key={page.path}
                            to={page.path}
                            className="block text-gray-300 hover:text-primary-500 py-1 font-semibold"
                            onClick={closeMenus}
                          >
                            {page.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  <Link to="/kontakt" className="hover:text-primary-500 py-2 font-bold" onClick={closeMenus}>
                    Kontakt
                  </Link>
                  <Link to="/anmelden" className="bg-primary-500 text-white px-4 py-2 rounded-md transition-colors inline-block font-bold" onClick={closeMenus}>
                    anmelden
                  </Link>
                </nav>
              </div>
          </Container>
        </div>
    </header>
  );
};

export default Header;