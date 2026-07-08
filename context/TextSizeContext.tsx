'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type TextSize = 'small' | 'medium' | 'large';

interface TextSizeContextType {
  textSize: TextSize;
  setTextSize: (size: TextSize) => void;
}

const TextSizeContext = createContext<TextSizeContextType | undefined>(undefined);

const sizeMap: Record<TextSize, Record<string, string>> = {
  small: {
    '--text-xs': '0.6875rem',
    '--text-sm': '0.75rem',
    '--text-base': '0.8125rem',
    '--text-lg': '0.9375rem',
    '--text-xl': '1.0625rem',
    '--text-2xl': '1.25rem',
    '--text-3xl': '1.5rem',
    '--text-4xl': '1.75rem',
    '--text-5xl': '2rem',
  },
  medium: {
    '--text-xs': '0.75rem',
    '--text-sm': '0.875rem',
    '--text-base': '1rem',
    '--text-lg': '1.125rem',
    '--text-xl': '1.25rem',
    '--text-2xl': '1.5rem',
    '--text-3xl': '1.875rem',
    '--text-4xl': '2.25rem',
    '--text-5xl': '3rem',
  },
  large: {
    '--text-xs': '1rem',
    '--text-sm': '1.125rem',
    '--text-base': '1.25rem',
    '--text-lg': '1.5rem',
    '--text-xl': '1.75rem',
    '--text-2xl': '2rem',
    '--text-3xl': '2.5rem',
    '--text-4xl': '3rem',
    '--text-5xl': '3.75rem',
  },
};

export function TextSizeProvider({ children }: { children: ReactNode }) {
  const [textSize, setTextSize] = useState<TextSize>('medium');

  useEffect(() => {
    const saved = localStorage.getItem('textSize') as TextSize | null;
    if (saved && ['small', 'medium', 'large'].includes(saved)) {
      setTextSize(saved);
    }
  }, []);

  useEffect(() => {
    const vars = sizeMap[textSize];
    Object.entries(vars).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
    localStorage.setItem('textSize', textSize);
  }, [textSize]);

  const handleSetTextSize = (size: TextSize) => {
    setTextSize(size);
  };

  return (
    <TextSizeContext.Provider value={{ textSize, setTextSize: handleSetTextSize }}>
      {children}
    </TextSizeContext.Provider>
  );
}

export function useTextSize() {
  const context = useContext(TextSizeContext);
  if (!context) {
    throw new Error('useTextSize must be used within a TextSizeProvider');
  }
  return context;
}
