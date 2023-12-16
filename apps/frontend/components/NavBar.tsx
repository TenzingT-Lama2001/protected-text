'use client';

import { useMutation } from '@tanstack/react-query';
import { encrypt, hash } from 'encryption-handler';
import { useParams } from 'next/navigation';
import { useContentStore, useInitializeStore } from '../store/store';
import { Logo } from './Logo';
import { PostNote, UpdateNote, postNote, updateNote } from '../api/note';

export default function NavBar() {
  const { content, contentHash } = useContentStore();
  console.log('🚀 ~ file: NavBar.tsx:12 ~ NavBar ~ contentHash:', contentHash);
  console.log('🚀 ~ file: NavBar.tsx:12 ~ NavBar ~ content:', content);
  const { isNew } = useInitializeStore();
  const params = useParams();
  const { mutate: postNoteMutation } = useMutation({
    mutationFn: async (data: PostNote) => postNote(data),
    onSuccess: () => {
      alert('Note saved successfully');
    },
  });

  const { mutate: updateNoteMutation } = useMutation({
    mutationFn: async (data: UpdateNote) => updateNote(params.noteId as string, data),
    onSuccess: () => {
      alert('Note saved successfully');
    },
  });

  const handleOnSave = () => {
    const noteIdHash = hash(params.noteId as string);
    const encryptedNote = encrypt(content, 'secret123', noteIdHash);

    if (isNew) {
      const data: PostNote = {
        noteId: params.noteId as string,
        note: encryptedNote,
        hash: contentHash,
      };
      postNoteMutation(data);
    } else {
      const secretKeyHash = hash('secret123');
      const noteHash = hash(content + secretKeyHash);
      console.log({ contentHash });
      const data: UpdateNote = {
        note: encryptedNote,
        hash: noteHash,
        previousHash: contentHash,
      };
      updateNoteMutation(data);
    }
  };

  return (
    <header>
      <nav className="bg-[#1C1C1C] text-white flex flex-col justify-center items-center p-2  border-b border-gray-600 ">
        <Logo />
        <div className="flex gap-3 text-sm my-1 justify-between sm:gap-3">
          <button
            type="button"
            className="text-[#33996B] bg-gray-100 border-[#33996B] p-1 rounded-sm py-2 px-1.5 sm:py-2 sm:px-4 sm:rounded-md transition-all hover:bg-white hover:text-[#70b395]"
          >
            Reload
          </button>

          <button
            onClick={() => handleOnSave()}
            type="button"
            className="text-[#ffffff] bg-[#33996B] p-1 hover:bg-[#70b395] rounded-sm py-2 px-1.5  sm:py-2 sm:px-4 sm:rounded-md"
          >
            Save
          </button>
          <button
            type="button"
            className="text-[#af3131] border-[#33996B] bg-gray-100 p-1 hover:bg-white hover:text-[#c24c4c] rounded-sm py-2 px-1.5  sm:py-2 sm:px-4 sm:rounded-md"
          >
            Reset Password
          </button>
          <button
            type="button"
            className="text-[#ffffff] bg-[#af3131] p-1 hover:bg-[#c24c4c] rounded-sm py-2 px-1.5 sm:py-2 sm:px-4 sm:rounded-md"
          >
            Delete
          </button>
        </div>
      </nav>
    </header>
  );
}
