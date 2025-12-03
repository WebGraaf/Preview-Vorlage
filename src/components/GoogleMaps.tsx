import { useState } from 'react';
import { useConsent } from '../hooks/useConsent';

type GoogleMapsProps = {
  src: string;
  width?: string;
  height?: string;
  className?: string;
};

export const GoogleMaps = ({
  src,
  width = '100%',
  height = '450px',
  className = '',
}: GoogleMapsProps) => {
  const { consent, updateConsent } = useConsent();
  const [loadOnce, setLoadOnce] = useState(false);

  const handleLoadOnce = () => {
    setLoadOnce(true);
  };

  const handleAllowAlways = () => {
    updateConsent({ externalMedia: true });
  };

  const shouldRenderMap = consent.externalMedia || loadOnce;

  if (shouldRenderMap) {
    return (
      <iframe
        src={src}
        width={width}
        height={height}
        className={`border-0 ${className}`}
        loading="lazy"
        referrerPolicy="origin"
        title="Google Maps"
      ></iframe>
    );
  }

  return (
    <div
      className={`flex flex-col items-center justify-center bg-secondary-100 border border-secondary-200 rounded-md p-8 ${className}`}
      style={{ width, height }}
    >
      <p className="text-text-body text-center mb-4">
        Um die Karte anzuzeigen, musst du externe Medien von Google Maps erlauben.
      </p>
      <div className="flex gap-4">
        <button
          onClick={handleLoadOnce}
          className="px-4 py-2 rounded-md text-btn-outline-fg border border-btn-outline-border hover:bg-gray-100"
        >
          Einmal laden
        </button>
        <button
          onClick={handleAllowAlways}
          className="px-4 py-2 rounded-md bg-btn-solid-bg text-btn-solid-fg hover:bg-btn-solid-hover"
        >
          Immer erlauben
        </button>
      </div>
    </div>
  );
};