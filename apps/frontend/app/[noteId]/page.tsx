'use client';

import React, { useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
import TextTabs from '../../components/Tabs';
import ConfirmationModal from '../../components/Modal';
import { getNote } from '../../api/note';

export default function Page({ params }: { params: { noteId: string } }) {
  const [showModal, setShowModal] = useState(true);
  const [encryptedNote, setEncryptedNote] = useState<string>('');
  // const { data } = useQuery({
  //   queryKey: ['GetNote', { noteId: params.noteId }],
  //   queryFn: async () => {
  //     const { note } = await getNote(params.noteId);
  //     return note;
  //   },

  //   enabled: params.noteId != null, // Ensure enabled is set appropriately
  //   refetchOnWindowFocus: false,
  // });

  React.useEffect(() => {
    const fetchNote = async () => {
      try {
        const { note } = await getNote(params.noteId);
        setEncryptedNote(note.note);
      } catch (error: any) {
        console.error('Error fetching note:', error.message);
      }
    };

    fetchNote();
  }, [params.noteId]);

  const handleUserChoice = (proceed: boolean) => {
    if (proceed) {
      setShowModal(false);
    } else {
      setShowModal(false);
    }
  };

  return (
    <main className="w-[calc(100%-1.5rem)] mx-auto mt-4">
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full  bg-black bg-opacity-50 z-50">
          <ConfirmationModal note={encryptedNote} onConfirm={handleUserChoice} />
        </div>
      )}
      <TextTabs />
    </main>
  );
}
