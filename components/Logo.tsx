import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="logo-grad-ring" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4338ca" />
        <stop offset="100%" stopColor="#2563eb" />
      </linearGradient>
      <linearGradient id="logo-grad-code" x1="0%" y1="50%" x2="100%" y2="50%">
        <stop offset="0%" stopColor="#34d399" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
    </defs>

    {/* Main magnifying glass body */}
    <path
      d="M 45,5 A 40,40 0 1 1 45,85 A 40,40 0 0 1 45,5 M 72,68 L 95,90"
      stroke="url(#logo-grad-ring)"
      strokeWidth="10"
      fill="none"
      strokeLinecap="round"
    />

    {/* Prongs from handle */}
    <line x1="80" y1="65" x2="88" y2="73" stroke="url(#logo-grad-ring)" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="90" cy="75" r="2.5" fill="url(#logo-grad-ring)"/>
    <line x1="65" y1="80" x2="73" y2="88" stroke="url(#logo-grad-ring)" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="75" cy="90" r="2.5" fill="url(#logo-grad-ring)"/>

    {/* Inner lens */}
    <circle cx="45" cy="45" r="33" fill="currentColor" className="text-white dark:text-dark-surface" />

    {/* Code symbol </> */}
    <path
      d="M35 35 L25 45 L35 55"
      stroke="url(#logo-grad-code)"
      strokeWidth="6"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
     <path
      d="M55 35 L65 45 L55 55"
      stroke="url(#logo-grad-code)"
      strokeWidth="6"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="41"
      y1="32"
      x2="49"
      y2="58"
      stroke="url(#logo-grad-code)"
      strokeWidth="6"
      strokeLinecap="round"
    />
  </svg>
);
