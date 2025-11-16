// File Path: src/app/layout.js

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import './globals.css';

import { ColorSchemeScript, MantineProvider, createTheme } from '@mantine/core';

export const metadata = {
  title: 'Soriane RSVP',
  description: 'Convite para evento exclusivo Soriane',
};

// You can define a custom theme
const theme = createTheme({
  fontFamily: 'Inter, sans-serif',
  primaryColor: 'red', // Matches the Soriane branding
});

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </head>
      <body>
        {/*
          THE FIX: We remove defaultColorScheme="auto" from the provider.
          The ColorSchemeScript in the <head> is now the single source of truth,
          which resolves the hydration error.
        */}
        <MantineProvider theme={theme}>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}