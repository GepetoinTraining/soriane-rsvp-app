// File Path: src/components/ConceptualMenu.jsx

import { Box, Title, SimpleGrid, Card, Image, Text } from '@mantine/core';

export function ConceptualMenu({ menu }) {
  return (
    <Box my="xl">
      <Title order={2} c="gray.9" ta="center" mb="xl">A Coleção: Um Estudo em Texturas</Title>
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
        {menu.map((item) => (
          <Card key={item.title} shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
              <Image
                src={item.image}
                height={200}
                alt={item.title}
                fit="cover"
              />
            </Card.Section>
            <Title order={3} fw={700} mt="md">{item.title}</Title>
            <Text size="sm" c="dimmed" mt="xs">{item.description}</Text>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
}