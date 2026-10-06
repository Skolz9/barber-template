import React, { useState } from 'react';

/**
 * Vintage section header with small light uppercase eyebrow label +
 * bold uppercase serif heading + short rust-brown accent underline.
 */
export function SectionHeader({
  eyebrow,
  title,
  lightModeOnDark = false,
  align = 'center',
}: {
  eyebrow: string;
  title: string;
  lightModeOnDark?: boolean;
  align?: 'center' | 'left';
}) {
  const isCenter = align === 'center';
  return (
    <div className={isCenter ? 'text-center mb-12' : 'mb-6'}>
      <p
        className={`text-[11px] uppercase tracking-[0.28em] font-medium mb-2 ${
          lightModeOnDark
            ? 'text-neutral-400'
            : 'text-neutral-500 dark:text-neutral-400'
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-[0.12em] [text-wrap:balance] ${
          lightModeOnDark
            ? 'text-white'
            : 'text-[#1F1F1F] dark:text-[#F7F6F4]'
        }`}
      >
        {title}
      </h2>
      <div
        className={`mt-3.5 h-[2px] w-10 bg-[#A65B3A] ${
          isCenter ? 'mx-auto' : ''
        }`}
      />
    </div>
  );
}

/**
 * Vintage ornamental flourish at the top of each dark chalkboard pricing card
 * (matching the reference image's brush/razor crest + victorian scroll).
 */
export function ChalkboardTopOrnament() {
  return (
    <div className="flex flex-col items-center justify-center text-neutral-300/80 mb-5 select-none">
      <svg
        width="180"
        height="54"
        viewBox="0 0 180 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-40 h-auto"
        aria-hidden="true"
      >
        {/* Shaving brush & razor center icon */}
        <path
          d="M90 6C86 6 83 10 84 16L86 24H94L96 16C97 10 94 6 90 6Z"
          stroke="currentColor"
          strokeWidth="1.3"
        />
        <path
          d="M85 24H95L93 34C92.5 36 87.5 36 87 34L85 24Z"
          stroke="currentColor"
          strokeWidth="1.3"
        />
        {/* Left ornamental scroll */}
        <path
          d="M74 32C62 32 56 22 44 22C34 22 28 29 34 35C39 39 46 34 43 29"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <path
          d="M72 37C55 39 42 44 20 42C12 41 8 36 14 32"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Right ornamental scroll */}
        <path
          d="M106 32C118 32 124 22 136 22C146 22 152 29 146 35C141 39 134 34 137 29"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <path
          d="M108 37C125 39 138 44 160 42C168 41 172 36 166 32"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Center diamond */}
        <circle cx="90" cy="42" r="2" fill="#A65B3A" />
        <path d="M52 42H82M98 42H128" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.5" />
      </svg>
    </div>
  );
}

/**
 * Vintage ornamental flourish at the bottom of each dark chalkboard pricing card.
 */
export function ChalkboardBottomOrnament() {
  return (
    <div className="flex items-center justify-center text-neutral-400/70 mt-6 select-none">
      <svg
        width="160"
        height="32"
        viewBox="0 0 160 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-36 h-auto"
        aria-hidden="true"
      >
        <path
          d="M80 18C70 18 64 8 50 10C38 12 34 22 44 25C50 26 54 21 50 17"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M80 18C90 18 96 8 110 10C122 12 126 22 116 25C110 26 106 21 110 17"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M22 16C34 22 54 26 80 26C106 26 126 22 138 16"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeOpacity="0.6"
        />
        <circle cx="80" cy="12" r="2.2" fill="#A65B3A" />
      </svg>
    </div>
  );
}

/**
 * Custom line icons in rust-brown (#A65B3A) for the 3 features below Haircut Models:
 * 1. Straight Razor (10 Years Experience)
 * 2. Sterilizer Jar (Hygienic Environments)
 * 3. Classic Barber Pole (Skin Health)
 */
export function BarberFeatureIcon({ type }: { type: 'razor' | 'hygiene' | 'skin' }) {
  if (type === 'razor') {
    return (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        className="w-9 h-9 text-[#A65B3A] shrink-0"
        aria-hidden="true"
      >
        <path
          d="M8 32L20 10L25 13L13 35L8 32Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M20 10L32 28C33 30 31 33 28 32L18 16"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="11.5" cy="31.5" r="1.2" fill="currentColor" />
      </svg>
    );
  }

  if (type === 'hygiene') {
    return (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        className="w-9 h-9 text-[#A65B3A] shrink-0"
        aria-hidden="true"
      >
        <rect
          x="10"
          y="11"
          width="20"
          height="23"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path d="M8 11H32" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path
          d="M15 7H25V11H15V7Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M20 16V29M15 22.5H25" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className="w-9 h-9 text-[#A65B3A] shrink-0"
      aria-hidden="true"
    >
      <rect x="14" y="9" width="12" height="22" rx="1" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 9H28M12 31H28" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path
        d="M17 9C17 7.3 18.3 6 20 6C21.7 6 23 7.3 23 9"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M17 31C17 32.7 18.3 34 20 34C21.7 34 23 32.7 23 31"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M14 15L26 11M14 22L26 18M14 29L26 25"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

/**
 * Resilient Image component following Zero-Broken-Image Policy.
 */
export function ResilientImage({
  src,
  alt,
  className = '',
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`bg-gradient-to-br from-[#262220] via-[#1F1F1F] to-[#33241B] flex flex-col items-center justify-center p-4 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <BarberFeatureIcon type="razor" />
        <span className="mt-2 text-xs uppercase tracking-widest text-neutral-300 font-display">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
