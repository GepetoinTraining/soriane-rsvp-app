// File Path: src/components/EventDetails.jsx

import { Paper, Title, SimpleGrid, Group, Text } from '@mantine/core';

export function EventDetails({ dressCode, locationInfo }) {
  return (
    <Paper withBorder shadow="sm" p="xl" radius="md" my="xl">
      <Title order={2} c="gray.9" ta="center" mb="xl">Detalhes do Evento</Title>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
        <Group>
          <Text fz="lg" fw={600}>Horário:</Text>
          <Text fz="lg" c="gray.7">A partir das 19:00</Text>
        </Group>
        <Group>
          <Text fz="lg" fw={600}>Traje:</Text>
          <Text fz="lg" c="gray.7">{dressCode || "Esporte Fino"}</Text>
        </Group>
        <Group>
          <Text fz="lg" fw={600}>Data:</Text>
          <Text fz="lg" c="gray.7">A ser definida</Text>
        </Group>
        <Group>
          <Text fz="lg" fw={600}>Local:</Text>
          <Text fz="lg" c="gray.7">{locationInfo || "Endereço enviado após confirmação."}</Text>
        </Group>
      </SimpleGrid>
    </Paper>
  );
}