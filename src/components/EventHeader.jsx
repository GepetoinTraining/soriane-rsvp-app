// File Path: src/components/EventHeader.jsx

import { Title, Text, Box } from '@mantine/core';

export function EventHeader({ title, description }) {
  return (
    <Box ta="center" my="xl">
      <Title 
        order={1} 
        fz={{ base: 40, sm: 50 }} 
        ff="'Playfair Display', serif" 
        c="gray.9"
      >
        {title}
      </Title>
      <Text fz="xl" c="gray.7" mt="md">
        {description}
      </Typex>
      <Box w={100} h={4} bg="red.8" mx="auto" mt="xl" />
    </Box>
  );
}