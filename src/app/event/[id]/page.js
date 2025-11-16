import { prisma } from '@/lib/prisma';
import { Container, Title, Text, Paper } from '@mantine/core';
import { EventHeader } from '@/components/EventHeader';
import { EventDetails } from '@/components/EventDetails';
import { ConceptualMenu } from '@/components/ConceptualMenu';
import RsvpForm from './RsvpForm'; // Import the Client Component

// This helper function fetches the event data from the database
// ... existing code ...
async function getEvent(id) {
  try {
    const event = await prisma.event.findUnique({
// ... existing code ...
      where: { id: id },
    });
    return event;
// ... existing code ...
  } catch (error) {
    console.error("Failed to fetch event:", error);
    // This can happen if the ID is malformed (not a CUID)
// ... existing code ...
    return null;
  }
}

// --- Conceptual Menu Data ---
// ... existing code ...
// In a real app, this might also come from the database
const conceptualMenu = [
    { title: "Linha 1: A LUZ FILTRADA", description: "Elementos leves, translúcidos e de boas-vindas.", image: "https://imagedelivery.net/9sCnq8tXxoCcNco130CS0g/a9b83b8a-b896-4148-89c0-9377c8e9d600/public" },
    { title: "Linha 2: A TRAMA ESTRUTURAL", description: "Elementos com linhas, ritmo e forma.", image: "https://imagedelivery.net/9sCnq8tXxoCcNco130CS0g/30e3b6a9-063a-4464-58c0-8d59161a0600/public" },
// ... existing code ...
    { title: "Linha 3: O TOQUE AVELUDADO", description: "Elementos ricos, profundos e de conforto.", image: "https://imagedelivery.net/9sCnq8tXxoCcNco130CS0g/0a283318-c2b6-4556-912f-9173a0058e00/public" },
    { title: "Linha 4: O MOSTRUÁRIO TÊXTIL", description: "A paleta de \"tecidos\" e \"aviamentos\".", image: "https://imagedelivery.net/9sCnq8tXxoCcNco130CS0g/e990b793-18ef-4176-b6ae-57f920f69a00/public" },
    { title: "Linha 5: A TEXTURA FINAL", description: "A paleta de sobremesas que finaliza o design.", image: "https://imagedelivery.net/9sCnq8tXxoCcNco130CS0g/e854b85c-35dd-47df-e325-1e33d45e5400/public" },
];


// --- The Page Component ---
export default async function EventPage({ params }) {
// ... existing code ...
  // params.id comes from the [id] in the folder name
  const event = await getEvent(params.id);

  // Handle case where event is not found
// ... existing code ...
  if (!event) {
    return (
      <Container size="sm" pt={80}>
// ... existing code ...
        <Paper withBorder shadow="md" p="lg" radius="md" ta="center">
          <Title order={2} c="red">Evento não encontrado</Title>
          <Text mt="md">O link do evento que você está tentando acessar não existe ou expirou.</Text>
        </Paper>
      </Container>
    );
  }

  // --- NEW: Assemble the Server Components ---
// ... existing code ...
  return (
    <Container size="md" py="xl">
      <style>{`
        body { background-color: #f8f7f6; }
      `}</style>
      
      {/* 1. Event Header (Server Component) */}
// ... existing code ...
      <EventHeader 
        title={event.name || "A Mesa Soriane"}
        description={event.description || "Um convite para uma noite de texturas e conforto."} 
      />
      
      {/* 2. Event Details (Server Component) */}
// ... existing code ...
      <EventDetails 
        dressCode={event.dressCode}
        locationInfo={event.locationInfo}
      />
      
      {/* 3. Conceptual Menu (Server Component) */}
// ... existing code ...
      <ConceptualMenu menu={conceptualMenu} />
      
      {/* 4. RSVP Form (Client Component) */}
// ... existing code ...
      <RsvpForm 
        eventId={event.id}
        availableDates={event.availableDates}
      />
    </Container>
  );
}