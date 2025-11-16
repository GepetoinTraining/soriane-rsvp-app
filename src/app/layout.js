import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import './globals.css';

import { ColorSchemeScript, MantineProvider, createTheme } from '@mantine/core';

export const metadata = {
// ... existing code ...
  title: 'Soriane RSVP',
  description: 'Convite para evento exclusivo Soriane',
};

// You can define a custom theme
// ... existing code ...
const theme = createTheme({
  fontFamily: 'Inter, sans-serif',
  primaryColor: 'red', // Matches the Soriane branding
});

export default function RootLayout({ children }) {
// ... existing code ...
  return (
    <html lang="pt-br">
      <head>
// ... existing code ...
        <ColorSchemeScript defaultColorScheme="auto" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="auto">
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}