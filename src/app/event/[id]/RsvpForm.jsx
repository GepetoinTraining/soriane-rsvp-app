// File Path: src/app/event/[id]/RsvpForm.jsx

'use client';

import { useState, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { submitRsvp } from '@/app/actions'; // This import path is now correct
import { 
  Title, 
  Text, 
  Paper, 
  TextInput, 
  Checkbox, 
  Button, 
  Stack,
  Notification,
  Collapse,
  Box,
} from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';

// --- Submit Button Component ---
// This component shows a loading state
function SubmitButton() {
  const { pending } = useFormStatus(); // Hook to check form status
  return (
    <Button 
      type="submit" 
      fullWidth 
      size="lg" 
      mt="xl" 
      loading={pending}
      loaderProps={{ type: 'dots' }}
    >
      Confirmar Presença (RSVP)
    </Button>
  );
}

// --- Main Form Component ---
// NOTICE: It now only takes 'eventId' and 'availableDates' as props
export default function RsvpForm({ eventId, availableDates }) {
  // Server action form state
  const initialState = { message: null, status: null };
  const [state, formAction] = useFormState(submitRsvp, initialState);

  // Client-side state for the "+1" checkbox
  const [bringingGuest, setBringingGuest] = useState(false);
  
  // State for showing the notification
  const [showNotification, setShowNotification] = useState(false);
  
  // Effect to watch for changes in the server action state
  useEffect(() => {
    if (state.message) {
      setShowNotification(true);
      // Hide notification after 5 seconds
      const timer = setTimeout(() => setShowNotification(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [state]);

  // Format dates for display
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
  };

  return (
      <Paper withBorder shadow="lg" p="xl" radius="md" my="xl">
        <Title order={2} c="gray.9" ta="center" mb="lg">Confirme sua Presença</Title>
        <Text ta="center" c="dimmed" mb="xl">Por favor, responda até <strong>23 de Novembro</strong>.</Text>
        
        {/* The form calls the server action */}
        <form action={formAction}>
          <Stack gap="lg">
            {/* Hidden field for eventId */}
            <input type="hidden" name="eventId" value={eventId} />
            
            <TextInput
              name="guestName"
              label="Seu nome completo"
              placeholder="Seu nome"
              required
              size="md"
            />
            
            {/* Date Chooser */}
            <Box>
              <Text fw={500} size="sm" mb="xs">Quais datas você estaria disponível? *</Text>
              <Text size="sm" c="dimmed" mb="md">Marque todas as opções em que você pode participar.</Text>
              <Stack gap="sm">
                {availableDates.map((dateStr) => (
                  <Checkbox
                    key={dateStr}
                    name="selectedDates"
                    value={dateStr}
                    label={formatDate(dateStr)}
                    size="md"
                  />
                ))}
              </Stack>
            </Box>

            {/* Plus One Checkbox */}
            <Checkbox
              name="bringingGuest"
              label="Vou levar um(a) acompanhante (+1)"
              size="md"
              checked={bringingGuest}
              onChange={(e) => setBringingGuest(e.currentTarget.checked)}
            />
            
            {/* Plus One Name (Collapsible) */}
            <Collapse in={bringingGuest}>
              <TextInput
                name="plusOneName"
                label="Nome do(a) acompanhante"
                placeholder="Nome do(a) acompanhante"
                required={bringingGuest}
                size="md"
              />
            </Collapse>
            
            {/* Notification Area */}
            <Collapse in={showNotification}>
              <Notification
                icon={state.status === 'success' ? <IconCheck /> : <IconX />}
                color={state.status === 'success' ? 'green' : 'red'}
                title={state.status === 'success' ? 'Sucesso!' : 'Erro!'}
                onClose={() => setShowNotification(false)}
              >
                {state.message}
              </Notification>
            </Collapse>

            {/* Submit Button (uses useFormStatus) */}
            <SubmitButton />
          </Stack>
        </form>
      </Paper>
  );
}