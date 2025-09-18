import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ForestAnimations: React.FC = () => {
  const [animationsEnabled, setAnimationsEnabled] = useLocalStorage('forest-animations', true);

  if (!animationsEnabled) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setAnimationsEnabled(true)}
          className="forest-button text-sm px-3 py-2"
          title="Enable animations"
        >
          🌲 Enable Animations
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Floating Leaves */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={`leaf-${i}`}
            className="absolute animate-leaf-fall opacity-60"
            style={{
              left: `${10 + i * 15}%`,
              animationDelay: `${i * 2.5}s`,
              animationDuration: `${15 + i * 2}s`,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C12 2 16 6 16 12C16 18 12 22 12 22C12 22 8 18 8 12C8 6 12 2 12 2Z"
                fill="hsl(var(--forest-accent))"
                opacity="0.8"
              />
              <path
                d="M12 2C12 2 18 8 12 12C6 8 12 2 12 2Z"
                fill="hsl(var(--forest-glow))"
                opacity="0.6"
              />
            </svg>
          </div>
        ))}
      </div>

      {/* Floating Animal Silhouette */}
      <div className="fixed top-20 left-10 pointer-events-none z-10 animate-float opacity-40">
        <svg width="60" height="40" viewBox="0 0 60 40" fill="none">
          {/* Deer Silhouette */}
          <path
            d="M25 35C25 35 23 33 20 33C17 33 15 35 15 35L15 25C15 25 10 23 8 20C6 17 8 15 11 16C14 17 18 20 20 20L20 15C20 15 18 10 22 8C26 6 30 8 32 12L35 15C35 15 40 12 45 15C50 18 48 22 45 20C42 18 38 20 35 22L35 30C35 30 37 32 35 35C33 38 30 36 28 33C26 30 25 35 25 35Z"
            fill="hsl(var(--forest-medium))"
          />
          {/* Antlers */}
          <path
            d="M22 8L20 5M22 8L25 5M32 12L30 8M32 12L35 8"
            stroke="hsl(var(--forest-medium))"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Snake Animation */}
      <div className="fixed bottom-10 right-10 pointer-events-none z-10 animate-snake-slither opacity-50">
        <svg width="80" height="20" viewBox="0 0 80 20" fill="none">
          <path
            d="M5 10C5 10 15 5 25 10C35 15 45 5 55 10C65 15 75 10 75 10"
            stroke="hsl(var(--forest-accent))"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <circle
            cx="75"
            cy="10"
            r="3"
            fill="hsl(var(--forest-glow))"
          />
        </svg>
      </div>

      {/* Glowing Orbs */}
      <div className="fixed top-1/3 right-1/4 pointer-events-none z-10 animate-glow-pulse opacity-30">
        <div className="w-4 h-4 rounded-full bg-forest-glow"></div>
      </div>
      <div className="fixed bottom-1/3 left-1/4 pointer-events-none z-10 animate-glow-pulse opacity-20" style={{ animationDelay: '1.5s' }}>
        <div className="w-3 h-3 rounded-full bg-forest-glow"></div>
      </div>

      {/* Animation Toggle */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setAnimationsEnabled(false)}
          className="forest-button text-sm px-3 py-2 opacity-80 hover:opacity-100"
          title="Disable animations for performance"
        >
          🌲 Disable Animations
        </button>
      </div>
    </>
  );
};

export default ForestAnimations;