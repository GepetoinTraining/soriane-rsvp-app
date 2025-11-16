// File Path: src/app/page.js

import { prisma } from '@/lib/prisma';
import { 
  Container, 
  Title, 
  Text, 
  SimpleGrid, 
  Card, 
  Image, 
  Button, 
  Group,
  Box
} from '@mantine/core';
import Link from 'next/link';

// --- Data Fetching Function ---
// This runs on the server to get all events from your Neon database
async function getEvents() {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        createdAt: 'desc' // Show newest events first
      }
    });
    return events;
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return []; // Return an empty array on error
  }
}

// --- The Landing Page Component ---
export default async function HomePage() {
  const events = await getEvents();

  return (
    <Container size="lg" py="xl">
      <style>{`
        body { background-color: #f8f7f6; }
      `}</style>
      
      {/* --- Page Header --- */}
      <Box ta="center" my="xl">
        <Title 
          order={1} 
          fz={{ base: 40, sm: 50 }} 
          ff="'Playfair Display', serif" 
          c="gray.9"
        >
          Eventos Soriane
        </Title>
        <Text fz="xl" c="gray.7" mt="md">
          Um espaço para nossos eventos de design e conforto.
        </Text>
        <Box w={100} h={4} bg="red.8" mx="auto" mt="xl" />
      </Box>

      {/* --- Event Cards Grid --- */}
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">
        {events.map((event) => (
          <Card 
            key={event.id} 
            shadow="sm" 
            padding="lg" 
            radius="md" 
            withBorder
            component={Link} // Make the entire card a link
            href={`/event/${event.id}`} // Link to the dynamic event page
            style={{ display: 'flex', flexDirection: 'column' }} // Ensures footer sticks to bottom
          >
            <Card.Section>
              <Image
                // In a future version, we'd add `event.imageUrl` to the schema.
                // For now, we use a consistent, beautiful brand image.
                src="https://imagedelivery.net/9sCnq8tXxoCcNco130CS0g/bf276b5c-b171-4604-d02f-b44e73059400/public"
                height={160}
                alt="Imagem conceitual do evento"
                fit="cover"
              />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
              <Title order={3} fw={700}>{event.name}</Title>
            </Group>

            <Text size="sm" c="dimmed" lineClamp={3} style={{ flexGrow: 1 }}>
              {event.description || "Junte-se a nós para um evento especial. Clique para mais detalhes e confirmação."}
            </Text>

            <Button 
              color="red" 
              fullWidth 
              mt="md" 
              radius="md"
              component="div" // Prevents nested <a> tags, Mantine handles click
            >
              Ver Evento e RSVP
            </Button>
          </Card>
        ))}
        
        {/* --- Empty State Card --- */}
        {events.length === 0 && (
          <Text c="dimmed" ta="center" py="xl">
            Nenhum evento encontrado no momento.
          </Text>
        )}
      </SimpleGrid>
    </Container>
  );
}