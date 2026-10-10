import React from 'react';

interface RugessaLogoProps {
  className?: string;
  variant?: 'full' | 'mark' | 'monochrome';
  size?: 'sm' | 'md' | 'lg';
  inverted?: boolean;
}

export const RugessaLogo: React.FC<RugessaLogoProps> = ({
  className = '',
  variant = 'full',
  size = 'md',
  inverted = false,
}) => {
  const heightClasses = {
    sm: 'h-8',
    md: 'h-11',
    lg: 'h-16',
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* We render the official raster logo with crisp styling, backed by an inline SVG symbol */}
      <img
        src="/assets/mainLogo.png"
        alt="Rugessa Carpet & Textiles Logo"
        className={`${heightClasses[size]} w-auto object-contain transition-transform duration-300 dark:brightness-105 ${
          inverted ? 'brightness-0 invert' : ''
        }`}
        loading="eager"
      />
    </div>
  );
};
