import React from 'react';

interface RugessaLogoProps {
  className?: string;
  variant?: 'full' | 'mark' | 'monochrome';
  size?: 'sm' | 'md' | 'lg';
  inverted?: boolean;
}

export const RugessaLogo: React.FC<RugessaLogoProps> = ({
  className = '',
  size = 'md',
}) => {
  const heightClasses = {
    sm: 'h-8',
    md: 'h-11',
    lg: 'h-16',
  };

  return (
    <div className={`inline-flex items-center select-none bg-transparent ${className}`}>
      <img
        src="/assets/mainLogo.png"
        alt="Rugessa Carpet & Textiles Logo"
        className={`${heightClasses[size]} w-auto object-contain transition-transform duration-200`}
        loading="eager"
      />
    </div>
  );
};


