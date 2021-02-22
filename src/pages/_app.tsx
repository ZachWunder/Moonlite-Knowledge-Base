import React from 'react';

import { ThemeProvider } from 'next-themes';
import { AppProps } from 'next/app';

import '../styles/main.css';

// eslint-disable-next-line react/jsx-props-no-spreading
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
