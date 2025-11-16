'use client';

import { useState, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { submitRsvp } from '@/app/actions'; // This import path is now correct
import { 
  Title, 
// ... existing code ...
  Text, 
  Paper, 
  TextInput, 
// ... existing code ...
  Checkbox, 
  Button, 
  Stack,
// ... existing code ...
  Notification,
  Collapse,
  Box,
} from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';

// --- Submit Button Component ---
// ... existing code ...
// This component shows a loading state
function SubmitButton() {
  const { pending } = useFormStatus(); // Hook to check form status
// ... existing code ...
  return (
    <Button 
      type="submit" 
// ... existing code ...
      fullWidth 
      size="lg" 
      mt="xl" 
// ... existing code ...
      loading={pending}
      loaderProps={{ type: 'dots' }}
    >
// ... existing code ...
      Confirmar Presença (RSVP)
    </Button>
  );
}

// --- Main Form Component ---
// ... existing code ...
// NOTICE: It now only takes 'eventId' and 'availableDates' as props
export default function RsvpForm({ eventId, availableDates }) {
  // Server action form state
// ... existing code ...
  const initialState = { message: null, status: null };
  const [state, formAction] = useFormState(submitRsvp, initialState);

  // Client-side state for the "+1" checkbox
// ... existing code ...
  const [bringingGuest, setBringingGuest] = useState(false);
  
  // State for showing the notification
// ... existing code ...
  const [showNotification, setShowNotification] = useState(false);
  
  // Effect to watch for changes in the server action state
// ... existing code ...
  useEffect(() => {
    if (state.message) {
      setShowNotification(true);
// ... existing code ...
      // Hide notification after 5 seconds
      const timer = setTimeout(() => setShowNotification(false), 5000);
      return () => clearTimeout(timer);
// ... existing code ...
    }
  }, [state]);

  // Format dates for display
// ... existing code ...
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    const date = new Date(year, month - 1, day);
// ... existing code ...
    return date.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
  };

  return (
      <Paper withBorder shadow="lg" p="xl" radius="md" my="xl">
// ... existing code ...
        <Title order={2} c="gray.9" ta="center" mb="lg">Confirme sua Presença</Title>
        <Text ta="center" c="dimmed" mb="xl">Por favor, responda até <strong>23 de Novembro</strong>.</Text>
        
        {/* The form calls the server action */}
// ... existing code ...
        <form action={formAction}>
          <Stack gap="lg">
            {/* Hidden field for eventId */}
// ... existing code ...
            <input type="hidden" name="eventId" value={eventId} />
            
            <TextInput
              name="guestName"
// ... existing code ...
              label="Seu nome completo"
              placeholder="Seu nome"
              required
// ... existing code ...
              size="md"
            />
            
            {/* Date Chooser */}
// ... existing code ...
            <Box>
              <Text fw={500} size="sm" mb="xs">Quais datas você estaria disponível? *</Text>
              <Text size="sm" c="dimmed" mb="md">Marque todas as opções em que você pode participar.</Text>
              <Stack gap="sm">
                {availableDates.map((dateStr) => (
                  <Checkbox
                    key={dateStr}
// ... existing code ...
                    name="selectedDates"
                    value={dateStr}
                    label={formatDate(dateStr)}
// ... existing code ...
                    size="md"
                  />
                ))}
              </Stack>
            </Box>

            {/* Plus One Checkbox */}
// ... existing code ...
            <Checkbox
              name="bringingGuest"
              label="Vou levar um(a) acompanhante (+1)"
// ... existing code ...
              size="md"
              checked={bringingGuest}
              onChange={(e) => setBringingGuest(e.currentTarget.checked)}
// ... existing code ...
            />
            
            {/* Plus One Name (Collapsible) */}
            <Collapse in={bringingGuest}>
// ... existing code ...
              <TextInput
                name="plusOneName"
                label="Nome do(a) acompanhante"
// ... existing code ...
                placeholder="Nome do(a) acompanhante"
                required={bringingGuest}
                size="md"
// ... existing code ...
              />
            </Collapse>
            
            {/* Notification Area */}
// ... existing code ...
            <Collapse in={showNotification}>
              <Notification
                icon={state.status === 'success' ? <IconCheck /> : <IconX />}
// ... existing code ...
                color={state.status === 'success' ? 'green' : 'red'}
                title={state.status === 'success' ? 'Sucesso!' : 'Erro!'}
                onClose={() => setShowNotification(false)}
// ... existing code ...
              >
                {state.message}
              </Notification>
            </Collapse>

            {/* Submit Button (uses useFormStatus) */}
// ... existing code ...
            <SubmitButton />
          </Stack>
        </form>
      </Paper>
  );
}