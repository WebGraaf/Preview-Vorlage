import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] bg-page-bg text-center p-4">
      <h1 className="text-8xl font-bold text-primary-500 drop-shadow-lg">404</h1>
      <h2 className="text-3xl font-semibold text-text-heading mt-4 mb-2">Hoppla! Seite nicht gefunden.</h2>
      <p className="text-text-body max-w-md mb-8">
        Das ist uns jetzt aber unangenehm. Die von Ihnen gesuchte Seite scheint sich verfahren zu haben.
        Aber keine Sorge, wir bringen Sie sicher zurück.
      </p>
      <Link to="/" className="px-8 py-3 bg-btn-solid-bg text-btn-solid-fg rounded-md font-semibold hover:bg-btn-solid-hover transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105">
        Zurück zur Startseite
      </Link>
    </div>
  );
};

export default NotFound;