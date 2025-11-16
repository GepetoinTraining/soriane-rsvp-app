// File Path: src/app/actions.js

'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// This is the main function that handles the form data
export async function submitRsvp(prevState, formData) {
  
  // Get all the data from the form
  const eventId = formData.get('eventId');
  const guestName = formData.get('guestName');
  const bringingGuest = formData.get('bringingGuest') === 'on'; // Checkbox value is 'on' or null
  const plusOneName = formData.get('plusOneName');
  
  // Get all checkboxes with the name 'selectedDates'
  const selectedDates = formData.getAll('selectedDates');

  // --- Validation ---
  if (!eventId || !guestName || guestName.trim() === '') {
    return { message: 'Por favor, preencha seu nome.', status: 'error' };
  }
  if (selectedDates.length === 0) {
    return { message: 'Por favor, selecione ao menos uma data.', status: 'error' };
  }
  if (bringingGuest && (!plusOneName || plusOneName.trim() === '')) {
    return { message: 'Por favor, preencha o nome do seu acompanhante.', status: 'error' };
  }
  
  // --- Database Operation ---
  try {
    await prisma.rsvp.create({
      data: {
        eventId: eventId,
        guestName: guestName,
        bringingGuest: bringingGuest,
        plusOneName: bringingGuest ? plusOneName : null, // Only save if bringing guest
        selectedDates: selectedDates,
      },
    });

    // Invalidate the cache for this page
    revalidatePath(`/event/${eventId}`);
    
    // Return success
    return { message: 'Obrigado! Sua resposta foi enviada com sucesso.', status: 'success' };

  } catch (error) {
    console.error('Erro ao salvar RSVP:', error);
    // Return error
    return { message: 'Ocorreu um erro no servidor. Por favor, tente novamente.', status: 'error' };
  }
}