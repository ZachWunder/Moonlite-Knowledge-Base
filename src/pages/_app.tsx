import React from 'react';

import { ThemeProvider } from 'next-themes';
import { AppProps } from 'next/app';

import '../styles/main.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute="class"
      storageKey="nightwind-mode"
      defaultTheme="system" // default "light"
    >
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
