'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: string;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: string;
  setTheme: (theme: string) => void;
};

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
};

export const themes: Record<string, string> = {
  Neutral: 'neutral',
  Orange: 'orange',
  Green: 'green',
  'Green Slate': 'green-slate',
  Yellow: 'yellow',
  Tulip: 'tulip',
  Cactus: 'cactus',
  Vulcano: 'vulcano',
};

const themeValues = Object.values(themes);
const CustomThemeProviderContext = createContext<ThemeProviderState>(initialState);

export default function CustomThemeProvider(props: ThemeProviderProps) {
  const {
    children,
    defaultTheme = 'neutral',
    storageKey = 'vite-ui-theme',
    ...restOfProps
  } = props;

  const [theme, setTheme] = useState<string>(
    () => window.localStorage.getItem(storageKey) || defaultTheme
  );

  useEffect(() => {
    const body = window.document.body;

    body.classList.remove(...themeValues);

    if (theme === 'neutral') {
      return;
    }

    body.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: string) => {
      window.localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <CustomThemeProviderContext.Provider {...restOfProps} value={value}>
      {children}
    </CustomThemeProviderContext.Provider>
  );
}

export const useCustomTheme = () => {
  const context = useContext(CustomThemeProviderContext);

  if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};
